"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "@/lib/gsap";

export const Preloader = ({ onDone }: { onDone: () => void })=> {
    const ref     = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const numRef  = useRef<HTMLParagraphElement>(null);
    const [pct, setPct] = useState(0);

    useEffect(() => {
        // Fake load progress
        let val = 0;
        const iv = setInterval(() => {
            val += Math.random() * 18 + 4;
            if (val >= 100) { val = 100; clearInterval(iv); }
            setPct(Math.floor(val));
        }, 60);

        // After ~1.4s, animate out
        const timer = setTimeout(() => {
            const tl = gsap.timeline({ onComplete: onDone });
            tl.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "power4.inOut", transformOrigin: "left" })
                .to(logoRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" }, "-=0.1")
                .to(ref.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.15");
        }, 1400);

        return () => { clearInterval(iv); clearTimeout(timer); };
    }, [onDone]);

    return (
        <div ref={ref} className="fixed inset-0 z-[9999] bg-[#04090F] flex flex-col items-center justify-center">
            {/* Orb */}
            <div className="absolute w-[500px] h-[500px] rounded-full"
                 style={{ background: "radial-gradient(circle, rgba(91,155,181,.12) 0%, transparent 70%)", filter: "blur(80px)" }} />

            <div ref={logoRef} className="relative z-10 text-center">
                {/* Logo */}
                <div className="overflow-hidden mb-3">
          <span className="display text-[80px] lg:text-[110px] font-light text-[#C9A96E] leading-none block"
                style={{ fontFamily: "var(--font-display)" }}>
            76
          </span>
                </div>
                <p className="ui text-[10px] tracking-[.5em] text-[#C9A96E]/40 uppercase mb-10">
                    Villa · Weligama
                </p>

                {/* Progress bar */}
                <div className="w-40 mx-auto h-px bg-[#1C3B58] relative overflow-hidden">
                    <div
                        className="absolute left-0 top-0 h-full bg-[#C9A96E] transition-all duration-100"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <p className="ui text-[9px] tracking-[.3em] text-[#A8A399]/30 mt-3"
                   ref={numRef}>
                    {pct < 100 ? `${pct}%` : "Welcome"}
                </p>
            </div>

            {/* Wipe line */}
            <div ref={lineRef}
                 className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96E]/30 origin-left scale-x-0"
            />

            {/* Bottom label */}
            <div className="absolute bottom-8 inset-x-0 text-center">
                <p className="ui text-[9px] tracking-[.4em] text-[#A8A399]/20 uppercase">
                    Southern Coast · Sri Lanka
                </p>
            </div>
        </div>
    );
}
