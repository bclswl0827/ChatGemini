import { useParams } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { Session, SessionEditState, SessionRole } from "../components/Session";
import { useCallback, useEffect, useRef, useState } from "react";
import { SessionHistory, Sessions } from "../store/sessions";
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
import { sendUserConfirm } from "../helpers/sendUserConfirm";
import { sendUserAlert } from "../helpers/sendUserAlert";

const RefreshPlaceholder = "重新生成中...";
const FallbackIfIdInvalid =
    "您当前的会话 ID 似乎无效，请检查您的网址，您也可以新建一个会话。";

const Chat = () => {
    const { site: siteTitle } = globalConfig.title;

    const dispatch = useDispatch();
    const sessions = useSelector(
        (state: ReduxStoreProps) => state.sessions.sessions
    );

    const ai = useSelector((state: ReduxStoreProps) => state.ai.ai);
    const { id } = useParams<{ id: keyof typeof sessions }>();
    const [chat, setChat] = useState<SessionHistory[]>([]);
    const [editState, setEditState] = useState<{
        index: number;
        state: SessionEditState;
    }>({ index: 0, state: SessionEditState.Cancel });
    const sessionRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(
        (force: boolean = false) => {
            (ai.busy || force) &&
                sessionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                });
        },
        [ai]
    );

    const handleDOMNodeChanged = useCallback(
        () => scrollToBottom(),
        [scrollToBottom]
    );

    const handleRefresh = async (index: number, customSessions?: Sessions) => {
        const finalSessions = customSessions ?? sessions;
        if (!ai.busy && id && id in finalSessions) {
            let _sessions = {
                ...finalSessions,
                [id]: [
                    ...finalSessions[id].slice(0, index),
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
            if (!_sessions[id][index - 1].attachment?.data.length) {
                await getAiChats(
                    ai.model.pro,
                    _sessions[id].slice(0, index - 1),
                    _sessions[id][index - 1].parts,
                    globalConfig.sse,
                    modelConfig,
                    handler
                );
            } else {
                await getAiContent(
                    ai.model.vision,
                    _sessions[id][index - 1].parts,
                    _sessions[id][index - 1]
                        .attachment as GenerativeContentBlob,
                    globalConfig.sse,
                    handler
                );
            }
        } else if (ai.busy) {
            sendUserAlert("AI 正忙，请稍后再试", true);
        }
    };

    const handleEdit = (
        index: number,
        state: SessionEditState,
        prompt: string
    ) => {
        if (!ai.busy) {
            setEditState({
                index,
                state,
            });
        }
        if (
            !ai.busy &&
            id &&
            id in sessions &&
            !!prompt.length &&
            state === SessionEditState.Done
        ) {
            const _sessions = {
                ...sessions,
                [id]: [
                    ...sessions[id].slice(0, index),
                    {
                        ...sessions[id][index],
                        parts: prompt,
                    },
                    {
                        role: "model",
                        parts: RefreshPlaceholder,
                        timestamp: Date.now(),
                    },
                ],
            };
            setChat(_sessions[id]);
            handleRefresh(index + 1, _sessions);
        } else if (ai.busy) {
            sendUserAlert("AI 正忙，请稍后再试", true);
        }
    };

    const handleDelete = (index: number) => {
        if (!ai.busy && id && id in sessions) {
            sendUserConfirm("这则回应和对应提问都将被移除，要继续吗？", () => {
                const _sessions = {
                    ...sessions,
                    [id]: [
                        ...sessions[id].slice(0, index - 1),
                        ...sessions[id].slice(index + 1),
                    ],
                };
                dispatch(updateSessions(_sessions));
                setChat(_sessions[id]);
            });
        } else if (ai.busy) {
            sendUserAlert("AI 正忙，请稍后再试", true);
        }
    };

    useEffect(() => {
        if (id && id in sessions) {
            setChat(sessions[id]);
            let sessionTitle = sessions[id][0].parts;
            if (sessionTitle.length > 20) {
                sessionTitle = `${sessionTitle.substring(0, 20)} ...`;
            }
            document.title = `${sessionTitle} | ${siteTitle}`;
            scrollToBottom(true);
        } else {
            document.title = `会话无效 | ${siteTitle}`;
            setChat([
                { role: "model", parts: FallbackIfIdInvalid, timestamp: 0 },
            ]);
        }
        const { current } = sessionRef;
        current?.addEventListener("DOMNodeInserted", handleDOMNodeChanged);
        current?.addEventListener("DOMNodeRemoved", handleDOMNodeChanged);
        return () => {
            current?.removeEventListener(
                "DOMNodeInserted",
                handleDOMNodeChanged
            );
            current?.removeEventListener(
                "DOMNodeRemoved",
                handleDOMNodeChanged
            );
        };
    }, [
        siteTitle,
        id,
        sessions,
        sessionRef,
        scrollToBottom,
        handleDOMNodeChanged,
    ]);

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
                    const base64BlobURL = !!data.length
                        ? getBase64BlobUrl(`data:${mimeType};base64,${data}`)
                        : "";
                    const attachmentHtml = `<div class="inline-block text-center overflow-hidden">
                        <a data-image-view="gallery" href="${base64BlobURL}">
                            <img src="${base64BlobURL}" style="
                                max-width: 10rem;
                                margin-top: 0;
                                margin-bottom: 0.2rem;
                                border-radius: 0.25rem;
                            " alt="图片附件" />
                        </a>
                        <span class="text-xs text-gray-400">
                            点击查看大图
                        </span>
                    </div>`;

                    if (
                        ai.busy &&
                        role === SessionRole.Model &&
                        index === chat.length - 1
                    ) {
                        parts += `<div class="inline px-1 bg-gray-900 animate-pulse animate-duration-700"></div>`;
                    }
                    return (
                        <Session
                            key={index}
                            index={index}
                            prompt={parts}
                            editState={editState}
                            role={role as SessionRole}
                            onRefresh={handleRefresh}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        >
                            <Markdown>{`${parts}${
                                !!data.length
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
