import { PyodideInterface } from "pyodide";

export const getPythonResult = async (
    pyodide: PyodideInterface,
    code: string,
    onStdout: (x: string) => void,
    onStderr: (x: string) => void,
    onImporting: (x: string, err: boolean) => void,
    onException: (x: string) => void,
    onJobFinished: () => void
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
        { keyword: "typing", package: "typing" },
    ];
    try {
        pyodide.setStdout({ batched: onStdout });
        pyodide.setStderr({ batched: onStderr });
        const matchedPackages = availablePackages
            .filter(
                ({ keyword }) =>
                    code.includes(`import ${keyword}`) ||
                    code.includes(`from ${keyword}`)
            )
            .map(({ package: pkg }) => pkg);
        if (!!matchedPackages.length) {
            await pyodide.loadPackage(matchedPackages, {
                errorCallback: (x) => onImporting(x, true),
                messageCallback: (x) => onImporting(x, false),
            });
        }
        const dict = pyodide.globals.get("dict");
        const globals = dict();
        await pyodide.runPythonAsync(code, { globals, locals: globals });
        globals.destroy();
        dict.destroy();
    } catch (e) {
        let err = String(e);
        if (err.endsWith("\n")) {
            err = err.slice(0, -1);
        }
        onException(err);
    } finally {
        onJobFinished();
    }
};
