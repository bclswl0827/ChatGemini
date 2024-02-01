import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import sessions, { Sessions } from "../store/sessions";
import ai, { AI } from "../store/ai";
import localForage from "localforage";

const sessionsPersistConfig = persistReducer(
    { storage: localForage, key: "sessions", whitelist: ["sessions"] },
    sessions
);

const reducer = combineReducers({
    ai,
    sessions: sessionsPersistConfig,
});
const REDUX_STORE = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const REDUX_PRESIST = persistStore(REDUX_STORE);
export type ReduxStore = ReturnType<typeof reducer>;
export interface ReduxStoreProps {
    readonly ai: ReturnType<typeof ai>;
    readonly sessions: ReturnType<typeof sessions>;
    readonly updateAI: (ai: AI) => void;
    readonly updateSessions: (sessions: Sessions) => void;
}
export default REDUX_STORE;
