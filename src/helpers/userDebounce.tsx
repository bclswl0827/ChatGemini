const userDebounce = <T extends (...args: any[]) => void>(
    func: T,
    timeout: number = 500
): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout;

    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};

export default userDebounce;
