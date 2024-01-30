import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { createSlice } from "@reduxjs/toolkit";
import { createAiObj } from "../helpers/createAiObj";
import { globalConfig } from "../config/global";
import { AiType, getAiModel } from "../helpers/getAiModel";

export interface AI {
    readonly busy: boolean;
    readonly obj: GoogleGenerativeAI;
    readonly model: Record<AiType, GenerativeModel>;
}

const { key, api } = globalConfig;
const obj = createAiObj(key ?? "", api);
const model = {
    pro: getAiModel(obj, "pro"),
    vision: getAiModel(obj, "vision"),
};

export const initialAI: AI = { busy: false, obj, model };

const slice = createSlice({
    name: "ai",
    initialState: { ai: initialAI },
    reducers: {
        onUpdate: (state, action) => {
            const { payload } = action;
            state.ai = payload;
        },
    },
});

export default slice.reducer;
export const { onUpdate } = slice.actions;
