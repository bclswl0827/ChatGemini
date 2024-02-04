export const isObjectEqual = <T extends Record<string, any>>(
    obj1: T,
    obj2: T
) => {
    return (
        Object.keys(obj1).length === Object.keys(obj2).length &&
        (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
            return (
                Object.prototype.hasOwnProperty.call(obj2, key) &&
                obj1[key] === obj2[key]
            );
        })
    );
};
