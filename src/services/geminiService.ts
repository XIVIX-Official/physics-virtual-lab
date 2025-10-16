import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found in environment variables. The AI Tutor will not function.");
}

export const getTutorResponse = async (context: string, question: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: Gemini API key is not configured. Please set the API_KEY environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const fullPrompt = `${context}\n\nUser's question: "${question}"\n\nYour answer:`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while fetching the explanation: ${error.message}`;
    }
    return "An unknown error occurred while fetching the explanation.";
  }
};