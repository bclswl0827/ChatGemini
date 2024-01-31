import { BaseParams, GoogleGenerativeAI } from "@google/generative-ai";

export type AiType = "pro" | "vision";

export const getAiModel = (
    ai: GoogleGenerativeAI,
    type: AiType = "pro",
    options?: BaseParams
) => {
    return ai.getGenerativeModel({
        ...options,
        model: type === "pro" ? "gemini-pro" : "gemini-pro-vision",
    });
};
