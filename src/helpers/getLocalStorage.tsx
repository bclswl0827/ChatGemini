const getLocalStorage = <T,>(key: string, fallback: T, json: boolean): T => {
    try {
        const storedItem = localStorage.getItem(key);
        if (storedItem !== null) {
            if (!json) {
                return storedItem as T;
            }

            return JSON.parse(storedItem);
        }
    } catch (err) {
        localStorage.setItem(key, "");
    }

    localStorage.setItem(
        key,
        json ? JSON.stringify(fallback) : (fallback as string)
    );
    return fallback;
};

export default getLocalStorage;
