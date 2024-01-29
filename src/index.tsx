import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterMode, RouterWrapper } from "./components/RouterWrapper";
import { routerConfig } from "./config/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { REDUX_PRESIST } from "./config/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={REDUX_PRESIST}>
            <RouterWrapper mode={routerConfig.mode as RouterMode}>
                <App />
            </RouterWrapper>
        </PersistGate>
    </Provider>
);
