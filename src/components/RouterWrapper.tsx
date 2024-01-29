import { BrowserRouter, HashRouter } from "react-router-dom";

export type RouterMode = "hash" | "history";

export interface RouterWrapperProps {
    readonly mode: RouterMode;
    readonly children: React.ReactNode;
}

export const RouterWrapper = (props: RouterWrapperProps) => {
    const { mode, children } = props;

    return mode === "hash" ? (
        <HashRouter>{children}</HashRouter>
    ) : (
        <BrowserRouter>{children}</BrowserRouter>
    );
};
