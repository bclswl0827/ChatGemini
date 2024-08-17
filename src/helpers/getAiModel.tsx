import { BaseParams, GoogleGenerativeAI } from "@google/generative-ai";

export type AiType = "pro" | "vision";

export const getAiModel = (
    ai: GoogleGenerativeAI,
    type: AiType = "pro",
    options?: BaseParams
) =>
    ai.getGenerativeModel({
        ...options,
        model: type === "pro" ? "gemini-pro" : "gemini-1.5-flash",
    });
