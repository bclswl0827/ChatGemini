import { GoogleGenerativeAI } from "@google/generative-ai";

export const createAiObj = (key: string) => {
    return new GoogleGenerativeAI(key);
};
