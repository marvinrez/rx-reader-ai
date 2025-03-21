import { apiRequest } from "@/lib/queryClient";
import { PrescriptionAnalysis } from "@shared/schema";

export async function analyzePrescriptionImage(imageBase64: string): Promise<PrescriptionAnalysis> {
  try {
    const response = await apiRequest('POST', '/api/prescriptions/analyze', { imageBase64 });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing prescription:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze prescription');
  }
}

export async function sendMessage(content: string): Promise<{ response: string }> {
  try {
    const response = await apiRequest('POST', '/api/messages', { content });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send message');
  }
}

export async function submitFeedback(messageId: number, isAccurate: boolean): Promise<void> {
  try {
    await apiRequest('POST', '/api/feedbacks', { messageId, isAccurate });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to submit feedback');
  }
}
