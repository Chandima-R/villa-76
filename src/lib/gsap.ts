import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis with GSAP ScrollTrigger
    const syncLenis = () => {
        const lenis = (window as unknown as Record<string, unknown>).lenis as { on: (e: string, cb: () => void) => void } | undefined;
        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((t) => {
                (lenis as unknown as { raf: (t: number) => void }).raf?.(t * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            setTimeout(syncLenis, 100);
        }
    };
    syncLenis();
}

export { gsap, ScrollTrigger };

/** Word-split helper — returns array of spans */
export function splitWords(el: HTMLElement): HTMLElement[] {
    const text = el.innerText;
    el.innerHTML = text
        .split(" ")
        .map(
            (w) =>
                `<span class="split-word-wrap"><span class="split-word">${w}</span></span>`
        )
        .join(" ");
    return Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
}

/** Line-split helper */
export function splitLines(el: HTMLElement): HTMLElement[] {
    const text = el.innerText;
    el.innerHTML = text
        .split("\n")
        .map((l) => `<span class="split-line-wrap"><span class="split-line">${l}</span></span>`)
        .join("");
    return Array.from(el.querySelectorAll<HTMLElement>(".split-line"));
}
