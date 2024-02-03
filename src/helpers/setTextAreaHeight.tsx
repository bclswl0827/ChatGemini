export const setTextAreaHeight = (
    current: HTMLTextAreaElement | null,
    minHeight: number = 45,
    maxHeight: number = 120,
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
