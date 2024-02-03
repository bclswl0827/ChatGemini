const userThrottle = <T extends (...args: any[]) => void>(
    func: T,
    delay: number = 1000
): ((...args: Parameters<T>) => void) => {
    let lastTime = Date.now();
    return (...args) => {
        let currentTime = Date.now();
        if (currentTime - lastTime >= delay) {
            func.apply(null, args);
            lastTime = Date.now();
        }
    };
};

export default userThrottle;
