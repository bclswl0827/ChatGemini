import { Landing, LandingSample } from "../components/Landing";
import { sampleConfig } from "../config/sample";
import { getRandomArr } from "../helpers/getRandomArr";
import { useEffect, useState } from "react";
import { globalConfig } from "../config/global";
import { RouterComponentProps } from "../config/router";
import { setTextAreaHeight } from "../helpers/setTextAreaHeight";
import { getCurrentLocale } from "../helpers/getCurrentLocale";
import i18n, { i18nConfig } from "../config/i18n";
import { useTranslation } from "react-i18next";

const Home = (props: RouterComponentProps) => {
    const { t } = useTranslation();
    const { site: siteTitle } = globalConfig.title;
    const landingTitle = t("views.Home.landing_title");

    const textAreaRef =
        (props.refs?.textAreaRef.current as HTMLTextAreaElement) ?? null;
    const [randomSamples, setRandomSamples] = useState<LandingSample[]>([]);

    const setRandomSamplesToState = async () => {
        const { resources, fallback } = i18nConfig;
        const currentLocale = (await getCurrentLocale(
            i18n
        )) as keyof typeof resources;
        let data = sampleConfig[fallback as keyof typeof resources];
        if (currentLocale in sampleConfig) {
            !!sampleConfig[currentLocale].length &&
                (data = sampleConfig[currentLocale]);
        }
        setRandomSamples(getRandomArr(data, 6));
    };

    const handleSelectSample = async (message: string) => {
        textAreaRef.focus();
        textAreaRef.value = message;
        setTextAreaHeight(textAreaRef);
    };

    useEffect(() => {
        document.title = siteTitle;
        setRandomSamplesToState();
    }, [t, siteTitle]);

    return (
        <Landing
            title={landingTitle}
            samples={randomSamples}
            onSelectSample={handleSelectSample}
        />
    );
};

export default Home;
