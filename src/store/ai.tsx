import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { createSlice } from "@reduxjs/toolkit";
import { createAiObj } from "../helpers/createAiObj";
import { globalConfig } from "../config/global";
import { AiType, getAiModel } from "../helpers/getAiModel";
import { modelConfig } from "../config/model";
import { getRandomArr } from "../helpers/getRandomArr";

export interface AI<O, M> {
    readonly busy: boolean;
    readonly obj: O;
    readonly model: M;
}

const { keys, api } = globalConfig;
const [key] = getRandomArr(keys, 1);

const obj = createAiObj<GoogleGenerativeAI>(key, api);
const model = {
    pro: getAiModel(obj, "pro", modelConfig),
    vision: getAiModel(obj, "vision", modelConfig),
};

export const initialAI: AI<
    GoogleGenerativeAI,
    Record<AiType, GenerativeModel>
> = { busy: false, obj, model };

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
