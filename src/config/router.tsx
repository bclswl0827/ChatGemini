import { LazyExoticComponent, RefObject, lazy } from "react";
import { RouterMode } from "../components/RouterWrapper";

const Home = lazy(() => import("../views/Home"));
const Chat = lazy(() => import("../views/Chat"));
const NotFound = lazy(() => import("../views/NotFound"));

export type RouterProp<T> = Record<string, T>;

export interface RouterComponentProps {
    refs?: RouterProp<RefObject<HTMLElement>>;
}

export interface RouterConfigRoutes {
    readonly prefix: string;
    readonly uri: string;
    readonly suffix: string;
    readonly element: LazyExoticComponent<
        (props: RouterComponentProps) => JSX.Element
    >;
}

type RouterConfig = {
    readonly mode: RouterMode;
    readonly basename: string;
    readonly routes: Record<string, RouterConfigRoutes>;
};

export const routerConfig: RouterConfig = {
    basename: "/",
    mode: "hash",
    routes: {
        index: { prefix: "/", uri: "", suffix: "", element: Home },
        chat: { prefix: "/chat", uri: "/:id", suffix: "", element: Chat },
        default: { prefix: "*", uri: "", suffix: "", element: NotFound },
    },
};
