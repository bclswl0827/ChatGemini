import { useEffect, useRef, useState } from "react";
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
import { matchPath, useNavigate } from "react-router-dom";
import { saveMdToHtml } from "./helpers/saveMdToHtml";
import { getAiChats } from "./helpers/getAiChats";
import { modelConfig } from "./config/model";
import { initialSessions, onUpdate as updateSessions } from "./store/sessions";
import { getAiContent } from "./helpers/getAiContent";
import { GenerativeContentBlob } from "@google/generative-ai";
import { getBase64Img } from "./helpers/getBase64Img";
import { sendUserAlert } from "./helpers/sendUserAlert";
import { sendUserConfirm } from "./helpers/sendUserConfirm";
import { PageScroller } from "./components/PageScroller";
import { LoginForm } from "./components/LoginForm";
import siteLogo from "./assets/logo.svg";
import setLocalStorage from "./helpers/setLocalStorage";

const ModelPlaceholder = "正在思考中...";

const App = () => {
    const { sse, title, passcodes } = globalConfig;
    const { header, site } = title;
    const { routes } = routerConfig;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessions = useSelector(
        (state: ReduxStoreProps) => state.sessions.sessions
    );
    const ai = useSelector((state: ReduxStoreProps) => state.ai.ai);
    const mainSectionRef = useRef<HTMLDivElement>(null);

    const [hasLogined, setHasLogined] = useState(false);
    const [uploadInlineData, setUploadInlineData] =
        useState<GenerativeContentBlob>({ data: "", mimeType: "" });
    const [sidebarExpand, setSidebarExpand] = useState(window.innerWidth > 768);

    const handleExportSession = (id: string) => {
        const session = sessions[id];
        if (session) {
            const exportTime = new Date().toLocaleString();
            const sessionTime = new Date(parseInt(id)).toLocaleString();
            let exportData = `# ${header}\n\n---\n\n- 用户时区 ${
                Intl.DateTimeFormat().resolvedOptions().timeZone
            }\n- 对话时间 ${sessionTime}\n- 导出时间 ${exportTime}\n\n---\n\n`;
            session.forEach(({ role, parts, timestamp, attachment }) => {
                if (!!attachment?.data.length) {
                    const { data, mimeType } = attachment;
                    const base64ImgData = `data:${mimeType};base64,${data}`;
                    parts += `\n\n<img alt="图片附件" src="${base64ImgData}" />`;
                }
                exportData += `## ${role === "user" ? "用户" : "AI"}@${new Date(
                    timestamp
                ).toLocaleString()}\n\n${parts}\n\n`;
            });
            saveMdToHtml(exportData, `会话导出_${site}_${id}`);
        } else {
            sendUserAlert("无法导出对话记录", true);
        }
    };

    const handleDeleteSession = (id: string) => {
        sendUserConfirm("确定要删除这条对话记录吗？", () => {
            navigate(routes.index.prefix);
            const _sessions = { ...sessions };
            delete _sessions[id];
            dispatch(updateSessions(_sessions));
            sendUserAlert("对话记录已删除");
        });
    };

    const handlePurgeSessions = () => {
        sendUserConfirm("确定要清空所有对话记录吗？", () => {
            navigate(routes.index.prefix);
            dispatch(updateSessions(initialSessions));
            dispatch(updateAI({ ...ai, busy: false }));
            sendUserAlert("对话记录已清空");
        });
    };

    const handleLogout = () => {
        sendUserConfirm("登出后对话记录仍会保留，确定要登出吗？", () => {
            sendUserAlert("已退出登入");
            setHasLogined(false);
            setLocalStorage("passcode", "", false);
        });
    };

    const handleUpload = async (file: File | null) => {
        if (file) {
            const base64EncodedData = await getBase64Img(file);
            const base64EncodedDataParts = base64EncodedData.split(",");
            setUploadInlineData({
                data: base64EncodedDataParts[base64EncodedDataParts.length - 1],
                mimeType: file.type,
            });
        } else {
            setUploadInlineData({ data: "", mimeType: "" });
        }
    };

    const handleSubmit = async (prompt: string) => {
        if (!prompt.trim().length) {
            sendUserAlert("请输入对话内容", true);
            return;
        }

        const { prefix, uri, suffix } = routes.chat;
        const { hash, pathname } = window.location;
        let { id } = (matchPath(
            { path: `${prefix}${uri}${suffix}` },
            hash.replace("#", "") || pathname
        )?.params as { id: string }) ?? { id: Date.now().toString() };

        const sessionDate = new Date(parseInt(id));
        if (isNaN(sessionDate.getTime()) || sessionDate.getFullYear() < 2020) {
            sendUserAlert("无法识别的对话 ID", true);
            return;
        }

        const currentSessionHistory = id in sessions ? sessions[id] : [];
        const currentTimestamp = Date.now();
        let _sessions = {
            ...sessions,
            [id]: [
                ...(sessions[id] || []),
                {
                    role: "user",
                    parts: prompt,
                    timestamp: currentTimestamp,
                    attachment: uploadInlineData,
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
            let prevParts = _sessions[id][_sessions[id].length - 1].parts;
            if (prevParts === ModelPlaceholder) {
                prevParts = "";
            }

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
        if (!uploadInlineData.data.length) {
            await getAiChats(
                ai.model.pro,
                currentSessionHistory,
                prompt,
                sse,
                modelConfig,
                handler
            );
        } else {
            await getAiContent(
                ai.model.vision,
                prompt,
                uploadInlineData,
                sse,
                handler
            );
        }
        setUploadInlineData({ data: "", mimeType: "" });
    };

    useEffect(() => {
        if (!hasLogined && !!passcodes.length) {
            document.title = `登入 - ${site}`;
        }
    }, [hasLogined, passcodes, site]);

    return (
        <Container
            className={
                !hasLogined && !!passcodes.length
                    ? "flex flex-col items-center justify-center min-h-screen p-10"
                    : ""
            }
            toaster={true}
        >
            {hasLogined || !passcodes.length ? (
                <>
                    <Sidebar
                        title={header}
                        sessions={sessions}
                        expand={sidebarExpand}
                        newChatUrl={routes.index.prefix}
                        onExportSession={handleExportSession}
                        onDeleteSession={handleDeleteSession}
                    />
                    <Container
                        ref={mainSectionRef}
                        className={`min-w-full overflow-y-auto overflow-x-hidden flex flex-col h-screen justify-between ${
                            !sidebarExpand ? "col-span-2" : ""
                        }`}
                    >
                        <Header
                            logoutIcon={!!passcodes.length}
                            newChatUrl={routes.index.prefix}
                            title={!sidebarExpand ? header : ""}
                            onPurgeSessions={handlePurgeSessions}
                            onToggleSidebar={() =>
                                setSidebarExpand((state) => !state)
                            }
                            onLogout={handleLogout}
                        />
                        <RouterView routes={routes} suspense={<Skeleton />} />
                        <InputArea
                            minHeight={45}
                            maxHeight={120}
                            disabled={ai.busy}
                            onSubmit={handleSubmit}
                            onUpload={handleUpload}
                        />
                        <PageScroller monitorRef={mainSectionRef} />{" "}
                    </Container>
                </>
            ) : (
                <LoginForm
                    title={header}
                    logo={siteLogo}
                    passcodes={passcodes}
                    onPasscodeCorrect={() => setHasLogined(true)}
                />
            )}
        </Container>
    );
};

export default App;
