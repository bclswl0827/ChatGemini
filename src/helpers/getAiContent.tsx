import { GenerativeContentBlob, GenerativeModel } from "@google/generative-ai";
import { asyncSleep } from "./asyncSleep";

export const getAiContent = async (
    model: GenerativeModel,
    prompts: string,
    inlineData: GenerativeContentBlob,
    stream: boolean,
    onContentMessage: (message: string, end: boolean) => void
) => {
    const TypeWriterEffectThreshold = 30;
    try {
        if (stream) {
            const result = await model.generateContentStream([
                prompts,
                { inlineData },
            ]);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (chunkText.length > TypeWriterEffectThreshold) {
                    const chunkTextArr = chunkText.split("");
                    for (
                        let i = 0;
                        i < chunkTextArr.length;
                        i += TypeWriterEffectThreshold
                    ) {
                        onContentMessage(
                            chunkTextArr
                                .slice(i, i + TypeWriterEffectThreshold)
                                .join(""),
                            false
                        );
                        await asyncSleep(Math.random() * 600 + 300);
                    }
                } else {
                    onContentMessage(chunkText, false);
                }
            }
            onContentMessage("", true);
        } else {
            const result = await model.generateContent([
                prompts,
                { inlineData },
            ]);
            const response = result.response;
            const text = response.text();
            if (text.length > TypeWriterEffectThreshold) {
                const textArr = text.split("");
                for (
                    let i = 0;
                    i < textArr.length;
                    i += TypeWriterEffectThreshold
                ) {
                    onContentMessage(
                        textArr
                            .slice(i, i + TypeWriterEffectThreshold)
                            .join(""),
                        false
                    );
                    await asyncSleep(Math.random() * 600 + 300);
                }
            } else {
                onContentMessage(text, false);
            }
            onContentMessage("", true);
        }
    } catch (e) {
        const err = e as any;
        onContentMessage(err.message, true);
    }
};
