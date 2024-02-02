export const getRandomArr = <T,>(arr: T[], length: number): T[] => {
    if (length > arr.length) {
        return arr;
    }

    const result: T[] = [];
    const usedIndices = new Set<number>();
    while (result.length < length) {
        const ran = Math.floor(Math.random() * arr.length);
        if (!usedIndices.has(ran)) {
            result.push(arr[ran]);
            usedIndices.add(ran);
        }
    }

    return result;
};
