export function TailwindClass(classMap) {
    Object.entries(classMap).forEach(([customClass, tailwindClass]) => {
        document.querySelectorAll(`.${customClass}`).forEach(element => {
            // Skip SVG elements as they have read-only className property
            if (element.tagName === 'svg' || element instanceof SVGElement) {
                return;
            }
            element.className = tailwindClass;
        });
    });
}
