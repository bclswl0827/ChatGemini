import { useParams } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { Session, SessionRole } from "../components/Session";
import { useEffect, useRef, useState } from "react";
import { SessionHistory } from "../store/sessions";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreProps } from "../config/store";
import { onUpdate as updateAI } from "../store/ai";
import { onUpdate as updateSessions } from "../store/sessions";
import { getAiChats } from "../helpers/getAiChats";
import { modelConfig } from "../config/model";
import { globalConfig } from "../config/global";
import { Container } from "../components/Container";
import { getAiContent } from "../helpers/getAiContent";
import { GenerativeContentBlob } from "@google/generative-ai";
import { getBase64BlobUrl } from "../helpers/getBase64BlobUrl";
import { ImageView } from "../components/ImageView";

const RefreshPlaceholder = "重新生成中...";
const FallbackIfIdInvalid =
    "您当前的会话 ID 似乎无效，请检查您的网址，您也可以新建一个会话。";

const Chat = () => {
    const dispatch = useDispatch();
    const sessions = useSelector(
        (state: ReduxStoreProps) => state.sessions.sessions
    );

    const ai = useSelector((state: ReduxStoreProps) => state.ai.ai);
    const { id } = useParams<{ id: keyof typeof sessions }>();
    const [chat, setChat] = useState<SessionHistory[]>([]);
    const sessionRef = useRef<HTMLDivElement>(null);

    const handleRefresh = async (index: number) => {
        if (!ai.busy && id && id in sessions) {
            let _sessions = {
                ...sessions,
                [id]: [
                    ...sessions[id].slice(0, index),
                    {
                        role: "model",
                        parts: RefreshPlaceholder,
                        timestamp: Date.now(),
                    },
                ],
            };
            dispatch(updateAI({ ...ai, busy: true }));
            dispatch(updateSessions(_sessions));

            const handler = (message: string, end: boolean) => {
                if (end) {
                    dispatch(updateAI({ ...ai, busy: false }));
                }
                const prevParts =
                    _sessions[id][index].parts !== RefreshPlaceholder
                        ? _sessions[id][index].parts
                        : "";
                const updatedTimestamp = Date.now();
                _sessions = {
                    ..._sessions,
                    [id]: [
                        ..._sessions[id].slice(0, index),
                        {
                            role: "model",
                            parts: `${prevParts}${message}`,
                            timestamp: updatedTimestamp,
                        },
                    ],
                };
                setChat(_sessions[id]);
                dispatch(updateSessions(_sessions));
            };
            if (!chat[index - 1].attachment?.data.length) {
                await getAiChats(
                    ai.model.pro,
                    chat.slice(0, index - 1),
                    chat[index - 1].parts,
                    globalConfig.sse,
                    modelConfig,
                    handler
                );
            } else {
                await getAiContent(
                    ai.model.vision,
                    chat[index - 1].parts,
                    chat[index - 1].attachment as GenerativeContentBlob,
                    globalConfig.sse,
                    handler
                );
            }
        }
    };

    const scrollToBottom = ({ animationName }: AnimationEvent) =>
        animationName === "nodeInserted" &&
        sessionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

    useEffect(() => {
        if (id && id in sessions) {
            setChat(sessions[id]);
            scrollToBottom({ animationName: "nodeInserted" } as AnimationEvent);
        } else {
            setChat([
                { role: "model", parts: FallbackIfIdInvalid, timestamp: 0 },
            ]);
        }
        const { current } = sessionRef;
        current?.addEventListener("animationstart", scrollToBottom);
        return () =>
            current?.removeEventListener("animationstart", scrollToBottom);
    }, [id, sessions, sessionRef]);

    return (
        <Container
            className="max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]"
            ref={sessionRef}
        >
            <ImageView>
                {chat.map(({ role, parts, attachment }, index) => {
                    const { mimeType, data } = attachment ?? {
                        mimeType: "",
                        data: "",
                    };
                    const base64BlobURL = data.length
                        ? getBase64BlobUrl(`data:${mimeType};base64,${data}`)
                        : "";
                    const attachmentHtml = `<div>
                    <span>点击图片看大图</span>
                    <a data-image-view="gallery" href="${base64BlobURL}">
                        <img alt="图片附件" src="${base64BlobURL}" style="max-width: 7rem;" />
                    </a>
                </div>`;

                    return (
                        <Session
                            key={index}
                            index={index}
                            role={role as SessionRole}
                            onRefresh={handleRefresh}
                        >
                            <Markdown>{`${parts}${
                                data.length
                                    ? `\n\n---\n\n${attachmentHtml}`
                                    : ""
                            }`}</Markdown>
                        </Session>
                    );
                })}
            </ImageView>
        </Container>
    );
};

export default Chat;
