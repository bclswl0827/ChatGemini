import { loadPyodide } from "pyodide";

export const getPythonResult = async (
    pyodide: ReturnType<typeof loadPyodide>,
    code: string,
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
        { keyword: "hashlib", package: "hashlib" },
    ];
    try {
        const matchedPackages = availablePackages
            .filter(
                ({ keyword }) =>
                    code.includes(`import ${keyword}`) ||
                    code.includes(`from ${keyword}`)
            )
            .map(({ package: pkg }) => pkg);
        if (!!matchedPackages.length) {
            await (await pyodide).loadPackage(matchedPackages);
        }
        await (
            await pyodide
        ).runPythonAsync(`
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`);
        await (await pyodide).runPythonAsync(code);
    } catch (e) {
        onException(`${e}`);
    }
};
