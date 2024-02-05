import { loadPyodide } from "pyodide";

export const getPythonRuntime = async (repoURL: string) => {
    const pyodide = await loadPyodide({
        indexURL: repoURL,
        homedir: "/home/user",
    });
    await pyodide.runPythonAsync(`
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`);
    return pyodide;
};
