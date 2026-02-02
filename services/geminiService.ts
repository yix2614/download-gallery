
import { GoogleGenAI, Type } from "@google/genai";
import { TikTokTrend } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchTrendingContent = async (): Promise<TikTokTrend[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 10 trending TikTok video ideas. Include a catchy user handle, a creative caption, a simulated like count (e.g. 1.2M), and a category. The ideas should be diverse (dance, tech, cooking, humor, travel).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  user: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  likes: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ["id", "user", "caption", "likes", "category"]
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{"trends": []}');
    return (result.trends || []).map((trend: any, index: number) => ({
      ...trend,
      imageUrl: `https://picsum.photos/seed/${index + 100}/400/600`
    }));
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    // Fallback data if API fails or no key
    return Array.from({ length: 10 }).map((_, i) => ({
      id: String(i),
      user: `@trend_setter_${i}`,
      caption: "Living my best life in 2024! #vibes",
      likes: "500K",
      category: "Lifestyle",
      imageUrl: `https://picsum.photos/seed/${i + 200}/400/600`
    }));
  }
};
