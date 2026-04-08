"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";

interface Props {
    label: string;
    title: string;
    titleItalic?: string;
    sub?: string;
    img: string;
}

export const PageHero = ({ label, title, titleItalic, sub, img }: Props)=> {
    const s   = useRef<HTMLElement>(null);
    const bg  = useRef<HTMLDivElement>(null);
    const h1  = useRef<HTMLHeadingElement>(null);
    const cur = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 });
            tl.fromTo(cur.current, { scaleY: 1 }, { scaleY: 0, duration: 1.3, ease: "power4.inOut", transformOrigin: "top" });

            const words = splitWords(h1.current!);
            tl.fromTo(words, { yPercent: 110, rotateX: -20 }, {
                yPercent: 0, rotateX: 0, duration: 1.0, stagger: 0.05, ease: "power4.out",
            }, "-=0.5");

            tl.fromTo(".ph-sub", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

            // Scroll parallax
            gsap.to(bg.current, { yPercent: 28, ease: "none",
                scrollTrigger: { trigger: s.current, start: "top top", end: "bottom top", scrub: true },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    const fullTitle = titleItalic ? `${title} ${titleItalic}` : title;

    return (
        <section ref={s} className="relative h-[75vh] min-h-[560px] flex flex-col justify-end pb-20 overflow-hidden">
            <div ref={bg} className="absolute inset-0 scale-[1.18]">
                <img src={img} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04090F]/50 to-transparent" />
                <div className="absolute inset-0 bg-[#071220]/30 mix-blend-multiply" />
            </div>

            {/* Curtain */}
            <div ref={cur} className="absolute inset-0 z-30 bg-[#04090F]" />

            <div className="relative z-10 px-8 lg:px-14">
                <div className="label mb-6 opacity-80">{label}</div>
                <h1 ref={h1}
                    className="display text-[11vw] lg:text-[8vw] font-light leading-[.9] text-[#EAE6DE] mb-6 perspective-[700px]"
                    style={{ perspective: "700px" }}>
                    {fullTitle}
                </h1>
                {sub && <p className="ph-sub ui text-[14px] leading-[1.85] text-[#A8A399] max-w-md">{sub}</p>}
            </div>

            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#04090F] to-transparent z-10 pointer-events-none" />
        </section>
    );
}
