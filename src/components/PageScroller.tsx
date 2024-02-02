import { useCallback, useEffect, useState } from "react";
import scrollUpIcon from "../assets/icons/arrow-up-solid.svg";
import scrollDownIcon from "../assets/icons/arrow-down-solid.svg";

interface PageScrollerProps {
    readonly thresholds: {
        readonly top: number;
        readonly bottom: number;
        readonly debounce: number;
    };
    readonly monitorRef: React.RefObject<HTMLDivElement>;
}

enum ScrollerDirection {
    UP,
    DOWN,
}

export const PageScroller = (props: PageScrollerProps) => {
    const { thresholds, monitorRef } = props;
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
            const { lastPosition } = scrollerState;
            const { top, bottom, debounce } = thresholds;
            const { scrollHeight, clientHeight, scrollTop } = current;

            if (Math.abs(scrollTop - lastPosition) < debounce) {
                return;
            }

            if (scrollTop !== lastPosition) {
                setShowScroller(true);
            }

            if (
                scrollTop < top ||
                scrollTop + clientHeight > scrollHeight - bottom
            ) {
                setShowScroller(false);
            }

            setScrollerState({
                direction:
                    scrollTop < lastPosition
                        ? ScrollerDirection.UP
                        : ScrollerDirection.DOWN,
                lastPosition: scrollTop,
            });
        }
    }, [monitorRef, scrollerState, thresholds]);

    useEffect(() => {
        const { current } = monitorRef;
        current?.addEventListener("scroll", setScrollerVisibility);
        return () =>
            current?.removeEventListener("scroll", setScrollerVisibility);
    }, [monitorRef, setScrollerVisibility]);

    return (
        <button
            className={`bg-sky-600 hover:bg-sky-800 duration-300 size-8 rounded-full bottom-28 right-5 flex justify-center shadow-lg items-center ${
                showScroller
                    ? "fixed animate-fade-left animate-duration-300"
                    : "hidden"
            }`}
            onClick={scrollToDirection}
        >
            <img
                className={
                    scrollerState.direction === ScrollerDirection.UP
                        ? "animate-duration-150 animate-fade-up size-4"
                        : "hidden"
                }
                src={scrollUpIcon}
                alt=""
            />
            <img
                className={
                    scrollerState.direction === ScrollerDirection.DOWN
                        ? "animate-duration-150 animate-fade-down size-4"
                        : "hidden"
                }
                src={scrollDownIcon}
                alt=""
            />
        </button>
    );
};
