import { useEffect, useState } from "react";
import { globalConfig } from "./config/global";
import { Sidebar } from "./components/Sidebar";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { InputArea } from "./components/InputArea";
import { routerConfig } from "./config/router";
import { RouterView } from "./components/RouterView";
import { Skeleton } from "./components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreProps } from "./config/store";
import { onUpdate as updateAI } from "./store/ai";
import toast from "react-hot-toast";
import { matchPath, useNavigate } from "react-router-dom";
import { getTextFile } from "./helpers/getTextFile";
import { getChats } from "./helpers/getChats";
import { modelConfig } from "./config/model";
import { initialSessions, onUpdate as updateSessions } from "./store/sessions";

const ModelPlaceholder = "正在思考中...";

const App = () => {
    const { routes } = routerConfig;
    const { sse, title } = globalConfig;
    const { header, site } = title;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessions = useSelector(
        (state: ReduxStoreProps) => state.sessions.sessions
    );
    const ai = useSelector((state: ReduxStoreProps) => state.ai.ai);
    const [sidebarExpand, setSidebarExpand] = useState(false);

    const handleExportSession = (id: string) => {
        const session = sessions[id];
        if (session) {
            const exportTime = new Date().toLocaleString();
            const sessionTime = new Date(parseInt(id)).toLocaleString();
            let exportData = `对话时间 ${sessionTime}\n导出时间 ${exportTime}\n\n`;
            session.forEach(({ role, parts }) => {
                exportData += `${role === "user" ? "用户" : "Bot"}：${parts}\n`;
            });
            getTextFile(exportData, `对话导出_${id}.txt`);
        } else {
            toast.error("无法导出对话记录");
        }
    };

    const handleDeleteSession = (id: string) => {
        navigate(routes.index.prefix);
        const _sessions = { ...sessions };
        delete _sessions[id];
        dispatch(updateSessions(_sessions));
        toast.success("成功删除这条对话记录", { duration: 1000 });
    };

    const handlePurgeSessions = () => {
        navigate(routes.index.prefix);
        dispatch(updateSessions(initialSessions));
        dispatch(updateAI({ ...ai, busy: false }));
        toast.success("成功清理全部对话记录", { duration: 1000 });
    };

    const handleSubmit = async (prompt: string) => {
        if (!prompt.trim().length) {
            toast.error("请输入对话内容");
            return;
        }

        const { prefix, uri, suffix } = routes.chat;
        const { hash, pathname } = window.location;
        let { id } = (matchPath(
            { path: `${prefix}${uri}${suffix}` },
            hash.replace("#", "") || pathname
        )?.params as { id: string }) ?? { id: Date.now().toString() };

        if (isNaN(new Date(parseInt(id)).getTime())) {
            toast.error("无法识别的对话 ID");
            return;
        }

        const currentSessionHistory = id in sessions ? sessions[id] : [];
        const currentTimestamp = Date.now();
        let _sessions =
            id in sessions
                ? {
                      ...sessions,
                      [id]: [
                          ...sessions[id],
                          {
                              role: "user",
                              parts: prompt,
                              timestamp: currentTimestamp,
                          },
                          {
                              role: "model",
                              parts: ModelPlaceholder,
                              timestamp: currentTimestamp,
                          },
                      ],
                  }
                : {
                      ...sessions,
                      [id]: [
                          {
                              role: "user",
                              parts: prompt,
                              timestamp: currentTimestamp,
                          },
                          {
                              role: "model",
                              parts: ModelPlaceholder,
                              timestamp: currentTimestamp,
                          },
                      ],
                  };
        dispatch(updateAI({ ...ai, busy: true }));
        dispatch(updateSessions(_sessions));
        navigate(`${prefix}/${id}${suffix}`);

        const handler = (message: string, end: boolean) => {
            if (end) {
                dispatch(updateAI({ ...ai, busy: false }));
            }
            const updatedTimestamp = Date.now();
            const prevParts =
                _sessions[id][_sessions[id].length - 1].parts !==
                ModelPlaceholder
                    ? _sessions[id][_sessions[id].length - 1].parts
                    : "";
            _sessions = {
                ..._sessions,
                [id]: [
                    ..._sessions[id].slice(0, -1),
                    {
                        role: "model",
                        parts: `${prevParts}${message}`,
                        timestamp: updatedTimestamp,
                    },
                ],
            };
            dispatch(updateSessions(_sessions));
        };
        await getChats(
            ai.model,
            currentSessionHistory,
            prompt,
            sse,
            modelConfig,
            handler
        );
    };

    useEffect(() => {
        document.title = site;
    }, [site]);

    return (
        <Container>
            <Sidebar
                title={header}
                sessions={sessions}
                expand={sidebarExpand}
                newChatUrl={routes.index.prefix}
                onExportSession={handleExportSession}
                onDeleteSession={handleDeleteSession}
            />
            <Container
                className={`min-w-full overflow-y-auto overflow-x-hidden flex flex-col h-screen justify-between ${
                    !sidebarExpand ? "col-span-2" : ""
                }`}
            >
                <Header
                    newChatUrl={routes.index.prefix}
                    title={!sidebarExpand ? header : ""}
                    onPurgeSessions={handlePurgeSessions}
                    onToggleSidebar={() => setSidebarExpand((state) => !state)}
                />
                <RouterView routes={routes} suspense={<Skeleton />} />
                <InputArea
                    maxHeight={120}
                    disabled={ai.busy}
                    onSubmit={handleSubmit}
                />
            </Container>
        </Container>
    );
};

export default App;
