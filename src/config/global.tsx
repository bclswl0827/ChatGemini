const {
    REACT_APP_PASSCODE_MD5,
    REACT_APP_TITLE_SITE,
    REACT_APP_TITLE_HEADER,
    REACT_APP_GEMINI_API_KEY,
    REACT_APP_GEMINI_API_URL,
    REACT_APP_GEMINI_API_SSE,
} = process.env;

const keys = REACT_APP_GEMINI_API_KEY
    ? REACT_APP_GEMINI_API_KEY.split("|").map((v) => v.trim())
    : [""];
const passcodes = REACT_APP_PASSCODE_MD5
    ? REACT_APP_PASSCODE_MD5?.split("|").map((v) =>
          v.trim().toLocaleLowerCase()
      )
    : [];

export const globalConfig = {
    passcodes,
    keys,
    title: {
        site: !!REACT_APP_TITLE_SITE?.length
            ? REACT_APP_TITLE_SITE
            : "ChatGemini",
        header: !!REACT_APP_TITLE_HEADER?.length
            ? REACT_APP_TITLE_HEADER
            : "Gemini Pro",
    },
    api: REACT_APP_GEMINI_API_URL,
    sse: REACT_APP_GEMINI_API_SSE === "false" ? false : true,
};
