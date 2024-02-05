export const asyncSleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
