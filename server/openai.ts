import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder-key-for-development"
});

/**
 * Analyzes a prescription image using OpenAI's vision model
 */
export async function analyzeImage(base64Image: string): Promise<string> {
  try {
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI specialized in analyzing medical prescriptions. Focus on identifying medication names, dosages, and instructions. Be precise and thorough."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is a handwritten medical prescription. Please analyze it in detail and identify all medications, dosages, and usage instructions. Format your response in a clear, structured way that's easy to understand."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 500,
    });

    return visionResponse.choices[0].message.content || "Unable to analyze the prescription.";
  } catch (error: any) {
    console.error("OpenAI Vision API error:", error);
    
    // Check if error is related to quota exceeded
    if (error?.error?.type === 'insufficient_quota' || 
        (error?.message && error.message.includes('quota'))) {
      throw new Error("OpenAI API quota exceeded. Please contact support for assistance.");
    }
    
    // Check if error is related to API key
    if (error?.error?.type === 'invalid_api_key' || 
        (error?.message && error.message.includes('api key'))) {
      throw new Error("Invalid OpenAI API key. Please update your API key.");
    }
    
    throw new Error("Failed to analyze the prescription image. Please try again.");
  }
}

/**
 * Extracts structured medication information from the analysis text
 */
export async function extractMedicationInfo(analysisText: string): Promise<{
  medications: Array<{
    name: string;
    dosage: string;
    instructions?: string;
  }>;
  additionalInfo?: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI specialized in extracting structured medication information from prescription analyses. Extract the medication names, dosages, and instructions into a structured format."
        },
        {
          role: "user",
          content: `Extract the medication information from this prescription analysis into a structured JSON format with an array of medications. Each medication should have 'name', 'dosage', and optionally 'instructions' fields. You may also include an 'additionalInfo' field for any relevant notes. Here's the analysis:\n\n${analysisText}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Ensure the response has the expected structure
    return {
      medications: Array.isArray(result.medications) ? result.medications : [],
      additionalInfo: result.additionalInfo || undefined
    };
  } catch (error: any) {
    console.error("Error extracting medication info:", error);
    
    // Check if error is related to quota exceeded
    if (error?.error?.type === 'insufficient_quota' || 
        (error?.message && error.message.includes('quota'))) {
      throw new Error("OpenAI API quota exceeded. Please contact support for assistance.");
    }
    
    // Check if error is related to API key
    if (error?.error?.type === 'invalid_api_key' || 
        (error?.message && error.message.includes('api key'))) {
      throw new Error("Invalid OpenAI API key. Please update your API key.");
    }
    
    // If it's another type of error, return empty structure
    return { medications: [] };
  }
}

/**
 * Gets an AI response for a user message
 */
export async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical prescription assistant called RX Reader. You help users understand their prescriptions and provide general information about medications. Always remind users to follow their doctor's instructions and consult healthcare professionals for medical advice. Keep your responses concise, friendly, and informative."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 300
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error: any) {
    console.error("OpenAI Chat API error:", error);
    
    // Check if error is related to quota exceeded
    if (error?.error?.type === 'insufficient_quota' || 
        (error?.message && error.message.includes('quota'))) {
      throw new Error("OpenAI API quota exceeded. Please contact support for assistance.");
    }
    
    // Check if error is related to API key
    if (error?.error?.type === 'invalid_api_key' || 
        (error?.message && error.message.includes('api key'))) {
      throw new Error("Invalid OpenAI API key. Please update your API key.");
    }
    
    throw new Error("Failed to get a response. Please try again.");
  }
}
