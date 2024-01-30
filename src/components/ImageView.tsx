import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";

interface ImageViewProps {
    readonly delegate?: string;
    readonly options?: Partial<OptionsType>;
    readonly children: React.ReactNode;
}

export const ImageView = (props: ImageViewProps) => {
    const { delegate, options, children } = props;

    useEffect(() => {
        Fancybox.bind(delegate ?? "[data-image-view]", options);
        return () => Fancybox.destroy();
    }, [delegate, options]);

    return <>{children}</>;
};
