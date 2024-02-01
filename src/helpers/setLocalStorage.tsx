const setLocalStorage = <T,>(key: string, value: T, json: boolean): void => {
    if (value) {
        localStorage.setItem(
            key,
            json ? JSON.stringify(value) : (value as string)
        );
    } else {
        localStorage.removeItem(key);
    }
};

export default setLocalStorage;
