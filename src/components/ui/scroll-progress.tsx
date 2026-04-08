"use client";
import {useEffect, useRef} from "react";

export const ScrollProgress = () =>{
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
            if (barRef.current) barRef.current.style.width = `${pct}%`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[600] h-[2px] bg-transparent pointer-events-none">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-[#C9A96E]/60 via-[#C9A96E] to-[#DEC090]"
                style={{ width: "0%", transition: "width 0.1s linear" }}
            />
        </div>
    );
}
