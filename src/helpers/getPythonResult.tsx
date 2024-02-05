import { loadPyodide } from "pyodide";

export const getPythonResult = async (
    code: string,
    repoURL: string,
    onStdout: (x: string) => void,
    onStderr: (x: string) => void,
    onException: (x: string) => void
) => {
    const availablePackages = [
        { keyword: "numpy", package: "numpy" },
        { keyword: "pydantic", package: "pydantic" },
        { keyword: "pydecimal", package: "decimal" },
        { keyword: "asciitree", package: "asciitree" },
        { keyword: "dateutil", package: "python-dateutil" },
        { keyword: "yaml", package: "pyyaml" },
        { keyword: "docutils", package: "docutils" },
        { keyword: "jsonschema", package: "jsonschema" },
        { keyword: "pytz", package: "pytz" },
        { keyword: "lxml", package: "lxml" },
        { keyword: "cryptography", package: "cryptography" },
        { keyword: "Crypto", package: "pycryptodome" },
        { keyword: "nacl", package: "pynacl" },
        { keyword: "regex", package: "regex" },
    ];
    try {
        const pyodide = await loadPyodide({
            indexURL: repoURL,
            stdout: onStdout,
            stderr: onStderr,
            homedir: "/home/user",
        });
        const matchedPackages = availablePackages
            .filter(
                ({ keyword }) =>
                    code.includes(`import ${keyword}`) ||
                    code.includes(`from ${keyword}`)
            )
            .map(({ package: pkg }) => pkg);
        if (!!matchedPackages.length) {
            await pyodide.loadPackage(matchedPackages);
        }
        await pyodide.runPythonAsync(`
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`);
        await pyodide.runPythonAsync(code);
    } catch (e) {
        onException(`${e}`);
    }
};
