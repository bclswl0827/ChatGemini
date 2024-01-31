export const setTextAreaHeight = (
    current: HTMLTextAreaElement | null,
    maxHeight: number,
    minHeight: number
) => {
    current!.style.height = "0px";
    current!.style.height =
        current!.scrollHeight < maxHeight
            ? `${
                  current!.scrollHeight > minHeight
                      ? current!.scrollHeight
                      : minHeight
              }px`
            : `${maxHeight}px`;
};
