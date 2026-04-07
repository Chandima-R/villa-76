"use client";
import {useEffect, useRef} from "react";

export const CustomCursor = ()=> {
    const dot  = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0;
        const onMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            dot.current!.style.cssText = `left:${mx}px;top:${my}px`;
        };
        const raf = () => {
            rx += (mx - rx) * 0.10; ry += (my - ry) * 0.10;
            ring.current!.style.cssText = `left:${rx}px;top:${ry}px`;
            requestAnimationFrame(raf);
        };
        window.addEventListener("mousemove", onMove);
        const id = requestAnimationFrame(raf);

        const add = () => ring.current?.classList.add("hov");
        const rem = () => ring.current?.classList.remove("hov");
        const obs = new MutationObserver(() => {
            document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
                el.removeEventListener("mouseenter", add);
                el.removeEventListener("mouseleave", rem);
                el.addEventListener("mouseenter", add);
                el.addEventListener("mouseleave", rem);
            });
        });
        obs.observe(document.body, { childList: true, subtree: true });
        document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
            el.addEventListener("mouseenter", add);
            el.addEventListener("mouseleave", rem);
        });

        return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); obs.disconnect(); };
    }, []);

    return (
        <>
            <div ref={dot}  className="c-dot"  />
            <div ref={ring} className="c-ring" />
        </>
    );
}
