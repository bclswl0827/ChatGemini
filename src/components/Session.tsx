import aiIcon from "../assets/icons/wand-magic-sparkles-solid.svg";
import userIcon from "../assets/icons/user-regular.svg";
import editIcon from "../assets/icons/pen-to-square-solid.svg";
import deleteIcon from "../assets/icons/trash-solid.svg";
import refreshIcon from "../assets/icons/arrows-rotate-solid.svg";
import clipboardIcon from "../assets/icons/clipboard-regular.svg";
import { ReactElement, ReactNode, useRef } from "react";
import { setClipboard } from "../helpers/setClipboard";
import { setTextAreaHeight } from "../helpers/setTextAreaHeight";
import { sendUserAlert } from "../helpers/sendUserAlert";

export enum SessionRole {
    Model = "model",
    User = "user",
}

export enum SessionEditState {
    Edit,
    Done,
    Cancel,
}

interface SessionProps {
    readonly index: number;
    readonly prompt: string;
    readonly role: SessionRole;
    readonly children: ReactNode;
    readonly editState: { index: number; state: SessionEditState };
    readonly onDelete: (index: number) => void;
    readonly onRefresh: (index: number) => void;
    readonly onEdit: (
        index: number,
        state: SessionEditState,
        prompt: string
    ) => void;
}

export const Session = (props: SessionProps) => {
    const {
        index,
        prompt,
        editState,
        role,
        children,
        onEdit,
        onDelete,
        onRefresh,
    } = props;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleCopy = async () => {
        const text = (children as ReactElement).props.children;
        const success = await setClipboard(text as string);
        if (success) {
            sendUserAlert("内容已复制到剪贴板");
        } else {
            sendUserAlert("内容复制失败", true);
        }
    };

    return (
        <div className="p-5 mb-3 mr-3 space-y-3 rounded-lg hover:bg-gray-100 transition-all">
            <div className="flex items-center">
                <div
                    className={`size-6 rounded-full flex justify-center items-center ${
                        role === SessionRole.Model
                            ? "bg-purple-600"
                            : "bg-lime-700"
                    }`}
                >
                    <img
                        className={
                            role === SessionRole.Model ? "size-3" : "hidden"
                        }
                        src={aiIcon}
                        alt=""
                    />
                    <img
                        className={
                            role === SessionRole.User ? "size-3" : "hidden"
                        }
                        src={userIcon}
                        alt=""
                    />
                </div>
                <span className="ml-2 font-semibold text-gray-800/100">
                    {role === SessionRole.Model ? "AI" : "您"}
                </span>
            </div>
            <div className="px-7">
                {editState.state === SessionEditState.Edit &&
                index === editState.index ? (
                    <div className="flex flex-col space-y-2 lg:text-base text-sm">
                        <textarea
                            className="bg-transparent text-gray-800 rounded-lg p-2 overflow-y-scroll resize-none"
                            placeholder="请输入内容..."
                            defaultValue={prompt}
                            ref={textAreaRef}
                            onInput={({ currentTarget }) =>
                                setTextAreaHeight(currentTarget, 200, 60)
                            }
                        />
                        <div className="flex gap-2 justify-center">
                            <button
                                className="px-3 py-2 border font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => {
                                    const { current } = textAreaRef;
                                    const { value } = current!;
                                    onEdit(
                                        index,
                                        SessionEditState.Done,
                                        value !== prompt ? value : ""
                                    );
                                }}
                            >
                                储存并提交
                            </button>
                            <button
                                className="px-3 py-2 border font-medium rounded-lg hover:bg-gray-300"
                                onClick={() =>
                                    onEdit(index, SessionEditState.Cancel, "")
                                }
                            >
                                取消
                            </button>
                        </div>
                    </div>
                ) : (
                    <>{children}</>
                )}
            </div>
            <div className="flex ml-6 gap-1">
                <button
                    className="size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                    onClick={handleCopy}
                >
                    <img src={clipboardIcon} className="size-4" alt="" />
                </button>
                {role === SessionRole.User &&
                    editState.state !== SessionEditState.Edit && (
                        <button
                            className="size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                            onClick={() =>
                                onEdit(index, SessionEditState.Edit, "")
                            }
                        >
                            <img src={editIcon} className="size-4" alt="" />
                        </button>
                    )}
                {role === SessionRole.Model && (
                    <button
                        className="size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                        onClick={() => onRefresh(index)}
                    >
                        <img src={refreshIcon} className="size-4" alt="" />
                    </button>
                )}
                {role === SessionRole.Model && index !== 1 && (
                    <button
                        className="size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                        onClick={() => onDelete(index)}
                    >
                        <img src={deleteIcon} className="size-4" alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};
