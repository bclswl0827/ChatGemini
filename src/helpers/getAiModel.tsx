import { BaseParams, GoogleGenerativeAI } from "@google/generative-ai";

export const getAiModel = (
    ai: GoogleGenerativeAI,
    model: string,
    options: BaseParams
) => {
    return ai.getGenerativeModel({ model, ...options });
};
