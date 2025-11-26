import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProductDescription = async (name: string, category: string, price: number): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI description unavailable (Missing API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, short, and aesthetic product description (max 2 sentences) for a product named "${name}" in the category "${category}" priced at $${price}. Adopt a sophisticated, minimalist tone.`,
    });
    
    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description.";
  }
};