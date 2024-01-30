export const getBase64BlobUrl = (base64: string) => {
    try {
        let mimeType = "image/png";
        if (base64.indexOf("data:image") >= 0) {
            let arr = base64.split(",");
            mimeType = arr[0].match(/:(.*?);/)![1] || "image/png";
            base64 = arr[1];
        }
        let bytes = window.atob(base64);

        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        let blob = new Blob([ab], {
            type: mimeType,
        });
        let url = URL.createObjectURL(blob);
        return url;
    } catch (e) {
        console.log(e);
        return "";
    }
};
