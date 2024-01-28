import toast from "react-hot-toast";
import { Landing } from "../components/Landing";
import { sampleConfig } from "../config/sample";
import { setClipboard } from "../helpers/setClipboard";
import { getRandomArr } from "../helpers/getRandomArr";

const Home = () => {
    const { title, samples } = sampleConfig;

    const handleSelectSample = async (message: string) => {
        const success = await setClipboard(message);
        if (success) {
            toast.success("请将消息粘贴到输入框并提交");
        } else {
            toast.error("消息复制失败，请检查浏览器设置");
        }
    };

    return (
        <Landing
            title={title}
            samples={getRandomArr(samples, 6)}
            onSelectSample={handleSelectSample}
        />
    );
};

export default Home;
