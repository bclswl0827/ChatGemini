import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { Prism } from "react-syntax-highlighter";
import { setClipboard } from "../helpers/setClipboard";
import { a11yDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import userThrottle from "../helpers/userThrottle";

interface MarkdownProps {
    readonly className?: string;
    readonly typingEffect: string;
    readonly children: string;
}

const handleCopyCode = userThrottle(
    async (code: string, currentTarget: EventTarget) => {
        const success = await setClipboard(code);
        const innerHTML = (currentTarget as HTMLButtonElement).innerHTML;
        (currentTarget as HTMLButtonElement).innerHTML = success
            ? "复制成功"
            : "复制失败";
        setTimeout(() => {
            (currentTarget as HTMLButtonElement).innerHTML = innerHTML;
        }, 1000);
    },
    1200
);

export const Markdown = (props: MarkdownProps) => {
    const { className, typingEffect, children } = props;

    return (
        <ReactMarkdown
            className={`prose text-sm lg:prose-base max-w-[100%] break-words ${
                className ?? ""
            }`}
            children={children}
            components={{
                a: ({ node, ...props }) => (
                    <a
                        href={props.href}
                        target="_blank"
                        rel="noreferrer"
                        {...props}
                    >
                        {props.children}
                    </a>
                ),
                pre: ({ node, ...props }) => (
                    <pre className="bg-transparent p-2" {...props} />
                ),
                code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className ?? "");
                    const code = (!!children ? String(children) : "❚").replace(
                        typingEffect,
                        "❚"
                    );

                    return match ? (
                        <>
                            <Prism
                                PreTag={"div"}
                                style={style}
                                language={
                                    match !== null
                                        ? match?.length > 1
                                            ? match[1]
                                            : ""
                                        : ""
                                }
                                children={code.replace(/\n$/, "")}
                            />
                            <button
                                className="text-gray-700/100 text-xs hover:opacity-50"
                                onClick={({ currentTarget }) =>
                                    handleCopyCode(code, currentTarget)
                                }
                            >
                                复制代码
                            </button>
                        </>
                    ) : (
                        <code className="text-gray-700">
                            {code.replace(/\n$/, "")}
                        </code>
                    );
                },
                table: ({ node, ...props }) => (
                    <table
                        className="overflow-x-auto block whitespace-nowrap"
                        {...props}
                    />
                ),
            }}
            urlTransform={(url) => url}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkMath]}
        />
    );
};
