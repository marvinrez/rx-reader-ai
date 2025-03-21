import { apiRequest } from "@/lib/queryClient";
import { PrescriptionAnalysis } from "@shared/schema";

export async function analyzePrescriptionImage(imageBase64: string): Promise<PrescriptionAnalysis> {
  try {
    const response = await apiRequest('POST', '/api/prescriptions/analyze', { imageBase64 });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing prescription:', error);
    
    // Check if it's related to OpenAI API or file size
    let message = error instanceof Error ? error.message : 'Failed to analyze the prescription';
    let errorType: 'api' | 'size' | 'general' = 'general';
    
    if (message.includes('quota') || message.includes('exceeded')) {
      message = 'OpenAI API quota exceeded. Please contact support for assistance.';
      errorType = 'api';
    } else if (message.includes('api key') || message.includes('apiKey')) {
      message = 'Invalid API key. Please contact support to update the API key.';
      errorType = 'api';
    } else if (message.includes('413') || message.includes('too large') || message.includes('payload')) {
      message = 'The image is too large. Please try with a smaller or reduced image.';
      errorType = 'size';
    }
    
    // Customizar o objeto de erro para incluir o tipo
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
    
    // Melhor tratamento de erros relacionados à API OpenAI
    let message = error instanceof Error ? error.message : 'Falha ao enviar mensagem';
    let errorType: 'api' | 'general' = 'general';
    
    if (message.includes('quota') || message.includes('exceeded')) {
      message = 'A cota da API OpenAI foi excedida. Entre em contato com o suporte para assistência.';
      errorType = 'api';
    } else if (message.includes('api key') || message.includes('apiKey')) {
      message = 'Chave API inválida. Entre em contato com o suporte para atualizar a chave API.';
      errorType = 'api';
    }
    
    // Customizar o objeto de erro para incluir o tipo
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
    throw new Error(error instanceof Error ? error.message : 'Failed to submit feedback');
  }
}
