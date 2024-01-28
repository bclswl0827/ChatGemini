import { useParams } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import { Session, SessionRole } from "../components/Session";
import { useEffect, useRef, useState } from "react";
import { SessionHistory } from "../store/sessions";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreProps } from "../config/store";
import { onUpdate as updateAI } from "../store/ai";
import { onUpdate as updateSessions } from "../store/sessions";
import { getChats } from "../helpers/getChats";
import { getAiModel } from "../helpers/getAiModel";
import { modelConfig } from "../config/model";
import { globalConfig } from "../config/global";

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
                    { role: "model", parts: RefreshPlaceholder },
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
                _sessions = {
                    ..._sessions,
                    [id]: [
                        ..._sessions[id].slice(0, index),
                        { role: "model", parts: `${prevParts}${message}` },
                    ],
                };
                setChat(_sessions[id]);
                dispatch(updateSessions(_sessions));
            };
            await getChats(
                getAiModel(ai.obj, "gemini-pro", modelConfig),
                chat.slice(0, index - 1),
                chat[index - 1].parts,
                globalConfig.sse,
                modelConfig,
                handler
            );
        }
    };

    const scrollToBottom = () =>
        sessionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

    useEffect(() => {
        if (id && id in sessions) {
            setChat(sessions[id]);
        } else {
            setChat([{ role: "model", parts: FallbackIfIdInvalid }]);
        }
        scrollToBottom();
        const { current } = sessionRef;
        current?.addEventListener("DOMNodeInserted", scrollToBottom);
        return () =>
            current?.removeEventListener("DOMNodeInserted", scrollToBottom);
    }, [id, sessions, sessionRef]);

    return (
        <div
            className="max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]"
            ref={sessionRef}
        >
            {chat.map(({ role, parts }, index) => (
                <Session
                    key={index}
                    index={index}
                    role={role as SessionRole}
                    onRefresh={handleRefresh}
                >
                    <Markdown>{parts}</Markdown>
                </Session>
            ))}
        </div>
    );
};

export default Chat;
