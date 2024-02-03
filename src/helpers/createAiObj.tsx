import { GoogleGenerativeAI as OfficalGoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAI as thirdPartyGoogleGenerativeAI } from "@fuyun/generative-ai";

export const createAiObj = (key: string, api: string | null) => {
    if (api !== null) {
        const ai = new thirdPartyGoogleGenerativeAI(key, api) as unknown;
        return ai as OfficalGoogleGenerativeAI;
    }

    return new OfficalGoogleGenerativeAI(key);
};
