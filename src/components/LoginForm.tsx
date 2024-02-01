import { useEffect, useRef } from "react";
import { MD5 } from "crypto-js";
import { sendUserAlert } from "../helpers/sendUserAlert";
import setLocalStorage from "../helpers/setLocalStorage";
import getLocalStorage from "../helpers/getLocalStorage";

interface LoginFormProps {
    readonly logo: string;
    readonly title: string;
    readonly passcodes: string[];
    readonly onPasscodeCorrect: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { logo, title, passcodes, onPasscodeCorrect } = props;

    const passcodeInputRef = useRef<HTMLInputElement>(null);
    const autoLoginCheckboxRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const { current } = passcodeInputRef;
        if (current) {
            const { value } = current;
            if (!value.length) {
                sendUserAlert("通行码不能为空", true);
                return;
            }

            const passcode = MD5(value).toString().toLocaleLowerCase();
            if (passcodes.includes(passcode)) {
                const { checked: remember } =
                    autoLoginCheckboxRef.current || {};
                if (remember) {
                    setLocalStorage("passcode", passcode, false);
                }
                sendUserAlert("登入成功，即将跳转");
                await new Promise((resolve) => setTimeout(resolve, 500));
                onPasscodeCorrect();
            } else {
                sendUserAlert("通行码错误", true);
            }
        }
    };

    useEffect(() => {
        const passcode = getLocalStorage("passcode", "", false);
        if (passcode && passcodes.includes(passcode)) {
            onPasscodeCorrect();
        } else {
            setLocalStorage("passcode", "", false);
        }
    }, [passcodes, onPasscodeCorrect]);

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
                        输入通行码以继续
                    </h1>
                    <h3 className="text-gray-900 text-md">
                        您在访问一个受保护的站点，请输入通行码以继续。
                    </h3>
                    <div className="flex flex-col py-1 md:py-2 space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-900"
                        >
                            通行码
                        </label>
                        <input
                            className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
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
                            自动登入
                        </label>
                    </div>
                    <button
                        className="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleLogin}
                    >
                        登入
                    </button>
                </div>
            </div>
        </>
    );
};
