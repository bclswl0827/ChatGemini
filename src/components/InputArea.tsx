import submitIcon from "../assets/icons/paper-plane-solid.svg";
import disabledIcon from "../assets/icons/comment-dots-regular.svg";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface InputAreaProps {
    readonly disabled: boolean;
    readonly maxHeight: number;
    readonly onSubmit?: (prompt: string) => void;
}

export const InputArea = (props: InputAreaProps) => {
    const { disabled, maxHeight, onSubmit } = props;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [inputPlaceholder, setInputPlaceholder] =
        useState<string>("Ctrl + Enter 快捷发送");

    const handleSubmit = () => {
        if (onSubmit) {
            const { current } = textAreaRef;
            onSubmit(current?.value || "");
            current!.value = "";
            current!.style.height = "0px";
            current!.style.height =
                current!.scrollHeight < maxHeight
                    ? `${current!.scrollHeight}px`
                    : `${maxHeight}px`;
        }
    };

    const setPlaceholderByWidth = () =>
        setInputPlaceholder(
            window.innerWidth > 512 ? "Ctrl + Enter 快捷发送" : "请输入..."
        );

    useEffect(() => {
        setPlaceholderByWidth();
        window.addEventListener("resize", setPlaceholderByWidth);
        return () =>
            window.removeEventListener("resize", setPlaceholderByWidth);
    }, []);

    return (
        <div className="sticky bottom-0 flex flex-col px-2 py-2 bg-white space-y-2 max-h-48">
            <div className="flex justify-center items-center gap-2">
                <textarea
                    rows={1}
                    ref={textAreaRef}
                    placeholder={disabled ? "请等待回应完成" : inputPlaceholder}
                    className="p-2 border-2 border-gray-300 rounded-lg overflow-y-scroll scrollbar-hide resize-none w-[calc(100%-5rem)] text-sm lg:text-base"
                    onInput={({ currentTarget }) => {
                        currentTarget.style.height = "0px";
                        currentTarget.style.height =
                            currentTarget.scrollHeight < maxHeight
                                ? `${currentTarget.scrollHeight}px`
                                : `${maxHeight}px`;
                    }}
                    onKeyDown={({ ctrlKey, key }) => {
                        if (ctrlKey && key === "Enter" && !disabled) {
                            handleSubmit();
                        } else if (ctrlKey && key === "Enter" && disabled) {
                            toast.error("请等待回应完成");
                        }
                    }}
                />
                <button
                    className="bg-sky-100 hover:bg-sky-200 rounded-lg p-2 disabled:cursor-not-allowed"
                    onClick={() => !disabled && handleSubmit()}
                    disabled={disabled}
                >
                    <img
                        className={disabled ? "hidden" : "size-5"}
                        src={submitIcon}
                        alt=""
                    />
                    <img
                        className={
                            disabled
                                ? "size-5 animate-pulse animate-infinite animate-duration-1000"
                                : "hidden"
                        }
                        src={disabledIcon}
                        alt=""
                    />
                </button>
            </div>
        </div>
    );
};
