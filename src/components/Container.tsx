import { LegacyRef, ReactNode, forwardRef } from "react";
import { Toaster } from "react-hot-toast";

interface ContainerProps {
    readonly toaster?: boolean;
    readonly className?: string;
    readonly children: ReactNode;
}

export const Container = forwardRef(
    (props: ContainerProps, ref: LegacyRef<HTMLDivElement>) => {
        const { toaster, className, children } = props;
        return (
            <div
                ref={ref}
                className={
                    !!(className || "").length
                        ? className
                        : `h-screen w-full grid md:grid-cols-[15rem_1fr] grid-cols-[12rem_1fr]`
                }
            >
                {children}
                {toaster && <Toaster />}
            </div>
        );
    }
);
