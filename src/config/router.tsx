import { lazy } from "react";

const Home = lazy(() => import("../views/Home"));
const Chat = lazy(() => import("../views/Chat"));
const NotFound = lazy(() => import("../views/NotFound"));

export const routerConfig = {
    mode: "hash",
    routes: {
        index: { prefix: "/", uri: "", suffix: "", element: <Home /> },
        chat: { prefix: "/chat", uri: "/:id", suffix: "", element: <Chat /> },
        default: { prefix: "*", uri: "", suffix: "", element: <NotFound /> },
    },
};
