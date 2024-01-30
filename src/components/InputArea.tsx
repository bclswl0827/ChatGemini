import submitIcon from "../assets/icons/paper-plane-solid.svg";
import clearInputIcon from "../assets/icons/circle-xmark-solid.svg";
import ejectionIcon from "../assets/icons/eject-solid.svg";
import attachmentIcon from "../assets/icons/paperclip-solid.svg";
import disabledIcon from "../assets/icons/comment-dots-regular.svg";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
    const [hasAttachment, setHasAttachment] = useState(false);

    const setTextAreaHeight = (current: HTMLTextAreaElement | null) => {
        current!.style.height = "0px";
        current!.style.height =
            current!.scrollHeight < maxHeight
                ? `${
                      current!.scrollHeight > minHeight
                          ? current!.scrollHeight
                          : minHeight
                  }px`
                : `${maxHeight}px`;
    };

    const handleSubmit = () => {
        if (onSubmit) {
            const { current } = textAreaRef;
            onSubmit(current!.value);
            current!.value = "";
            setTextAreaHeight(current);
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
            toast.error(`文件大小超过 ${sizeLimit}MB 限制`);
            return false;
        } else if (!allowedTypes.includes(file.type)) {
            toast.error("文件类型仅限常见图片格式");
            return false;
        } else {
            toast.success("再次点击图标即可取消上传");
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
                                setHasAttachment(true);
                                onUpload && onUpload(files[0]);
                            }
                        }
                    }}
                />
                <button
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3"
                    onClick={({ currentTarget }) => {
                        if (hasAttachment) {
                            setHasAttachment(false);
                            onUpload && onUpload(null);
                        } else {
                            currentTarget.blur();
                            fileInputRef.current!.click();
                        }
                    }}
                >
                    <img
                        className={hasAttachment ? "size-5" : "hidden"}
                        src={ejectionIcon}
                        alt=""
                    />
                    <img
                        className={hasAttachment ? "hidden" : "size-5"}
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
                                setTextAreaHeight(current);
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
                            setTextAreaHeight(currentTarget)
                        }
                        onKeyDown={({ ctrlKey, key }) => {
                            if (ctrlKey && key === "Enter" && !disabled) {
                                handleSubmit();
                                setHasAttachment(false);
                            } else if (ctrlKey && key === "Enter" && disabled) {
                                toast.error("请等待回应完成");
                            }
                        }}
                    />
                </div>
                <button
                    className="bg-sky-100 hover:bg-sky-200 rounded-lg p-3 disabled:cursor-not-allowed"
                    onClick={() => {
                        !disabled && handleSubmit();
                        setHasAttachment(false);
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
        </div>
    );
};
