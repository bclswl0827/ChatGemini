import { BaseParams, GenerativeModel, Part } from "@google/generative-ai";
import { SessionHistory } from "../store/sessions";

export const getAiChats = async (
    model: GenerativeModel,
    history: SessionHistory[],
    prompts: string | Array<string | Part>,
    stream: boolean,
    options: BaseParams,
    onChatMessage: (message: string, end: boolean) => void
) => {
    try {
        const payload = history.map((item) => {
            const { timestamp, attachment, ...rest } = item;
            return rest;
        });

        if (stream) {
            const chat = model.startChat({ ...options, history: payload });
            const result = await chat.sendMessageStream(prompts);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                onChatMessage(chunkText, false);
            }
            onChatMessage("", true);
        } else {
            const chat = model.startChat({
                ...options,
                history: payload,
            });
            const result = await chat.sendMessage(prompts);
            const response = result.response;
            const text = response.text();
            onChatMessage(text, false);
            onChatMessage("", true);
        }
    } catch (e) {
        const err = e as any;
        onChatMessage(err.message, true);
    }
};
