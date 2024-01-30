export const getBase64Img = async (file: File) => {
    return (await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
    })) as string;
};
