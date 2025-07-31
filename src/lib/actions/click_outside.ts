export function clickOutside(
    node: HTMLElement,
    callback: (event: MouseEvent | TouchEvent) => void
) {
    const handleClick = (event: MouseEvent | TouchEvent) => {
        if (!node.contains(event.target as Node)) {
            callback(event);
        }
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("touchstart", handleClick, true); // Optional: mobile support

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
            document.removeEventListener("touchstart", handleClick, true);
        },
    };
}
