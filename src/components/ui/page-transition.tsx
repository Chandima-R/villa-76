"use client";
import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "@/lib/gsap";

export const PageTransition = ()=> {
    const ref      = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isFirst  = useRef(true);

    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }

        const el = ref.current!;
        // Wipe in from bottom
        gsap.fromTo(el,
            { scaleY: 0, transformOrigin: "bottom" },
            { scaleY: 1, duration: 0.5, ease: "power4.inOut",
                onComplete: () => {
                    window.scrollTo(0, 0);
                    // Wipe out upward
                    gsap.to(el, { scaleY: 0, transformOrigin: "top", duration: 0.55, ease: "power4.inOut", delay: 0.05 });
                }
            }
        );
    }, [pathname]);

    return (
        <div
            ref={ref}
            className="fixed inset-0 z-[700] bg-[#071220] pointer-events-none origin-bottom scale-y-0"
        />
    );
}
