import { useParams } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { Session, SessionEditState, SessionRole } from "../components/Session";
import { useCallback, useEffect, useState } from "react";
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
import { RouterComponentProps, routerConfig } from "../config/router";
import { PyodideInterface } from "pyodide";
import { useTranslation } from "react-i18next";

const Chat = (props: RouterComponentProps) => {
    const { t } = useTranslation();
    const viewAttachment = t("views.Chat.view_attachment");
    const refreshPlaceholder = t("views.Chat.refresh_placeholder");
    const invalidPlaceholder = t("views.Chat.invalid_placeholder");

    const mainSectionRef = props.refs?.mainSectionRef.current ?? null;
    const { site: siteTitle } = globalConfig.title;
    const { mode, basename } = routerConfig;

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
    const [attachmentsURL, setAttachmentsURL] = useState<
        Record<number, string>
    >({});
    const [pythonRuntime, setPythonRuntime] = useState<PyodideInterface | null>(
        null
    );

    const handlePythonRuntimeCreated = (pyodide: PyodideInterface) =>
        setPythonRuntime(pyodide);

    const scrollToBottom = useCallback(
        (force: boolean = false) =>
            (ai.busy || force) &&
            mainSectionRef?.scrollTo({
                top: mainSectionRef.scrollHeight,
                behavior: "smooth",
            }),
        [ai, mainSectionRef]
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
                        parts: refreshPlaceholder,
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
                    _sessions[id][index].parts !== refreshPlaceholder
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
            sendUserAlert(t("views.Chat.handleRefresh.not_available"), true);
        }
    };

    const handleEdit = (
        index: number,
        state: SessionEditState,
        prompt: string
    ) => {
        if (!ai.busy) {
            setEditState({ index, state });
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
                    { ...sessions[id][index], parts: prompt },
                    {
                        role: "model",
                        parts: refreshPlaceholder,
                        timestamp: Date.now(),
                    },
                ],
            };
            setChat(_sessions[id]);
            handleRefresh(index + 1, _sessions);
        } else if (ai.busy) {
            sendUserAlert(t("views.Chat.handleEdit.not_available"), true);
        }
    };

    const handleDelete = (index: number) => {
        if (!ai.busy && id && id in sessions) {
            sendUserConfirm(t("views.Chat.handleDelete.confirm_message"), {
                title: t("views.Chat.handleDelete.confirm_title"),
                confirmText: t("views.Chat.handleDelete.confirm_button"),
                cancelText: t("views.Chat.handleDelete.cancel_button"),
                onConfirmed: () => {
                    const _sessions = {
                        ...sessions,
                        [id]: [
                            ...sessions[id].slice(0, index - 1),
                            ...sessions[id].slice(index + 1),
                        ],
                    };
                    dispatch(updateSessions(_sessions));
                    setChat(_sessions[id]);
                },
            });
        } else if (ai.busy) {
            sendUserAlert(t("views.Chat.handleDelete.not_available"), true);
        }
    };

    useEffect(() => {
        if (id && id in sessions) {
            setChat(sessions[id]);
            let sessionTitle = sessions[id][0].title ?? sessions[id][0].parts;
            if (sessionTitle.length > 20) {
                sessionTitle = `${sessionTitle.substring(0, 20)} ...`;
            }
            document.title = `${sessionTitle} | ${siteTitle}`;
        } else {
            document.title = siteTitle;
            setChat([
                { role: "model", parts: invalidPlaceholder, timestamp: 0 },
            ]);
        }
        setTimeout(() => scrollToBottom(true), 300);
    }, [t, siteTitle, id, sessions, mainSectionRef, scrollToBottom]);

    return (
        <Container className="max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]">
            <ImageView>
                {chat.map(({ role, parts, attachment, timestamp }, index) => {
                    const { mimeType, data } = attachment ?? {
                        mimeType: "",
                        data: "",
                    };
                    let base64BlobURL = "";
                    if (!!data.length && timestamp in attachmentsURL) {
                        base64BlobURL = attachmentsURL[timestamp];
                    } else if (!!data.length) {
                        base64BlobURL = getBase64BlobUrl(
                            `data:${mimeType};base64,${data}`
                        );
                        setAttachmentsURL((prev) => ({
                            ...prev,
                            [timestamp]: base64BlobURL,
                        }));
                    }

                    const attachmentPostscriptHtml = `\n\n---\n\n<div class="inline-block text-center overflow-hidden">
                        <a data-image-view="gallery" href="${base64BlobURL}">
                            <img src="${base64BlobURL}" style="
                                max-width: 10rem;
                                margin-top: 0;
                                margin-bottom: 0.2rem;
                                border-radius: 0.25rem;
                            " alt="" />
                        </a>
                        <span class="text-xs text-gray-400">
                            ${viewAttachment}
                        </span>
                    </div>`;

                    const typingEffect = `<div class="inline px-1 bg-gray-900 animate-pulse animate-duration-700"></div>`;
                    if (
                        ai.busy &&
                        role === SessionRole.Model &&
                        index === chat.length - 1
                    ) {
                        parts += typingEffect;
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
                            postscript={
                                !!data.length ? attachmentPostscriptHtml : ""
                            }
                        >
                            <Markdown
                                typingEffect={typingEffect}
                                pythonRuntime={pythonRuntime}
                                onPythonRuntimeCreated={
                                    handlePythonRuntimeCreated
                                }
                                pythonRepoUrl={`${
                                    mode === "hash"
                                        ? window.location.pathname
                                        : basename
                                }pyodide`}
                            >{`${parts}${
                                !!data.length ? attachmentPostscriptHtml : ""
                            }`}</Markdown>
                        </Session>
                    );
                })}
            </ImageView>
        </Container>
    );
};

export default Chat;
