import exportIcon from "../assets/icons/file-export-solid.svg";
import deleteIcon from "../assets/icons/trash-can-solid.svg";
import renameIcon from "../assets/icons/file-pen-solid.svg";
import submitIcon from "../assets/icons/circle-check-solid.svg";
import historyIcon from "../assets/icons/clock-rotate-left-solid.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sessions } from "../store/sessions";

interface SidebarProps {
    readonly title: string;
    readonly expand: boolean;
    readonly limitation?: number;
    readonly newChatUrl: string;
    readonly sessions: Sessions;
    readonly onDeleteSession?: (id: string) => void;
    readonly onExportSession?: (id: string) => void;
    readonly onRenameSession?: (id: string, newTitle: string) => void;
}

export const Sidebar = (props: SidebarProps) => {
    const {
        title,
        expand,
        limitation,
        newChatUrl,
        sessions,
        onDeleteSession,
        onExportSession,
        onRenameSession,
    } = props;

    const [renamingChatTitle, setRenamingChatTitle] = useState<{
        id: string;
        title: string;
    }>({ id: "", title: "" });
    const [sessionsLimitation, setSessionsLimitation] = useState(
        limitation ?? 10
    );
    const [sessionsCategory, setSessionsCategory] = useState<
        Record<"today" | "yesterday" | "earlier", Sessions>
    >({ today: {}, yesterday: {}, earlier: {} });

    const getCategorizedSessions = (
        sessions: Sessions,
        filter: (value: number, index: number, array: number[]) => boolean
    ) =>
        Object.keys(sessions)
            .sort((a, b) => {
                const a_ts = sessions[a][sessions[a].length - 1].timestamp;
                const b_ts = sessions[b][sessions[b].length - 1].timestamp;
                return b_ts - a_ts;
            })
            .map((key) => parseInt(key))
            .filter(filter)
            .map((key) => {
                return { [key.toString()]: sessions[key] };
            })
            .reduce((prev, curr) => {
                return { ...prev, ...curr };
            }, {});

    const isTimestampToday = (ts: number) =>
        new Date(ts).toLocaleDateString() === new Date().toLocaleDateString();

    const isTimestampYesterday = (ts: number) =>
        new Date(ts).toLocaleDateString() ===
        new Date(
            new Date().setDate(new Date().getDate() - 1)
        ).toLocaleDateString();

    const isTimestampEarlier = (ts: number) =>
        new Date(ts).toLocaleDateString() !== new Date().toLocaleDateString() &&
        new Date(ts).toLocaleDateString() !==
            new Date(
                new Date().setDate(new Date().getDate() - 1)
            ).toLocaleDateString();

    useEffect(() => {
        const today = getCategorizedSessions(sessions, isTimestampToday);
        const yesterday = getCategorizedSessions(
            sessions,
            isTimestampYesterday
        );
        const earlier = getCategorizedSessions(sessions, isTimestampEarlier);
        setSessionsCategory({ today, yesterday, earlier });
    }, [sessions]);

    return (
        <nav
            className={`bg-slate-900 overflow-auto ${
                expand ? "block" : "hidden"
            }`}
        >
            <div className="sticky top-0 bg-slate-900 py-4 flex justify-center items-center font-semibold text-gray-100 border-b border-gray-400">
                <img src={historyIcon} className="size-4 mr-2" alt="" />
                <span>{title}</span>
            </div>
            <div className="py-2 mt-4 text-center">
                <Link
                    className="border border-dashed text-gray-200 text-center text-sm hover:bg-slate-600 transition-all rounded-sm px-6 py-1"
                    to={newChatUrl}
                >
                    + 新聊天
                </Link>
            </div>
            {!!Object.keys(sessions).length ? (
                <div className="flex flex-col space-y-2 p-2">
                    {!!Object.keys(sessionsCategory.today).length && (
                        <h3 className="text-gray-500 text-xs py-1">今天</h3>
                    )}
                    {Object.keys(sessionsCategory.today).map((key, index) => {
                        const currentSession = sessionsCategory.today[key];
                        const currentSessionTitle = !!currentSession[0]?.title
                            ?.length
                            ? currentSession[0].title
                            : currentSession[0].parts;
                        return (
                            currentSession && (
                                <div
                                    key={index}
                                    className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                >
                                    <Link
                                        className={`flex-1 text-sm text-left truncate ${
                                            renamingChatTitle.id === key
                                                ? "hidden"
                                                : ""
                                        }`}
                                        to={`/chat/${key}`}
                                    >
                                        {currentSessionTitle}
                                    </Link>
                                    <input
                                        defaultValue={currentSessionTitle}
                                        className={`flex-1 w-full bg-transparent text-sm ${
                                            renamingChatTitle.id === key
                                                ? ""
                                                : "hidden"
                                        }`}
                                        onChange={({ target }) =>
                                            setRenamingChatTitle((prev) => ({
                                                ...prev,
                                                title: target.value,
                                            }))
                                        }
                                    />
                                    <img
                                        className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                            renamingChatTitle.id === key
                                                ? "hidden"
                                                : ""
                                        }`}
                                        src={renameIcon}
                                        alt=""
                                        onClick={() =>
                                            setRenamingChatTitle({
                                                id: key,
                                                title: currentSessionTitle,
                                            })
                                        }
                                    />
                                    <img
                                        className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                            renamingChatTitle.id !== key
                                                ? "hidden"
                                                : ""
                                        }`}
                                        src={submitIcon}
                                        alt=""
                                        onClick={() => {
                                            const { title } = renamingChatTitle;
                                            if (
                                                !!title.length &&
                                                onRenameSession &&
                                                renamingChatTitle.title !==
                                                    currentSessionTitle
                                            ) {
                                                onRenameSession(key, title);
                                            }
                                            setRenamingChatTitle({
                                                id: "",
                                                title: "",
                                            });
                                        }}
                                    />
                                    <img
                                        className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                        src={exportIcon}
                                        alt=""
                                        onClick={() =>
                                            onExportSession &&
                                            onExportSession(key)
                                        }
                                    />
                                    <img
                                        className="cursor-pointer size-3 hover:scale-125 transition-all"
                                        src={deleteIcon}
                                        alt=""
                                        onClick={() =>
                                            onDeleteSession &&
                                            onDeleteSession(key)
                                        }
                                    />
                                </div>
                            )
                        );
                    })}
                    {!!Object.keys(sessionsCategory.yesterday).length && (
                        <h3 className="text-gray-500 text-xs py-1">昨天</h3>
                    )}
                    {Object.keys(sessionsCategory.yesterday).map(
                        (key, index) => {
                            const currentSession =
                                sessionsCategory.yesterday[key];
                            const currentSessionTitle = !!currentSession[0]
                                ?.title?.length
                                ? currentSession[0].title
                                : currentSession[0].parts;
                            return (
                                currentSession && (
                                    <div
                                        key={index}
                                        className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                    >
                                        <Link
                                            className={`flex-1 text-sm text-left truncate ${
                                                renamingChatTitle.id === key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            to={`/chat/${key}`}
                                        >
                                            {currentSessionTitle}
                                        </Link>
                                        <input
                                            defaultValue={currentSessionTitle}
                                            className={`flex-1 w-full bg-transparent text-sm ${
                                                renamingChatTitle.id === key
                                                    ? ""
                                                    : "hidden"
                                            }`}
                                            onChange={({ target }) =>
                                                setRenamingChatTitle(
                                                    (prev) => ({
                                                        ...prev,
                                                        title: target.value,
                                                    })
                                                )
                                            }
                                        />
                                        <img
                                            className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                                renamingChatTitle.id === key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            src={renameIcon}
                                            alt=""
                                            onClick={() =>
                                                setRenamingChatTitle({
                                                    id: key,
                                                    title: currentSessionTitle,
                                                })
                                            }
                                        />
                                        <img
                                            className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                                renamingChatTitle.id !== key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            src={submitIcon}
                                            alt=""
                                            onClick={() => {
                                                const { title } =
                                                    renamingChatTitle;
                                                if (
                                                    !!title.length &&
                                                    onRenameSession &&
                                                    renamingChatTitle.title !==
                                                        currentSessionTitle
                                                ) {
                                                    onRenameSession(key, title);
                                                }
                                                setRenamingChatTitle({
                                                    id: "",
                                                    title: "",
                                                });
                                            }}
                                        />
                                        <img
                                            className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                            src={exportIcon}
                                            alt=""
                                            onClick={() =>
                                                onExportSession &&
                                                onExportSession(key)
                                            }
                                        />
                                        <img
                                            className="cursor-pointer size-3 hover:scale-125 transition-all"
                                            src={deleteIcon}
                                            alt=""
                                            onClick={() =>
                                                onDeleteSession &&
                                                onDeleteSession(key)
                                            }
                                        />
                                    </div>
                                )
                            );
                        }
                    )}
                    {!!Object.keys(sessionsCategory.earlier).length && (
                        <h3 className="text-gray-500 text-xs py-1">更早</h3>
                    )}
                    {Object.keys(sessionsCategory.earlier)
                        .slice(0, sessionsLimitation)
                        .map((key, index) => {
                            const currentSession =
                                sessionsCategory.earlier[key];
                            const currentSessionTitle = !!currentSession[0]
                                ?.title?.length
                                ? currentSession[0].title
                                : currentSession[0].parts;
                            return (
                                currentSession && (
                                    <div
                                        key={index}
                                        className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                    >
                                        <Link
                                            className={`flex-1 text-sm text-left truncate ${
                                                renamingChatTitle.id === key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            to={`/chat/${key}`}
                                        >
                                            {currentSessionTitle}
                                        </Link>
                                        <input
                                            defaultValue={currentSessionTitle}
                                            className={`flex-1 w-full bg-transparent text-sm ${
                                                renamingChatTitle.id === key
                                                    ? ""
                                                    : "hidden"
                                            }`}
                                            onChange={({ target }) =>
                                                setRenamingChatTitle(
                                                    (prev) => ({
                                                        ...prev,
                                                        title: target.value,
                                                    })
                                                )
                                            }
                                        />
                                        <img
                                            className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                                renamingChatTitle.id === key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            src={renameIcon}
                                            alt=""
                                            onClick={() =>
                                                setRenamingChatTitle({
                                                    id: key,
                                                    title: currentSessionTitle,
                                                })
                                            }
                                        />
                                        <img
                                            className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                                renamingChatTitle.id !== key
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            src={submitIcon}
                                            alt=""
                                            onClick={() => {
                                                const { title } =
                                                    renamingChatTitle;
                                                if (
                                                    !!title.length &&
                                                    onRenameSession &&
                                                    renamingChatTitle.title !==
                                                        currentSessionTitle
                                                ) {
                                                    onRenameSession(key, title);
                                                }
                                                setRenamingChatTitle({
                                                    id: "",
                                                    title: "",
                                                });
                                            }}
                                        />
                                        <img
                                            className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                            src={exportIcon}
                                            alt=""
                                            onClick={() =>
                                                onExportSession &&
                                                onExportSession(key)
                                            }
                                        />
                                        <img
                                            className="cursor-pointer size-3 hover:scale-125 transition-all"
                                            src={deleteIcon}
                                            alt=""
                                            onClick={() =>
                                                onDeleteSession &&
                                                onDeleteSession(key)
                                            }
                                        />
                                    </div>
                                )
                            );
                        })}
                    {Object.keys(sessionsCategory.earlier).length >
                        sessionsLimitation && (
                        <button
                            className="font-semibold text-gray-200 text-center text-sm hover:bg-slate-600 transition-all rounded-full p-1"
                            onClick={() =>
                                setSessionsLimitation((state) => state + 5)
                            }
                        >
                            查看更多...
                        </button>
                    )}
                </div>
            ) : (
                <div className="p-2 text-center text-gray-300/50 mt-16">
                    没有历史记录
                </div>
            )}
        </nav>
    );
};
