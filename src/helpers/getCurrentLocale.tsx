import { i18n } from "i18next";

export const getCurrentLocale = async (i18n: Promise<i18n>) =>
    (await i18n).language;
