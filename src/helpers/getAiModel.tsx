import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiModel = (ai: GoogleGenerativeAI) => {
    return ai.getGenerativeModel({ model: "gemini-pro" });
};
