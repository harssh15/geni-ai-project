import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface UserProfile {
  name: string;
  education: string;
  skills: string;
  interests: string;
  personalityTraits: string;
  experienceLevel: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  whyMatch: string;
  requiredSkills: string[];
  learningPath: string[];
  marketOutlook: string;
  potentialSalary: string;
}

export interface CareerGuidanceResponse {
  recommendations: CareerRecommendation[];
  generalAdvice: string;
  nextSteps: string[];
}

export async function getCareerRecommendations(profile: UserProfile): Promise<CareerGuidanceResponse> {
  const prompt = `
    Analyze the following user profile and provide 3-5 career recommendations.
    
    User Profile:
    - Name: ${profile.name}
    - Education: ${profile.education}
    - Skills: ${profile.skills}
    - Interests: ${profile.interests}
    - Personality Traits: ${profile.personalityTraits}
    - Experience Level: ${profile.experienceLevel}
    
    For each recommendation, provide:
    1. Title
    2. Description
    3. Match Score (0-100)
    4. Why it matches their profile
    5. Required Skills to acquire or improve
    6. A clear learning path
    7. Market outlook (growing, stable, etc.)
    8. Potential salary range
    
    Also provide general career advice and specific next steps.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert career counselor and industry analyst. Provide detailed, actionable, and personalized career advice based on the user's profile. Return the response in a structured JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                whyMatch: { type: Type.STRING },
                requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                learningPath: { type: Type.ARRAY, items: { type: Type.STRING } },
                marketOutlook: { type: Type.STRING },
                potentialSalary: { type: Type.STRING },
              },
              required: ["title", "description", "matchScore", "whyMatch", "requiredSkills", "learningPath", "marketOutlook", "potentialSalary"],
            },
          },
          generalAdvice: { type: Type.STRING },
          nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["recommendations", "generalAdvice", "nextSteps"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as CareerGuidanceResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate career recommendations. Please try again.");
  }
}
