import aiIcon from "../assets/icons/wand-magic-sparkles-solid.svg";
import userIcon from "../assets/icons/user-regular.svg";
import refreshIcon from "../assets/icons/arrows-rotate-solid.svg";
import clipboardIcon from "../assets/icons/clipboard-regular.svg";
import toast from "react-hot-toast";
import { ReactElement, ReactNode } from "react";
import { setClipboard } from "../helpers/setClipboard";

export enum SessionRole {
    Model = "model",
    User = "user",
}

interface SessionProps {
    readonly index: number;
    readonly role: SessionRole;
    readonly children: ReactNode;
    readonly onRefresh: (index: number) => void;
}

export const Session = (props: SessionProps) => {
    const { index, role, children, onRefresh } = props;

    const handleCopy = async () => {
        const text = (children as ReactElement).props.children;
        const success = await setClipboard(text as string);
        if (success) {
            toast.success("内容已复制到剪贴板", { duration: 1000 });
        } else {
            toast.error("内容复制失败");
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
            <div className="px-7">{children}</div>
            <div className="flex">
                <button
                    className="ml-6 mr-1 size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                    onClick={handleCopy}
                >
                    <img src={clipboardIcon} className="size-4" alt="" />
                </button>
                {role === SessionRole.Model && (
                    <button
                        className="size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center"
                        onClick={() => onRefresh(index)}
                    >
                        <img src={refreshIcon} className="size-4" alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};
