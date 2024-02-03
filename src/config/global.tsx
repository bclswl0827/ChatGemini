const env = Object.keys(process.env)
    .filter((key) => key.startsWith("REACT_APP_"))
    .reduce((env: Record<string, string | null>, key) => {
        env[key] = process.env[key] ?? null;
        return env;
    }, {});

if (!Object.keys(env).length) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/env.json", false);
    try {
        xhr.send();
        const data = JSON.parse(xhr.responseText);
        Object.assign(env, data);
    } catch (e) {
        Object.assign(env, {});
    }
}

const keys = env["REACT_APP_GEMINI_API_KEY"]
    ?.split("|")
    .map((v) => v.trim()) ?? [""];
const passcodes =
    env["REACT_APP_PASSCODE_MD5"]
        ?.split("|")
        .filter((v) => !!v.length)
        .map((v) => v.trim().toLocaleLowerCase()) ?? [];

export const globalConfig = {
    passcodes,
    keys,
    title: {
        site: !!env["REACT_APP_TITLE_SITE"]?.length
            ? env["REACT_APP_TITLE_SITE"]
            : "ChatGemini",
        header: !!env["REACT_APP_TITLE_HEADER"]?.length
            ? env["REACT_APP_TITLE_HEADER"]
            : "Gemini Pro",
    },
    api: env["REACT_APP_GEMINI_API_URL"],
    sse: env["REACT_APP_GEMINI_API_SSE"] === "false" ? false : true,
};
