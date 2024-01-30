import { GenerativeContentBlob, GenerativeModel } from "@google/generative-ai";

export const getAiContent = async (
    model: GenerativeModel,
    prompts: string,
    inlineData: GenerativeContentBlob,
    stream: boolean,
    onContentMessage: (message: string, end: boolean) => void
) => {
    try {
        if (stream) {
            const result = await model.generateContentStream([
                prompts,
                { inlineData },
            ]);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                onContentMessage(chunkText, false);
            }
            onContentMessage("", true);
        } else {
            const result = await model.generateContent([
                prompts,
                { inlineData },
            ]);
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
