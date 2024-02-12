import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const createI18n = async (
    fallbackLng: string,
    storageKey: string,
    resources: Resource
) => {
    const detector = new LanguageDetector(null, {
        lookupLocalStorage: storageKey,
    });
    await i18n
        .use(initReactI18next)
        .use(detector)
        .init({
            resources,
            fallbackLng,
            detection: {
                caches: ["localStorage"],
                order: ["localStorage", "navigator"],
            },
            interpolation: { escapeValue: true },
        });

    return i18n;
};
