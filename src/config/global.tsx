const {
    REACT_APP_TITLE_SITE,
    REACT_APP_TITLE_HEADER,
    REACT_APP_GEMINI_API_KEY,
    REACT_APP_GEMINI_API_URL,
    REACT_APP_GEMINI_API_SSE,
} = process.env;

export const globalConfig = {
    title: {
        site: REACT_APP_TITLE_SITE ?? "ChatGemini",
        header: REACT_APP_TITLE_HEADER ?? "Gemini Pro",
    },
    key: REACT_APP_GEMINI_API_KEY,
    api: REACT_APP_GEMINI_API_URL,
    sse: REACT_APP_GEMINI_API_SSE === "true" ? true : false,
};
