import { GoogleGenerativeAI } from "@google/generative-ai";
import { createSlice } from "@reduxjs/toolkit";
import { createAiObj } from "../helpers/createAiObj";
import { globalConfig } from "../config/global";

export interface AI {
    readonly busy: boolean;
    readonly obj: GoogleGenerativeAI;
}

const ai = createAiObj(globalConfig.key);
export const initialAI: AI = { busy: false, obj: ai };

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
