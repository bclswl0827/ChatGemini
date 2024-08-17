import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { Prism } from "react-syntax-highlighter";
import { setClipboardText } from "../helpers/setClipboardText";
import { a11yDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";
import userThrottle from "../helpers/userThrottle";
import { useEffect, useState } from "react";
import userDebounce from "../helpers/userDebounce";
import type { Point } from "unist";
import { isObjectEqual } from "../helpers/isObjectEqual";
import { getPythonResult } from "../helpers/getPythonResult";
import { PyodideInterface } from "pyodide";
import { getPythonRuntime } from "../helpers/getPythonRuntime";
import { useTranslation } from "react-i18next";

interface MarkdownProps {
    readonly className?: string;
    readonly typingEffect: string;
    readonly pythonRepoUrl: string;
    readonly pythonRuntime: PyodideInterface | null;
    readonly onPythonRuntimeCreated: (pyodide: PyodideInterface) => void;
    readonly children: string;
}

const TraceLog = "😈 [TRACE]";
const DebugLog = "🚀 [DEBUG]";
const ErrorLog = "🤬 [ERROR]";
const PythonScriptDisplayName = "script.py";
const RunnerResultPlaceholder = `\n${DebugLog} Running Python Script...`;
const TypingEffectPlaceholder = "❚";
const ShellPrompt = `[user@${Math.random().toString(16).slice(-12)} ~]$ `;

export const Markdown = (props: MarkdownProps) => {
    const { t } = useTranslation();
    const {
        className,
        typingEffect,
        pythonRepoUrl,
        pythonRuntime,
        onPythonRuntimeCreated,
        children,
    } = props;

    const [pythonResult, setPythonResult] = useState<{
        result: string;
        startPos: Point | null;
        endPos: Point | null;
    }>({ result: "", startPos: null, endPos: null });

    const handleCopyCode = userThrottle(
        async (code: string, currentTarget: EventTarget) => {
            const success = await setClipboardText(code);
            const innerText = (currentTarget as HTMLButtonElement).innerText;
            (currentTarget as HTMLButtonElement).innerText = success
                ? t("components.Markdown.handleCopyCode.copy_success")
                : t("components.Markdown.handleCopyCode.copy_failed");
            setTimeout(() => {
                (currentTarget as HTMLButtonElement).innerText = innerText;
            }, 1000);
        },
        1200
    );

    const handleRunnerResult = (x: string) =>
        setPythonResult((prev) => {
            let result = prev.result.replace(RunnerResultPlaceholder, "");
            if (result.includes(TraceLog)) {
                result = result
                    .split("\n")
                    .filter((x) => !x.includes(TraceLog))
                    .join("\n");
            }
            return { ...prev, result: `${result}\n${x}` };
        });

    const handleRunnerImporting = (x: string, err: boolean) =>
        setPythonResult((prev) => {
            let { result } = prev;
            if (err) {
                result += `\n${ErrorLog} ${x}`;
            } else {
                result += `\n${TraceLog} ${x}`;
            }
            return { ...prev, result };
        });

    const handleJobFinished = () =>
        setPythonResult((prev) => {
            let { result } = prev;
            result += `\n${ShellPrompt}${TypingEffectPlaceholder}`;
            return { ...prev, result };
        });

    const handleRunPython = userDebounce(
        async (
            startPos: Point | null,
            endPos: Point | null,
            code: string,
            currentTarget: EventTarget
        ) => {
            (currentTarget as HTMLButtonElement).disabled = true;
            setPythonResult({
                result: `${ShellPrompt}python3 ${PythonScriptDisplayName}${RunnerResultPlaceholder}`,
                startPos,
                endPos,
            });
            let runtime = pythonRuntime;
            if (!runtime) {
                runtime = await getPythonRuntime(pythonRepoUrl);
                onPythonRuntimeCreated(runtime);
            }
            await getPythonResult(
                runtime,
                code,
                handleRunnerResult,
                handleRunnerResult,
                handleRunnerImporting,
                handleRunnerResult,
                handleJobFinished
            );
            (currentTarget as HTMLButtonElement).disabled = false;
        },
        300
    );

    useEffect(() => {
        setPythonResult({ result: "", startPos: null, endPos: null });
    }, [t, children]);

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
                    const match = /language-(\w+)/.exec(className ?? "");
                    const lang = match !== null ? match[1] : "";
                    const code = (
                        !!children ? String(children) : TypingEffectPlaceholder
                    ).replace(typingEffect, TypingEffectPlaceholder);
                    const startPos = node?.position?.start ?? null;
                    const endPos = node?.position?.end ?? null;
                    return match ? (
                        <>
                            <Prism
                                PreTag={"div"}
                                style={style}
                                language={lang}
                                showLineNumbers={true}
                                lineNumberStyle={{ opacity: 0.5 }}
                                children={code.replace(/\n$/, "")}
                            />
                            <div className="flex gap-2">
                                <button
                                    className="text-gray-700/100 text-xs hover:opacity-50"
                                    onClick={({ currentTarget }) =>
                                        handleCopyCode(code, currentTarget)
                                    }
                                >
                                    {t("components.Markdown.copy_code")}
                                </button>
                                {!code.includes(TypingEffectPlaceholder) &&
                                    lang === "python" && (
                                        <button
                                            className="text-gray-700/100 text-xs hover:opacity-50"
                                            onClick={({ currentTarget }) =>
                                                handleRunPython(
                                                    startPos,
                                                    endPos,
                                                    code,
                                                    currentTarget
                                                )
                                            }
                                        >
                                            {t(
                                                "components.Markdown.run_script"
                                            )}
                                        </button>
                                    )}
                            </div>
                            {isObjectEqual(
                                pythonResult.startPos ?? {},
                                startPos ?? {}
                            ) &&
                                isObjectEqual(
                                    pythonResult.endPos ?? {},
                                    endPos ?? {}
                                ) &&
                                !!pythonResult.result.length && (
                                    <>
                                        <Prism
                                            language="shell"
                                            PreTag={"div"}
                                            style={style}
                                            children={pythonResult.result.replace(
                                                /\n$/,
                                                ""
                                            )}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                className="text-gray-700/100 text-xs hover:opacity-50"
                                                onClick={({ currentTarget }) =>
                                                    handleCopyCode(
                                                        pythonResult.result,
                                                        currentTarget
                                                    )
                                                }
                                            >
                                                {t(
                                                    "components.Markdown.copy_result"
                                                )}
                                            </button>
                                            <button
                                                className="text-gray-700/100 text-xs hover:opacity-50"
                                                onClick={() =>
                                                    setPythonResult({
                                                        result: "",
                                                        startPos: null,
                                                        endPos: null,
                                                    })
                                                }
                                            >
                                                {t(
                                                    "components.Markdown.close_window"
                                                )}
                                            </button>
                                        </div>
                                    </>
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
