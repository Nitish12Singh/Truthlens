import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface FactCheckResult {
  verdict: "Verified" | "False" | "Unclear";
  score: number;
  reasoning: string;
  sources: { title: string; url: string }[];
}

export async function factCheck(claim: string): Promise<FactCheckResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Fact-check the following claim: "${claim}". Provide a verdict (Verified, False, or Unclear), a credibility score (0-100), detailed reasoning, and source links.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING, enum: ["Verified", "False", "Unclear"] },
          score: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          sources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["title", "url"]
            }
          }
        },
        required: ["verdict", "score", "reasoning", "sources"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as FactCheckResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      verdict: "Unclear",
      score: 50,
      reasoning: "Failed to analyze the claim properly.",
      sources: []
    };
  }
}
