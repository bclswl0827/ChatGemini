import exportIcon from "../assets/icons/file-export-solid.svg";
import deleteIcon from "../assets/icons/trash-can-solid.svg";
import renameIcon from "../assets/icons/file-pen-solid.svg";
import submitIcon from "../assets/icons/circle-check-solid.svg";
import emptyIcon from "../assets/icons/folder-open-solid.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sessions } from "../store/sessions";
import { useTranslation } from "react-i18next";

interface SidebarProps {
    readonly title: string;
    readonly expand: boolean;
    readonly limitation?: number;
    readonly newChatUrl: string;
    readonly sessions: Sessions;
    readonly locales: Record<string, string>;
    readonly currentLocale: string;
    readonly onDeleteSession: (id: string) => void;
    readonly onExportSession: (id: string) => void;
    readonly onSwitchLocale: (locale: string) => void;
    readonly onRenameSession: (id: string, newTitle: string) => void;
}

export const Sidebar = (props: SidebarProps) => {
    const { t } = useTranslation();
    const {
        title,
        expand,
        limitation,
        newChatUrl,
        sessions,
        locales,
        currentLocale,
        onDeleteSession,
        onExportSession,
        onSwitchLocale,
        onRenameSession,
    } = props;
    const navigate = useNavigate();

    const [newLocale, setNewLocale] = useState<string | null>(null);

    const handleSelectChange = ({
        target,
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setNewLocale(target.value);
        onSwitchLocale(target.value);
    };

    const [renamingChatTitle, setRenamingChatTitle] = useState<{
        id: string;
        title: string;
    }>({ id: "", title: "" });
    const [sessionsLimitation, setSessionsLimitation] = useState(
        limitation ?? 15
    );
    const [sessionsCategory, setSessionsCategory] = useState<{
        [id: string]: {
            label?: string;
            sessions?: Sessions;
        };
    }>({});

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
        setSessionsCategory({
            today: {
                sessions: today,
                label: t("components.Sidebar.today_label"),
            },
            yesterday: {
                sessions: yesterday,
                label: t("components.Sidebar.yesterday_label"),
            },
            earlier: {
                sessions: earlier,
                label: t("components.Sidebar.earlier_label"),
            },
        });
    }, [t, sessions]);

    return (
        <nav
            className={`bg-slate-900 overflow-auto flex flex-col justify-between ${
                expand ? "block" : "hidden"
            }`}
        >
            <div className="sticky top-0 bg-slate-900 py-4 flex justify-center items-center font-semibold text-gray-100 border-b border-gray-400">
                <span>{title}</span>
            </div>
            {!Object.values(sessionsCategory)
                .map(({ sessions }) => sessions ?? {})
                .every((sessions) => !Object.keys(sessions).length) && (
                <div
                    className="mx-3 my-5 py-1 border border-dashed text-sm text-center text-gray-200 hover:bg-slate-600 transition-all rounded-sm cursor-pointer"
                    onClick={() => navigate(newChatUrl)}
                >
                    {t("components.Sidebar.new_chat")}
                </div>
            )}
            <div className="flex flex-col space-y-2 p-2 mb-auto">
                {Object.keys(sessionsCategory).map((key, index, arr) => {
                    const currentLabel = sessionsCategory[key].label;
                    const currentSessions =
                        sessionsCategory[key].sessions ?? {};
                    const currentSessionsKeys = Object.keys(currentSessions);
                    const isEnablePagination = index === arr.length - 1;
                    const isEmpty = !currentSessionsKeys.length;

                    return (
                        !isEmpty && (
                            <div key={index}>
                                <h3 className="text-gray-500 text-xs py-1">
                                    {currentLabel}
                                </h3>
                                {currentSessionsKeys
                                    .slice(
                                        0,
                                        isEnablePagination
                                            ? sessionsLimitation
                                            : currentSessionsKeys.length
                                    )
                                    .map((id, _index) => {
                                        const currentSession =
                                            currentSessions[id][0];
                                        const currentSessionTitle =
                                            !!currentSession?.title?.length
                                                ? currentSession.title
                                                : currentSession.parts;
                                        return (
                                            <div
                                                key={_index}
                                                className="flex rounded-lg items-center justify-between p-2 text-gray-200 hover:bg-slate-600 transition-all space-x-2"
                                            >
                                                <Link
                                                    className={`flex-1 text-sm text-left truncate ${
                                                        renamingChatTitle.id ===
                                                        id
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                    to={`/chat/${id}`}
                                                >
                                                    {currentSessionTitle}
                                                </Link>
                                                <input
                                                    defaultValue={
                                                        currentSessionTitle
                                                    }
                                                    className={`flex-1 w-full bg-transparent text-sm ${
                                                        renamingChatTitle.id ===
                                                        id
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
                                                        renamingChatTitle.id ===
                                                        id
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                    src={renameIcon}
                                                    alt=""
                                                    onClick={() =>
                                                        setRenamingChatTitle({
                                                            id,
                                                            title: currentSessionTitle,
                                                        })
                                                    }
                                                />
                                                <img
                                                    className={`cursor-pointer text-xs size-3 hover:scale-125 transition-all ${
                                                        renamingChatTitle.id !==
                                                        id
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
                                                            renamingChatTitle.title !==
                                                                currentSessionTitle
                                                        ) {
                                                            onRenameSession(
                                                                id,
                                                                title
                                                            );
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
                                                        onExportSession(id)
                                                    }
                                                />
                                                <img
                                                    className="cursor-pointer size-3 hover:scale-125 transition-all"
                                                    src={deleteIcon}
                                                    alt=""
                                                    onClick={() =>
                                                        onDeleteSession(id)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                {isEnablePagination &&
                                    currentSessionsKeys.length >
                                        sessionsLimitation && (
                                        <div className="text-center m-2">
                                            <button
                                                className="font-semibold text-gray-400 hover:text-gray-200 text-sm transition-all"
                                                onClick={() =>
                                                    setSessionsLimitation(
                                                        (state) => state + 5
                                                    )
                                                }
                                            >
                                                {t(
                                                    "components.Sidebar.load_more"
                                                )}
                                            </button>
                                        </div>
                                    )}
                            </div>
                        )
                    );
                })}
            </div>
            {Object.values(sessionsCategory)
                .map(({ sessions }) => sessions ?? {})
                .every((sessions) => !Object.keys(sessions).length) && (
                <div className="p-2 text-center text-gray-300/50 mb-[calc(50vh-4rem)] flex flex-col gap-4">
                    <img src={emptyIcon} alt="" className="mx-auto size-10" />
                    {t("components.Sidebar.no_history_chat")}
                </div>
            )}
            <div className="sticky bottom-0 bg-slate-900 py-1 flex justify-center items-center text-xs text-gray-100 border-gray-400 border-t">
                <select
                    className="text-gray-300/50 text-center bg-transparent w-full outline-none m-1"
                    onChange={handleSelectChange}
                    value={newLocale ?? currentLocale}
                >
                    <option disabled>Choose Language</option>
                    {Object.entries(locales).map(([key, value]) => (
                        <option key={key} value={key} className="text-gray-800">
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        </nav>
    );
};
