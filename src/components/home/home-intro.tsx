"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";

export const HomeIntro = () => {
    const ref   = useRef<HTMLElement>(null);
    const quote = useRef<HTMLHeadingElement>(null);
    const stats = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word-by-word reveal
            const words = splitWords(quote.current!);
            gsap.fromTo(words,
                { opacity: 0.15, yPercent: 60 },
                { opacity: 1, yPercent: 0, stagger: 0.045, duration: 1.0, ease: "power4.out",
                    scrollTrigger: { trigger: quote.current, start: "top 82%" } }
            );

            // Stats count-up feel
            gsap.fromTo(".intro-stat",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: stats.current, start: "top 85%" } }
            );

            // Horizontal decorative line
            gsap.fromTo(".intro-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, ease: "power4.inOut", transformOrigin: "left",
                    scrollTrigger: { trigger: ref.current, start: "top 80%" } }
            );
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} className="relative py-28 lg:py-44 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
            {/* Orbs */}
            <div className="orb orb-ocean w-[700px] h-[700px] -top-40 -right-60 opacity-35" />
            <div className="orb orb-gold  w-[400px] h-[400px] bottom-0  left-0    opacity-20" />

            <div className="max-w-[1600px] mx-auto">
                <div className="intro-line h-px bg-[#C9A96E]/25 mb-16 origin-left" />

                <h2 ref={quote}
                    className="display text-[4.8vw] lg:text-[3.8vw] font-light leading-[1.25] text-[#EAE6DE] max-w-5xl mb-20 perspective-[600px]"
                    style={{ perspective: "600px" }}>
                    {"An intimate refuge where the warm waters of the Indian Ocean lap at your doorstep, and every morning begins with the sound of the tide."}
                </h2>

                {/* Stats */}
                <div ref={stats} className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#1C3B58]/50 pt-14">
                    {[
                        { n: "03", label: "Private Suites",   sub: "Each individually styled" },
                        { n: "80", label: "Metres to Shore",   sub: "Steps from Weligama Bay" },
                        { n: "9.4", label: "Guest Rating",     sub: "Booking.com · 18 reviews" },
                        { n: "1°C", label: "Ocean Temp",       sub: "28°C year-round" },
                    ].map(s => (
                        <div key={s.label} className="intro-stat">
                            <span className="display text-[52px] lg:text-[64px] font-light text-[#C9A96E] leading-none block mb-2">{s.n}</span>
                            <span className="ui text-[11px] tracking-[.18em] uppercase text-[#EAE6DE]/70 block mb-1">{s.label}</span>
                            <span className="ui text-[11px] text-[#A8A399]/50">{s.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
