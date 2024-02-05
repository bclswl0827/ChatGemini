import { Rabbit } from "crypto-js";

export const getEncryption = (text: string, secret: string) =>
    Rabbit.encrypt(text, secret).toString();
