import { useCallback, useEffect, useRef } from "react";
import { sendUserAlert } from "../helpers/sendUserAlert";
import setLocalStorage from "../helpers/setLocalStorage";
import getLocalStorage from "../helpers/getLocalStorage";
import { getFingerprint } from "../helpers/getFingerprint";
import { asyncSleep } from "../helpers/asyncSleep";
import { getMD5Hash } from "../helpers/getMD5Hash";
import { getEncryption } from "../helpers/getEncryption";
import { getDecryption } from "../helpers/getDecryption";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
    readonly logo: string;
    readonly title: string;
    readonly passcodes: string[];
    readonly onPasscodeCorrect: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { logo, title, passcodes, onPasscodeCorrect } = props;
    const { t } = useTranslation();

    const passcodeInputRef = useRef<HTMLInputElement>(null);
    const autoLoginCheckboxRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const { current } = passcodeInputRef;
        if (current) {
            const { value } = current;
            if (!value.length) {
                sendUserAlert(
                    t("components.LoginForm.handleLogin.invalid_passcode"),
                    true
                );
                return;
            }
            const passcode = getMD5Hash(value);
            if (passcodes.includes(passcode)) {
                const { checked: remember } =
                    autoLoginCheckboxRef.current || {};
                if (remember) {
                    const fingerprint = await getFingerprint();
                    const fingerprintHash = getMD5Hash(fingerprint);
                    const encodedPasscode = getEncryption(
                        JSON.stringify({
                            passcode,
                            fingerprint: fingerprintHash,
                        }),
                        fingerprint
                    );
                    setLocalStorage("passcode", encodedPasscode, remember);
                }
                sendUserAlert(
                    t("components.LoginForm.handleLogin.login_success")
                );
                await asyncSleep(500);
                onPasscodeCorrect();
            } else {
                sendUserAlert(
                    t("components.LoginForm.handleLogin.login_failed"),
                    true
                );
            }
        }
    };

    const checkHasLoggedIn = useCallback(async () => {
        const encodedPasscode = getLocalStorage(
            "passcode",
            "",
            false
        ).replaceAll('"', "");
        try {
            const browserFingerprint = await getFingerprint();
            const fignerprintHash = getMD5Hash(browserFingerprint);
            const { passcode, fingerprint } = JSON.parse(
                getDecryption(encodedPasscode, browserFingerprint)
            );
            return (
                passcodes.includes(passcode) && fingerprint === fignerprintHash
            );
        } catch (e) {
            return false;
        }
    }, [passcodes]);

    useEffect(() => {
        checkHasLoggedIn().then((login) => {
            if (login) {
                onPasscodeCorrect();
            } else {
                setLocalStorage("passcode", "", false);
            }
        });
    }, [checkHasLoggedIn, onPasscodeCorrect]);

    return (
        <>
            <div className="flex items-center mb-8">
                <img className="size-10 mr-2" src={logo} alt="" />
                <span className="text-3xl font-semibold text-gray-900">
                    {title}
                </span>
            </div>
            <div className="w-full bg-gray-50 rounded-lg shadow-xl max-w-lg hover:scale-105 transition-all duration-700">
                <div className="p-8 space-y-6">
                    <h1 className="font-bold text-gray-900 text-xl">
                        {t("components.LoginForm.login_title")}
                    </h1>
                    <h3 className="text-gray-900 text-md">
                        {t("components.LoginForm.login_tagline")}
                    </h3>
                    <div className="flex flex-col py-1 md:py-2 space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-900"
                        >
                            {t("components.LoginForm.passcode_label")}
                        </label>
                        <input
                            autoFocus={true}
                            className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none"
                            ref={passcodeInputRef}
                            type="password"
                            placeholder="* * * * * *"
                            onKeyDown={({ key }) => {
                                if (key === "Enter") {
                                    handleLogin();
                                }
                            }}
                        />
                    </div>
                    <div className="flex py-1 md:py-2">
                        <input
                            defaultChecked={true}
                            type="checkbox"
                            className="mr-1 size-4"
                            ref={autoLoginCheckboxRef}
                        />
                        <label
                            className="text-gray-500 text-sm"
                            onClick={() => {
                                const { current } = autoLoginCheckboxRef;
                                if (current) {
                                    current.checked = !current.checked;
                                }
                            }}
                        >
                            {t("components.LoginForm.remember_me")}
                        </label>
                    </div>
                    <button
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleLogin}
                    >
                        {t("components.LoginForm.login_button")}
                    </button>
                </div>
            </div>
        </>
    );
};
