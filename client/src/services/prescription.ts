import { apiRequest } from "@/lib/queryClient";
import { PrescriptionAnalysis } from "@shared/schema";

export async function analyzePrescriptionImage(imageBase64: string): Promise<PrescriptionAnalysis> {
  try {
    const response = await apiRequest('POST', '/api/prescriptions/analyze', { imageBase64 });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing prescription:', error);
    
    // Check for server-provided error information
    let message = 'We couldn\'t analyze your prescription. Please try again.';
    let errorType: 'api' | 'format' | 'size' | 'general' = 'general';
    
    // Try to extract error details from the response
    try {
      if (error instanceof Error && 'data' in error) {
        const errorData = (error as any).data;
        if (errorData && typeof errorData === 'object') {
          // Use server-provided error message if available
          if (errorData.message) {
            message = errorData.message;
          }
          
          // Use server-provided error type if available
          if (errorData.type) {
            errorType = errorData.type;
          }
        }
      }
    } catch (parseError) {
      console.warn('Failed to parse error details:', parseError);
    }
    
    // Additional client-side error checks
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('413') || errorMessage.includes('too large') || errorMessage.includes('payload')) {
      message = 'The image is too large. Please try with a smaller image.';
      errorType = 'size';
    }
    
    // Customize the error object to include the type
    const customError = new Error(message);
    (customError as any).type = errorType;
    
    throw customError;
  }
}

export async function sendMessage(content: string): Promise<{ response: string }> {
  try {
    const response = await apiRequest('POST', '/api/messages', { content });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Check for server-provided error information
    let message = 'We couldn\'t send your message. Please try again.';
    let errorType: 'api' | 'general' = 'general';
    
    // Try to extract error details from the response
    try {
      if (error instanceof Error && 'data' in error) {
        const errorData = (error as any).data;
        if (errorData && typeof errorData === 'object') {
          // Use server-provided error message if available
          if (errorData.message) {
            message = errorData.message;
          }
          
          // Use server-provided error type if available
          if (errorData.type) {
            errorType = errorData.type;
          }
        }
      }
    } catch (parseError) {
      console.warn('Failed to parse error details:', parseError);
    }
    
    // Customize the error object to include the type
    const customError = new Error(message);
    (customError as any).type = errorType;
    
    throw customError;
  }
}

export async function submitFeedback(messageId: number, isAccurate: boolean): Promise<void> {
  try {
    await apiRequest('POST', '/api/feedbacks', { messageId, isAccurate });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    // Check for server-provided error information
    let message = 'We couldn\'t save your feedback. Please try again.';
    
    // Try to extract error details from the response
    try {
      if (error instanceof Error && 'data' in error) {
        const errorData = (error as any).data;
        if (errorData && typeof errorData === 'object' && errorData.message) {
          message = errorData.message;
        }
      }
    } catch (parseError) {
      console.warn('Failed to parse error details:', parseError);
    }
    
    throw new Error(message);
  }
}