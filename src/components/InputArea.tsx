import submitIcon from "../assets/icons/paper-plane-solid.svg";
import clearInputIcon from "../assets/icons/circle-xmark-solid.svg";
import ejectionIcon from "../assets/icons/eject-solid.svg";
import attachmentIcon from "../assets/icons/paperclip-solid.svg";
import disabledIcon from "../assets/icons/comment-dots-regular.svg";
import { useEffect, useRef, useState } from "react";
import { setTextAreaHeight } from "../helpers/setTextAreaHeight";
import { sendUserAlert } from "../helpers/sendUserAlert";

interface InputAreaProps {
    readonly disabled: boolean;
    readonly minHeight: number;
    readonly maxHeight: number;
    readonly onSubmit?: (prompt: string) => void;
    readonly onUpload?: (file: File | null) => void;
}

export const InputArea = (props: InputAreaProps) => {
    const { disabled, minHeight, maxHeight, onSubmit, onUpload } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [inputPlaceholder, setInputPlaceholder] =
        useState("Ctrl + Enter 快捷发送");
    const [attachmentName, setAttachmentName] = useState("");

    const handleSubmit = () => {
        if (onSubmit) {
            const { current } = textAreaRef;
            onSubmit(current!.value);
            current!.value = "";
            setTextAreaHeight(current, maxHeight, minHeight);
        }
    };

    const checkAttachment = (file: File) => {
        const sizeLimit = 4;
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/heic",
            "image/heif",
        ];
        if (file.size > sizeLimit * 1024 * 1024 - 100) {
            sendUserAlert(`文件大小超过 ${sizeLimit}MB 限制`, true);
            return false;
        } else if (!allowedTypes.includes(file.type)) {
            sendUserAlert("文件类型仅限常见图片格式", true);
            return false;
        } else {
            sendUserAlert("再次点击图标即可取消上传");
            return true;
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
        <div className="sticky bottom-0 flex flex-col p-4 bg-white space-y-2 max-h-48">
            <div className="flex justify-center items-center gap-2">
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={({ currentTarget }) => {
                        const { files } = currentTarget;
                        if (files) {
                            if (checkAttachment(files[0])) {
                                setAttachmentName(files[0].name);
                                onUpload && onUpload(files[0]);
                            }
                        }
                    }}
                />
                <button
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3"
                    onClick={({ currentTarget }) => {
                        if (!!attachmentName.length) {
                            setAttachmentName("");
                            onUpload && onUpload(null);
                            sendUserAlert("已取消上传文件");
                        } else {
                            currentTarget.blur();
                            fileInputRef.current!.click();
                        }
                    }}
                >
                    <img
                        className={
                            !!attachmentName.length ? "size-5" : "hidden"
                        }
                        src={ejectionIcon}
                        alt=""
                    />
                    <img
                        className={
                            !!attachmentName.length ? "hidden" : "size-5"
                        }
                        src={attachmentIcon}
                        alt=""
                    />
                </button>
                <div className="relative w-full items-center justify-center flex">
                    <div className="absolute left-0 flex items-center pl-2">
                        <button
                            className="hover:bg-gray-200 rounded-lg size-7 flex items-center justify-center"
                            onClick={() => {
                                const { current } = textAreaRef;
                                current!.value = "";
                                setTextAreaHeight(
                                    current,
                                    maxHeight,
                                    minHeight
                                );
                            }}
                        >
                            <img
                                className="size-3"
                                src={clearInputIcon}
                                alt=""
                            />
                        </button>
                    </div>
                    <textarea
                        rows={1}
                        ref={textAreaRef}
                        placeholder={
                            disabled ? "等待回应..." : inputPlaceholder
                        }
                        className={`pl-10 p-2.5 border-2 border-gray-300 rounded-lg overflow-y-scroll scrollbar-hide resize-none h-[${minHeight}px] w-[calc(100%)] text-sm lg:text-base`}
                        onInput={({ currentTarget }) =>
                            setTextAreaHeight(
                                currentTarget,
                                maxHeight,
                                minHeight
                            )
                        }
                        onKeyDown={({ ctrlKey, key }) => {
                            if (ctrlKey && key === "Enter" && !disabled) {
                                handleSubmit();
                                setAttachmentName("");
                            } else if (ctrlKey && key === "Enter" && disabled) {
                                sendUserAlert("请等待回应完成", true);
                            }
                        }}
                    />
                </div>
                <button
                    className="bg-sky-100 hover:bg-sky-200 rounded-lg p-3 disabled:cursor-not-allowed"
                    onClick={() => {
                        !disabled && handleSubmit();
                        setAttachmentName("");
                    }}
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
            {!!attachmentName.length && (
                <div className="text-center text-gray-500 text-xs truncate">
                    <img
                        className="inline-block size-3 mr-0.5"
                        src={attachmentIcon}
                        alt=""
                    />
                    {attachmentName}
                </div>
            )}
        </div>
    );
};
