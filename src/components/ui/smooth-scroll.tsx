"use client";
import {useEffect} from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.8,
        });
        (window as unknown as Record<string, unknown>).lenis = lenis;
        const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
        const id = requestAnimationFrame(raf);
        return () => { cancelAnimationFrame(id); lenis.destroy(); };
    }, []);
    return <>{children}</>;
}
