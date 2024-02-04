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
import { useEffect, useState } from "react";
import { loadPyodide } from "pyodide";
import userDebounce from "../helpers/userDebounce";

interface MarkdownProps {
    readonly className?: string;
    readonly typingEffect: string;
    readonly children: string;
}

export const Markdown = (props: MarkdownProps) => {
    const { className, typingEffect, children } = props;

    const [executeResult, setExecuteResult] = useState("");

    const handleCopyCode = userThrottle(
        async (code: string, currentTarget: EventTarget) => {
            const success = await setClipboard(code);
            const innerText = (currentTarget as HTMLButtonElement).innerText;
            (currentTarget as HTMLButtonElement).innerText = success
                ? "复制成功"
                : "复制失败";
            setTimeout(() => {
                (currentTarget as HTMLButtonElement).innerText = innerText;
            }, 1000);
        },
        1200
    );

    const handleExecuteCode = userDebounce(
        async (code: string, currentTarget: EventTarget) => {
            const innerText = (currentTarget as HTMLButtonElement).innerText;
            try {
                (currentTarget as HTMLButtonElement).innerText = "正在执行";
                (currentTarget as HTMLButtonElement).disabled = true;
                setExecuteResult("# 正在加载资源");
                const pyodide = await loadPyodide({
                    indexURL: `${window.location.pathname}pyodide/`,
                    stdout: (x: string) => setExecuteResult(`# stdout\n${x}`),
                    stderr: (x: string) => setExecuteResult(`# stderr\n${x}`),
                });
                await pyodide.runPythonAsync(`
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`);
                setExecuteResult("# 正在执行代码");
                await pyodide.runPythonAsync(code);
            } catch (e) {
                setExecuteResult(`# 运行失败\n${e}`);
            }
            (currentTarget as HTMLButtonElement).innerText = innerText;
            (currentTarget as HTMLButtonElement).disabled = false;
        },
        300
    );

    useEffect(() => {
        setExecuteResult("");
    }, [children]);

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
                    const typeEffectPlaceholder = "❚";
                    const match = /language-(\w+)/.exec(className ?? "");
                    const lang = match !== null ? match[1] : "";
                    const code = (
                        !!children ? String(children) : typeEffectPlaceholder
                    ).replace(typingEffect, typeEffectPlaceholder);
                    return match ? (
                        <>
                            <Prism
                                PreTag={"div"}
                                style={style}
                                language={lang}
                                children={code.replace(/\n$/, "")}
                            />
                            <div className="flex gap-2">
                                <button
                                    className="text-gray-700/100 text-xs hover:opacity-50"
                                    onClick={({ currentTarget }) =>
                                        handleCopyCode(code, currentTarget)
                                    }
                                >
                                    复制代码
                                </button>
                                {!code.includes(typeEffectPlaceholder) &&
                                    lang === "python" && (
                                        <button
                                            className="text-gray-700/100 text-xs hover:opacity-50"
                                            onClick={({ currentTarget }) =>
                                                handleExecuteCode(
                                                    code,
                                                    currentTarget
                                                )
                                            }
                                        >
                                            执行代码
                                        </button>
                                    )}
                            </div>
                            {!!executeResult.length && (
                                <Prism
                                    PreTag={"div"}
                                    style={style}
                                    language={"python"}
                                    children={executeResult.replace(/\n$/, "")}
                                />
                            )}
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
