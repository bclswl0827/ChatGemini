import { i18n } from "i18next";

export const setUserLocale = async (i18n: Promise<i18n>, lang: string) =>
    (await i18n).changeLanguage(lang);
