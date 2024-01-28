import {
    GenerateContentRequest,
    GenerativeModel,
    Part,
} from "@google/generative-ai";

type OnContentMessage = (message: string, end: boolean) => void;

export const getContent = async (
    model: GenerativeModel,
    prompts: string | GenerateContentRequest | (string | Part)[],
    stream: boolean,
    onContentMessage: OnContentMessage
) => {
    try {
        if (stream) {
            const result = await model.generateContentStream(prompts);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                onContentMessage(chunkText, false);
            }
            onContentMessage("", true);
        } else {
            const result = await model.generateContent(prompts);
            const response = result.response;
            const text = response.text();
            onContentMessage(text, false);
            onContentMessage("", true);
        }
    } catch (e) {
        const err = e as any;
        onContentMessage(err.message, true);
    }
};
