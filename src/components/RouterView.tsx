import { ReactNode, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

interface RouterViewProps {
    readonly routes: Record<
        string,
        {
            readonly prefix: string;
            readonly uri: string;
            readonly suffix: string;
            readonly element: ReactNode;
        }
    >;
    readonly suspense: ReactNode;
}

export const RouterView = (props: RouterViewProps) => {
    const { suspense: SuspenseFallback, routes } = props;

    return (
        <Suspense fallback={SuspenseFallback}>
            <Routes>
                {Object.values(routes).map(
                    ({ prefix, uri, suffix, element }, index) => (
                        <Route
                            key={index}
                            element={element}
                            path={`${prefix}${uri}${suffix}`}
                        />
                    )
                )}
            </Routes>
        </Suspense>
    );
};
