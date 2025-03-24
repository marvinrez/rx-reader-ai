import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeImage, getAIResponse } from "./openai";
import { extractMedicationInfo } from "./openai";
import { PrescriptionAnalysis } from "@shared/schema";
import path from "path";
import fs from "fs";

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

      // Simplified image validation - just ensure we have data
      try {
        // Just make sure we have some data to process
        if (!imageBase64 || imageBase64.length < 50) {
          console.log("Invalid or empty image data");
          return res.status(400).json({ 
            message: 'We couldn\'t read this image. Please try a different photo.',
            detail: 'The image data appears to be empty or corrupted'
          });
        }
        
        // Process the base64 string to make sure it's in the right format for the OpenAI API
        let processedImage = imageBase64;
        if (imageBase64.includes('base64,')) {
          processedImage = imageBase64.split('base64,')[1];
        }
        
        // Update the imageBase64 with the processed version
        req.body.imageBase64 = processedImage;
        
        console.log("Image validation passed, length:", processedImage.length);
      } catch (error) {
        console.log("Error parsing image:", error);
        return res.status(400).json({ 
          message: 'We couldn\'t read this image. Please try again with a different photo.',
          detail: 'There was an error processing your image'
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
      // Create a user-friendly error message
      let errorMessage = 'We had trouble analyzing your prescription. Please try again.';
      let errorType = 'general';
      
      if (error instanceof Error) {
        console.log("Error details:", error.message);
        
        // Customize based on error type
        if (error.message.includes('API key')) {
          errorMessage = 'Our service is temporarily unavailable. Please try again later.';
          errorType = 'api';
        } else if (error.message.includes('quota')) {
          errorMessage = 'Our service is currently busy. Please try again in a few minutes.';
          errorType = 'api';
        } else if (error.message.includes('format') || error.message.includes('image')) {
          errorMessage = 'We couldn\'t read this image. Please try a different photo.';
          errorType = 'format';
        }
      }
      
      return res.status(500).json({ 
        message: errorMessage,
        type: errorType
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
      // Create a user-friendly error message
      let errorMessage = 'We had trouble processing your message. Please try again.';
      let errorType = 'general';
      
      if (error instanceof Error) {
        console.log("Error details:", error.message);
        
        // Customize based on error type
        if (error.message.includes('API key')) {
          errorMessage = 'Our service is temporarily unavailable. Please try again later.';
          errorType = 'api';
        } else if (error.message.includes('quota')) {
          errorMessage = 'Our service is currently busy. Please try again in a few minutes.';
          errorType = 'api';
        }
      }
      
      return res.status(500).json({ 
        message: errorMessage,
        type: errorType
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
        message: 'We couldn\'t save your feedback. Please try again.'
      });
    }
  });

  // Download the project ZIP file
  app.get('/download-project', (req, res) => {
    try {
      const zipFilePath = path.resolve('./rx-reader-ai.zip');
      
      // Check if file exists
      if (!fs.existsSync(zipFilePath)) {
        console.error('ZIP file not found at path:', zipFilePath);
        return res.status(404).send('File not found');
      }
      
      // Set appropriate headers
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=rx-reader-ai.zip');
      
      // Create read stream and pipe to response
      const fileStream = fs.createReadStream(zipFilePath);
      fileStream.pipe(res);
      
      console.log('ZIP file download started');
    } catch (error) {
      console.error('Error during file download:', error);
      res.status(500).send('Error downloading file');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
