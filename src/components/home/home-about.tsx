"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import Link from "next/link";

export const HomeAbout = ()=> {
    const s   = useRef<HTMLElement>(null);
    const h   = useRef<HTMLHeadingElement>(null);
    const bg  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax background
            gsap.to(bg.current, {
                yPercent: 20, ease: "none",
                scrollTrigger: { trigger: s.current, start: "top bottom", end: "bottom top", scrub: true },
            });

            // Word reveal on heading
            const words = splitWords(h.current!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 75 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: h.current, start: "top 82%" },
            });

            // Stats reveal
            gsap.fromTo(".ha-stat", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
                scrollTrigger: { trigger: ".ha-stats", start: "top 84%" },
            });

            // Info items
            gsap.fromTo(".ha-info", { opacity: 0, x: 40 }, {
                opacity: 1, x: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
                scrollTrigger: { trigger: ".ha-infos", start: "top 82%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative py-0 bg-[#071220] overflow-hidden">
            {/* Parallax full-bleed image strip */}
            <div className="relative h-[55vh] overflow-hidden">
                <div ref={bg} className="absolute inset-0 scale-[1.22]">
                    <img
                        src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2000&q=85&auto=format&fit=crop"
                        alt="Taprobane Island Weligama"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#071220] via-transparent to-[#071220]" />
                    <div className="absolute inset-0 bg-[#04090F]/40 mix-blend-multiply" />
                </div>

                {/* Overlaid co-ordinates */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center">
            <span className="display text-[12vw] font-light leading-none text-white/8 select-none"
                  style={{ WebkitTextStroke: "1px rgba(201,169,110,.12)" }}>
              WELIGAMA
            </span>
                    </div>
                </div>
            </div>

            {/* Content below image */}
            <div className="px-8 lg:px-14 py-24 lg:py-36">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
                    <div>
                        <div className="label mb-7">Our Story</div>
                        <h2
                            ref={h}
                            className="display text-[6.5vw] lg:text-[4.2vw] font-light leading-[1.1] text-[#EAE6DE] mb-8 perspective-[600px]"
                            style={{ perspective: "600px" }}>
                            {"A private villa. A personal touch. An unforgettable southern coast."}
                        </h2>
                        <p className="ui text-[14px] leading-[1.95] text-[#A8A399] mb-10 max-w-lg">
                            Villa 76 has been quietly welcoming guests since 2018 — not as a hotel,
                            but as a home. Three individually designed suites, 80 metres from the shore,
                            managed with the care and attention that only a private property can offer.
                        </p>
                        <Link href="/about" className="btn-outline">Our Story & Location</Link>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Stats */}
                        <div className="ha-stats grid grid-cols-2 gap-4 mb-2">
                            {[
                                { n: "2018", l: "Est.", sub: "Welcoming guests since" },
                                { n: "9.4",  l: "/ 10", sub: "Booking.com · 18+ reviews" },
                                { n: "80m",  l: "Shore", sub: "Walk to Weligama Bay" },
                                { n: "3",    l: "Suites", sub: "Individually designed rooms" },
                            ].map(s => (
                                <div key={s.l} className="ha-stat float-card border border-[#1C3B58]/30 px-6 py-5">
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="display text-3xl font-light text-[#C9A96E] leading-none">{s.n}</span>
                                        <span className="ui text-[9px] tracking-[.18em] uppercase text-[#C9A96E]/50">{s.l}</span>
                                    </div>
                                    <span className="ui text-[10px] text-[#A8A399]/45">{s.sub}</span>
                                </div>
                            ))}
                        </div>

                        {/* Key info rows */}
                        <div className="ha-infos divide-y divide-[#1C3B58]/25">
                            {[
                                { l: "Location",  v: "Kapparatota, Weligama, Southern Province" },
                                { l: "Check-in",  v: "From 2:00 PM · Check-out 12:00 PM" },
                                { l: "Payment",   v: "Cash on arrival · No deposit required" },
                                { l: "Managed",   v: "Privately owned & operated" },
                            ].map(r => (
                                <div key={r.l} className="ha-info flex justify-between items-center py-4 gap-4">
                                    <span className="ui text-[9px] tracking-[.2em] uppercase text-[#C9A96E]/50 flex-shrink-0">{r.l}</span>
                                    <span className="ui text-[12px] text-[#A8A399]/65 text-right">{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
