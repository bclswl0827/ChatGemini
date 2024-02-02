import { Landing, LandingSample } from "../components/Landing";
import { sampleConfig } from "../config/sample";
import { setClipboard } from "../helpers/setClipboard";
import { getRandomArr } from "../helpers/getRandomArr";
import { sendUserAlert } from "../helpers/sendUserAlert";
import { useEffect, useState } from "react";
import { globalConfig } from "../config/global";

const Home = () => {
    const { site: siteTitle } = globalConfig.title;
    const { title, samples } = sampleConfig;

    const [randomSamples, setRandomSamples] = useState<LandingSample[]>([]);

    const handleSelectSample = async (message: string) => {
        const success = await setClipboard(message);
        if (success) {
            sendUserAlert("请将消息粘贴到输入框并提交");
        } else {
            sendUserAlert("消息复制失败，请检查浏览器设置", true);
        }
    };

    useEffect(() => {
        document.title = `新对话 | ${siteTitle}`;
        setRandomSamples(getRandomArr(samples, 6));
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
