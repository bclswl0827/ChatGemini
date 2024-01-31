import { useCallback, useEffect, useState } from "react";
import scrollUpIcon from "../assets/icons/arrow-up-solid.svg";
import scrollDownIcon from "../assets/icons/arrow-down-solid.svg";

interface PageScrollerProps {
    readonly monitorRef: React.RefObject<HTMLDivElement>;
}

enum ScrollerDirection {
    UP,
    DOWN,
}

export const PageScroller = (props: PageScrollerProps) => {
    const { monitorRef } = props;
    const [showScroller, setShowScroller] = useState(false);
    const [scrollerState, setScrollerState] = useState<{
        direction: ScrollerDirection;
        lastPosition: number;
    }>({
        direction: ScrollerDirection.UP,
        lastPosition: 0,
    });

    const scrollToDirection = () => {
        const { current } = monitorRef;
        if (current) {
            const { direction } = scrollerState;
            if (direction === ScrollerDirection.UP) {
                current.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                current.scrollTo({
                    top: current.scrollHeight,
                    behavior: "smooth",
                });
            }
        }
    };

    const setScrollerVisibility = useCallback(() => {
        const { current } = monitorRef;
        if (current) {
            if (current.scrollTop !== scrollerState.lastPosition) {
                setShowScroller(true);
            }

            if (
                current.scrollTop <= 50 ||
                current.scrollTop + current.clientHeight >=
                    current.scrollHeight - 50
            ) {
                setShowScroller(false);
            }

            setScrollerState({
                direction:
                    current.scrollTop < scrollerState.lastPosition
                        ? ScrollerDirection.UP
                        : ScrollerDirection.DOWN,
                lastPosition: current.scrollTop,
            });
        }
    }, [monitorRef, scrollerState]);

    useEffect(() => {
        const { current } = monitorRef;
        current?.addEventListener("scroll", setScrollerVisibility);
        return () =>
            current?.removeEventListener("scroll", setScrollerVisibility);
    }, [monitorRef, setScrollerVisibility]);

    return (
        <button
            className={`bg-sky-400 hover:bg-sky-600 duration-300 size-8 rounded-full bottom-28 right-5 flex justify-center shadow-lg items-center ${
                showScroller ? "fixed" : "hidden"
            }`}
            onClick={scrollToDirection}
        >
            <img
                className={
                    scrollerState.direction === ScrollerDirection.UP
                        ? "animate-fade-up size-4"
                        : "hidden"
                }
                src={scrollUpIcon}
                alt=""
            />
            <img
                className={
                    scrollerState.direction === ScrollerDirection.DOWN
                        ? "animate-fade-down size-4"
                        : "hidden"
                }
                src={scrollDownIcon}
                alt=""
            />
        </button>
    );
};
