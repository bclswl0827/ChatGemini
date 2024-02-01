import exportIcon from "../assets/icons/file-export-solid.svg";
import deleteIcon from "../assets/icons/trash-can-solid.svg";
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
    } = props;

    const [sessionsLimitation, setSessionsLimitation] = useState(
        limitation || 10
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

    useEffect(() => {
        setSessionsCategory({
            today: getCategorizedSessions(
                sessions,
                (ts) =>
                    new Date(ts).toLocaleDateString() ===
                    new Date().toLocaleDateString()
            ),
            yesterday: getCategorizedSessions(
                sessions,
                (ts) =>
                    new Date(ts).toLocaleDateString() ===
                    new Date(
                        new Date().setDate(new Date().getDate() - 1)
                    ).toLocaleDateString()
            ),
            earlier: getCategorizedSessions(
                sessions,
                (ts) =>
                    new Date(ts).toLocaleDateString() !==
                        new Date().toLocaleDateString() &&
                    new Date(ts).toLocaleDateString() !==
                        new Date(
                            new Date().setDate(new Date().getDate() - 1)
                        ).toLocaleDateString()
            ),
        });
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
                    {Object.keys(sessionsCategory.today).map(
                        (item, index) =>
                            sessionsCategory.today[item] && (
                                <div
                                    key={index}
                                    className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                >
                                    <Link
                                        className="flex-1 text-sm text-left truncate"
                                        to={`/chat/${item}`}
                                    >
                                        {sessionsCategory.today[item][0].parts}
                                    </Link>
                                    <img
                                        className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                        src={exportIcon}
                                        alt=""
                                        onClick={() =>
                                            onExportSession &&
                                            onExportSession(item)
                                        }
                                    />
                                    <img
                                        className="cursor-pointer size-3 hover:scale-125 transition-all"
                                        src={deleteIcon}
                                        alt=""
                                        onClick={() =>
                                            onDeleteSession &&
                                            onDeleteSession(item)
                                        }
                                    />
                                </div>
                            )
                    )}
                    {!!Object.keys(sessionsCategory.yesterday).length && (
                        <h3 className="text-gray-500 text-xs py-1">昨天</h3>
                    )}
                    {Object.keys(sessionsCategory.yesterday).map(
                        (item, index) =>
                            sessionsCategory.yesterday[item] && (
                                <div
                                    key={index}
                                    className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                >
                                    <Link
                                        className="flex-1 text-sm text-left truncate"
                                        to={`/chat/${item}`}
                                    >
                                        {
                                            sessionsCategory.yesterday[item][0]
                                                .parts
                                        }
                                    </Link>
                                    <img
                                        className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                        src={exportIcon}
                                        alt=""
                                        onClick={() =>
                                            onExportSession &&
                                            onExportSession(item)
                                        }
                                    />
                                    <img
                                        className="cursor-pointer size-3 hover:scale-125 transition-all"
                                        src={deleteIcon}
                                        alt=""
                                        onClick={() =>
                                            onDeleteSession &&
                                            onDeleteSession(item)
                                        }
                                    />
                                </div>
                            )
                    )}
                    {!!Object.keys(sessionsCategory.earlier).length && (
                        <h3 className="text-gray-500 text-xs py-1">更早</h3>
                    )}
                    {Object.keys(sessionsCategory.earlier)
                        .slice(0, sessionsLimitation)
                        .map(
                            (item, index) =>
                                sessionsCategory.earlier[item] && (
                                    <div
                                        key={index}
                                        className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                    >
                                        <Link
                                            className="flex-1 text-sm text-left truncate"
                                            to={`/chat/${item}`}
                                        >
                                            {
                                                sessionsCategory.earlier[
                                                    item
                                                ][0].parts
                                            }
                                        </Link>
                                        <img
                                            className="cursor-pointer text-xs size-3 hover:scale-125 transition-all"
                                            src={exportIcon}
                                            alt=""
                                            onClick={() =>
                                                onExportSession &&
                                                onExportSession(item)
                                            }
                                        />
                                        <img
                                            className="cursor-pointer size-3 hover:scale-125 transition-all"
                                            src={deleteIcon}
                                            alt=""
                                            onClick={() =>
                                                onDeleteSession &&
                                                onDeleteSession(item)
                                            }
                                        />
                                    </div>
                                )
                        )}
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
