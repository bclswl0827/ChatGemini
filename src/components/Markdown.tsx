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
import { Point } from "unist";
import { isObjectEqual } from "../helpers/isObjectEqual";

interface MarkdownProps {
    readonly className?: string;
    readonly typingEffect: string;
    readonly children: string;
}

export const Markdown = (props: MarkdownProps) => {
    const { className, typingEffect, children } = props;

    const [executeResult, setExecuteResult] = useState<{
        result: string;
        startPos: Point | null;
        endPos: Point | null;
    }>({ result: "", startPos: null, endPos: null });

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
        async (
            startPos: Point | null,
            endPos: Point | null,
            code: string,
            currentTarget: EventTarget
        ) => {
            const innerText = (currentTarget as HTMLButtonElement).innerText;
            try {
                (currentTarget as HTMLButtonElement).innerText = "正在执行";
                (currentTarget as HTMLButtonElement).disabled = true;
                setExecuteResult({ result: "# 正在执行中", startPos, endPos });
                const pyodide = await loadPyodide({
                    indexURL: `${window.location.pathname}pyodide/`,
                    stdout: (x: string) =>
                        setExecuteResult({
                            result: `>>> ${x}`,
                            startPos,
                            endPos,
                        }),
                    stderr: (x: string) =>
                        setExecuteResult({
                            result: `>>> ${x}`,
                            startPos,
                            endPos,
                        }),
                });
                await pyodide.runPythonAsync(`
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`);
                await pyodide.runPythonAsync(code);
            } catch (e) {
                setExecuteResult({
                    result: `# 执行失败\n${e}`,
                    startPos,
                    endPos,
                });
            }
            (currentTarget as HTMLButtonElement).innerText = innerText;
            (currentTarget as HTMLButtonElement).disabled = false;
        },
        300
    );

    useEffect(() => {
        setExecuteResult({ result: "", startPos: null, endPos: null });
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
                code: ({ className, children, node }) => {
                    const typeEffectPlaceholder = "❚";
                    const match = /language-(\w+)/.exec(className ?? "");
                    const lang = match !== null ? match[1] : "";
                    const code = (
                        !!children ? String(children) : typeEffectPlaceholder
                    ).replace(typingEffect, typeEffectPlaceholder);
                    const startPos = node?.position?.start ?? null;
                    const endPos = node?.position?.end ?? null;
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
                                                    startPos,
                                                    endPos,
                                                    code,
                                                    currentTarget
                                                )
                                            }
                                        >
                                            执行代码
                                        </button>
                                    )}
                            </div>
                            {isObjectEqual(
                                executeResult.startPos ?? {},
                                startPos ?? {}
                            ) &&
                                isObjectEqual(
                                    executeResult.endPos ?? {},
                                    endPos ?? {}
                                ) &&
                                !!executeResult.result.length && (
                                    <Prism
                                        PreTag={"div"}
                                        style={style}
                                        language={"python"}
                                        children={executeResult.result.replace(
                                            /\n$/,
                                            ""
                                        )}
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
