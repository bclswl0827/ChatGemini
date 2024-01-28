export const getRandomArr = <T,>(arr: T[], length: number) => {
    const result: T[] = [];
    for (var i = 0; i < length; i++) {
        var ran = Math.floor(Math.random() * (arr.length - i));
        result.push(arr[ran]);
        arr[ran] = arr[arr.length - i - 1];
    }

    return result;
};
