"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import Link from "next/link";

export const HomeDining = () => {
    const s   = useRef<HTMLElement>(null);
    const h   = useRef<HTMLHeadingElement>(null);
    const img = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = splitWords(h.current!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: h.current, start: "top 82%" },
            });

            // Clip-path image reveal
            gsap.fromTo(".dining-clip", { clipPath: "inset(0 100% 0 0)" }, {
                clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.inOut",
                scrollTrigger: { trigger: img.current, start: "top 78%" },
            });
            gsap.fromTo(".dining-img-inner", { scale: 1.18 }, {
                scale: 1, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: img.current, start: "top 78%" },
            });

            // Parallax
            gsap.to(".dining-img-inner", {
                yPercent: -12, ease: "none",
                scrollTrigger: { trigger: s.current, start: "top bottom", end: "bottom top", scrub: true },
            });

            // Info items
            gsap.fromTo(".dining-item", { opacity: 0, x: -30 }, {
                opacity: 1, x: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: ".dining-items", start: "top 82%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative py-28 lg:py-44 bg-[#04090F] overflow-hidden">
            <div className="orb orb-ocean w-[600px] h-[600px] top-20 right-0 opacity-25" />

            <div className="px-8 lg:px-14 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
                {/* Image */}
                <div ref={img} className="relative order-2 lg:order-1">
                    <div className="dining-clip overflow-hidden aspect-[4/5]">
                        <div className="dining-img-inner w-full h-full">
                            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=88&auto=format&fit=crop"
                                 alt="Villa 76 dining" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute -right-4 lg:-right-10 bottom-10 float-card px-7 py-5">
                        <p className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/60 mb-1">Private Chef</p>
                        <p className="display text-2xl font-light text-[#EAE6DE]">On Request</p>
                    </div>
                </div>

                {/* Text */}
                <div className="order-1 lg:order-2">
                    <div className="label mb-7">Dining & Flavour</div>
                    <h2 ref={h} className="display text-[7.5vw] lg:text-[4.8vw] font-light leading-[1.08] text-[#EAE6DE] mb-8 perspective-[600px]" style={{ perspective: "600px" }}>
                        {"Flavours of the Southern Coast"}
                    </h2>
                    <p className="ui text-[14px] leading-[1.9] text-[#A8A399] mb-10 max-w-md">
                        From curated breakfast spreads on the terrace to private chef dinners
                        and ocean-view rooftop bars 200 metres away — dining at Villa 76 is
                        an experience in itself.
                    </p>

                    <div className="dining-items flex flex-col gap-5 mb-10 border-l border-[#1C3B58]/60 pl-6">
                        {[
                            { t: "Private Chef Experiences", s: "Market-fresh, ocean-to-table menus tailored to you" },
                            { t: "Terrace Breakfast",         s: "Curated tropical spreads at sunrise" },
                            { t: "Surfer Rooftop Bar",        s: "200m away · European seafood · bay views" },
                        ].map(item => (
                            <div key={item.t} className="dining-item">
                                <p className="ui text-[13px] text-[#EAE6DE]/80 font-medium mb-1">{item.t}</p>
                                <p className="ui text-[12px] text-[#A8A399]/60">{item.s}</p>
                            </div>
                        ))}
                    </div>

                    <Link href="/dining" className="btn-outline">Explore Dining</Link>
                </div>
            </div>
        </section>
    );
}
