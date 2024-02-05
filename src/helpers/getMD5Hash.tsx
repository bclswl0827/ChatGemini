import { MD5 } from "crypto-js";

export const getMD5Hash = (str: string, upperCase?: boolean) => {
    const hash = MD5(str).toString();
    return upperCase ? hash.toLocaleUpperCase() : hash.toLocaleLowerCase();
};
