import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ContainerProps {
    readonly className?: string;
    readonly children: ReactNode;
}

export const Container = (props: ContainerProps) => {
    const { className, children } = props;
    return (
        <div
            className={
                (className || "").length > 0
                    ? className
                    : `h-screen w-full grid md:grid-cols-[15rem_1fr] grid-cols-[12rem_1fr]`
            }
        >
            {children}
            <Toaster />
        </div>
    );
};
