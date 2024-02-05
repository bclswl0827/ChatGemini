import { Rabbit, enc } from "crypto-js";

export const getDecryption = (encryptedData: string, key: string) =>
    Rabbit.decrypt(encryptedData, key).toString(enc.Utf8);
