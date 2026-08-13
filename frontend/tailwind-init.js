export function TailwindClass(classMap) {
    Object.entries(classMap).forEach(([customClass, tailwindClass]) => {
        document.querySelectorAll(`.${customClass}`).forEach(element => {
            element.className = tailwindClass;
        });
    });
}
