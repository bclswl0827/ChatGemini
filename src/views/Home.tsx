import { Landing, LandingSample } from "../components/Landing";
import { sampleConfig } from "../config/sample";
import { setClipboardText } from "../helpers/setClipboardText";
import { getRandomArr } from "../helpers/getRandomArr";
import { sendUserAlert } from "../helpers/sendUserAlert";
import { useEffect, useState } from "react";
import { globalConfig } from "../config/global";
import { RouterComponentProps } from "../config/router";
import { setTextAreaHeight } from "../helpers/setTextAreaHeight";

const Home = (props: RouterComponentProps) => {
    const { site: siteTitle } = globalConfig.title;
    const { title, samples } = sampleConfig;
    const textAreaRef =
        (props.refs?.textAreaRef.current as HTMLTextAreaElement) ?? null;

    const [randomSamples] = useState<LandingSample[]>(getRandomArr(samples, 6));

    const handleSelectSample = async (message: string) => {
        if (textAreaRef) {
            textAreaRef.focus();
            textAreaRef.value = message;
            setTextAreaHeight(textAreaRef);
        } else {
            const success = await setClipboardText(message);
            if (success) {
                sendUserAlert("请将消息粘贴到输入框并提交");
            } else {
                sendUserAlert("消息复制失败，请检查浏览器设置", true);
            }
        }
    };

    useEffect(() => {
        document.title = `新对话 | ${siteTitle}`;
    }, [siteTitle]);

    return (
        <Landing
            title={title}
            samples={randomSamples}
            onSelectSample={handleSelectSample}
        />
    );
};

export default Home;
