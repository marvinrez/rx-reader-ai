import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeImage, getAIResponse } from "./openai";
import { extractMedicationInfo } from "./openai";
import { PrescriptionAnalysis } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze prescription image
  app.post('/api/prescriptions/analyze', async (req, res) => {
    try {
      console.log("Received analyze request");
      const { imageBase64 } = req.body;
      
      console.log("Image received:", imageBase64 ? "yes" : "no");
      
      if (!imageBase64) {
        return res.status(400).json({ message: 'No image provided' });
      }

      // Validate file format
      const isValidFile = imageBase64.match(/^data:(image\/(jpeg|jpg|png|webp|heic)|application\/pdf);base64,/);
      if (!isValidFile) {
        console.log("Invalid format detected:", imageBase64.substring(0, 50) + "...");
        return res.status(400).json({ 
          message: 'Invalid format. Please use JPEG/JPG, PNG, WEBP, HEIC images or PDF files.',
          detail: 'Make sure the image is properly encoded as base64 with the correct mime type.'
        });
      }

      // Call OpenAI to analyze the image
      const analysis = await analyzeImage(imageBase64);
      
      // Extract medication information from the analysis
      const medicationInfo = await extractMedicationInfo(analysis);
      
      // Store the prescription in memory
      const prescription = await storage.createPrescription({
        userId: null, // No user authentication in this version
        imageBase64
      });
      
      // Store the analysis result as a message
      await storage.createMessage({
        prescriptionId: prescription.id,
        type: 'prescription',
        content: 'Prescription analysis result',
        metadata: medicationInfo
      });
      
      return res.status(200).json(medicationInfo);
    } catch (error) {
      console.error('Error analyzing prescription:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to analyze prescription' 
      });
    }
  });

  // Submit a message for AI response
  app.post('/api/messages', async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: 'No message content provided' });
      }
      
      // Store the user message
      await storage.createMessage({
        prescriptionId: null,
        type: 'user',
        content,
        metadata: null
      });
      
      // Get AI response
      const response = await getAIResponse(content);
      
      // Store the AI response
      await storage.createMessage({
        prescriptionId: null,
        type: 'ai',
        content: response,
        metadata: null
      });
      
      return res.status(200).json({ response });
    } catch (error) {
      console.error('Error processing message:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to process message' 
      });
    }
  });

  // Submit feedback on AI analysis
  app.post('/api/feedbacks', async (req, res) => {
    try {
      const { messageId, isAccurate } = req.body;
      
      if (messageId === undefined || isAccurate === undefined) {
        return res.status(400).json({ message: 'Missing required feedback information' });
      }
      
      // Store the feedback
      const feedback = await storage.createFeedback({
        messageId,
        isAccurate
      });
      
      return res.status(200).json({ success: true, feedback });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to submit feedback' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
