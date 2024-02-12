import submitIcon from "../assets/icons/paper-plane-solid.svg";
import clearInputIcon from "../assets/icons/circle-xmark-solid.svg";
import ejectionIcon from "../assets/icons/eject-solid.svg";
import attachmentIcon from "../assets/icons/paperclip-solid.svg";
import disabledIcon from "../assets/icons/comment-dots-regular.svg";
import {
    ForwardedRef,
    KeyboardEvent,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { setTextAreaHeight } from "../helpers/setTextAreaHeight";
import { sendUserAlert } from "../helpers/sendUserAlert";
import { useTranslation } from "react-i18next";
import { isMobileDevice } from "../helpers/isMobileDevice";

interface InputAreaProps {
    readonly busy: boolean;
    readonly minHeight: number;
    readonly maxHeight?: number;
    readonly onSubmit: (prompt: string) => void;
    readonly onUpload: (file: File | null) => void;
}

export const InputArea = forwardRef(
    (props: InputAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
        const { busy, minHeight, maxHeight, onSubmit, onUpload } = props;
        const { t } = useTranslation();

        const fileInputRef = useRef<HTMLInputElement>(null);
        const textAreaRef = useRef<HTMLTextAreaElement>(null);
        const [inputPlaceholder, setInputPlaceholder] = useState("");
        const [attachmentName, setAttachmentName] = useState("");

        const handleSubmit = () => {
            const { current } = textAreaRef;
            onSubmit(current!.value);
            current!.value = "";
            setTextAreaHeight(current, minHeight, maxHeight);
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
                sendUserAlert(
                    t("components.InputArea.checkAttachment.size_exceed", {
                        size: sizeLimit,
                    }),
                    true
                );
                return false;
            } else if (!allowedTypes.includes(file.type)) {
                sendUserAlert(
                    t("components.InputArea.checkAttachment.illegal_format"),
                    true
                );
                return false;
            }
            sendUserAlert(
                t("components.InputArea.checkAttachment.upload_success")
            );
            return true;
        };

        const setPlaceholderByWidth = () => {
            const { current } = textAreaRef;
            if (current) {
                const { clientWidth } = current;
                if (clientWidth > 512) {
                    setInputPlaceholder(
                        t(
                            "components.InputArea.setPlaceholderByWidth.placeholder_for_pc"
                        )
                    );
                } else {
                    setInputPlaceholder(
                        t(
                            "components.InputArea.setPlaceholderByWidth.placeholder_for_mobile"
                        )
                    );
                }
            }
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
            const { shiftKey, key, currentTarget } = e;
            const { value } = currentTarget;
            if (
                !busy &&
                !shiftKey &&
                key === "Enter" &&
                !!value.trim().length &&
                !isMobileDevice()
            ) {
                e.preventDefault();
                handleSubmit();
                setAttachmentName("");
            }
        };

        useEffect(() => {
            setPlaceholderByWidth();
            window.addEventListener("resize", setPlaceholderByWidth);
            return () =>
                window.removeEventListener("resize", setPlaceholderByWidth);
        }, [t]);

        useImperativeHandle(ref, () => textAreaRef.current!);

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
                                    onUpload(files[0]);
                                }
                            }
                        }}
                    />
                    <button
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3"
                        onClick={({ currentTarget }) => {
                            if (!!attachmentName.length) {
                                setAttachmentName("");
                                onUpload(null);
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
                                        minHeight,
                                        maxHeight
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
                            autoFocus={true}
                            ref={textAreaRef}
                            placeholder={busy ? "..." : inputPlaceholder}
                            className={`pl-10 p-2.5 border-2 border-gray-300 rounded-lg overflow-y-scroll scrollbar-hide resize-none h-[${minHeight}px] w-[calc(100%)] text-sm lg:text-base !outline-none`}
                            onInput={({ currentTarget }) =>
                                setTextAreaHeight(
                                    currentTarget,
                                    minHeight,
                                    maxHeight
                                )
                            }
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button
                        className="bg-sky-100 hover:bg-sky-200 rounded-lg p-3 disabled:cursor-not-allowed"
                        onClick={() => {
                            !busy && handleSubmit();
                            setAttachmentName("");
                        }}
                        disabled={busy}
                    >
                        <img
                            className={busy ? "hidden" : "size-5"}
                            src={submitIcon}
                            alt=""
                        />
                        <img
                            className={
                                busy
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
    }
);
