import { loadPyodide } from "pyodide";

export const getPythonRuntime = (
    repoURL: string,
    onStdout: (x: string) => void,
    onStderr: (x: string) => void
) =>
    loadPyodide({
        indexURL: repoURL,
        stdout: onStdout,
        stderr: onStderr,
        homedir: "/home/user",
    });
