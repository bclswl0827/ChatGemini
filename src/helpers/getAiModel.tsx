import { GoogleGenerativeAI } from "@google/generative-ai";

export type AiType = "pro" | "vision";

export const getAiModel = (ai: GoogleGenerativeAI, type: AiType = "pro") => {
    return ai.getGenerativeModel({
        model: type === "pro" ? "gemini-pro" : "gemini-pro-vision",
    });
};
