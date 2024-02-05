import fpPromise from "@fingerprintjs/fingerprintjs";

export const getFingerprint = async () => {
    const fingerprint = await fpPromise.load();
    const { visitorId } = await fingerprint.get();
    return visitorId;
};
