import { GoogleGenerativeAI as OfficialGoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAI as thirdPartyGoogleGenerativeAI } from "@fuyun/generative-ai";

export const createAiObj = <T,>(key: string, api: string | null): T => {
    if (api !== null) {
        const ai = new thirdPartyGoogleGenerativeAI(key, api) as unknown;
        return ai as T;
    }

    return new OfficialGoogleGenerativeAI(key) as T;
};
