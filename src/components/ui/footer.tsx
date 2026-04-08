"use client";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {gsap} from "@/lib/gsap";

export const Footer = ()=> {
    const ref = useRef<HTMLElement>(null);
    const [email, setEmail] = useState("");
    const [sent, setSent]   = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".footer-marquee", { x: "0%" }, {
                x: "-8%", ease: "none",
                scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const col1 = [["About & Location","/about"],["Accommodation","/accommodation"],["Dining","/dining"]];
    const col2 = [["Experiences","/experiences"],["Gallery","/gallery"],["Reserve Now","/contact"]];

    return (
        <footer ref={ref} className="relative overflow-hidden bg-[#071220] border-t border-[#1C3B58]/30">
            {/* Orbs */}
            <div className="orb orb-ocean w-[600px] h-[600px] -bottom-40 -left-20 opacity-35 pointer-events-none" />
            <div className="orb orb-gold  w-[400px] h-[400px] top-20 right-10 opacity-10 pointer-events-none" />

            {/* Newsletter strip */}
            <div className="relative z-10 border-b border-[#1C3B58]/30 px-8 lg:px-14 py-12">
                <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                        <p className="label mb-3" style={{ fontSize: "9px" }}>Stay Informed</p>
                        <h3 className="display text-3xl lg:text-4xl font-light text-[#EAE6DE]"
                            style={{ fontFamily: "var(--font-display)" }}>
                            Seasonal rates & availability
                        </h3>
                    </div>
                    {sent ? (
                        <p className="ui text-[12px] text-[#C9A96E]">Thank you — we'll be in touch.</p>
                    ) : (
                        <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                              className="flex gap-0 border border-[#1C3B58]/60 overflow-hidden min-w-[360px]">
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                   placeholder="your@email.com"
                                   className="flex-1 bg-transparent px-5 py-4 ui text-[12px] text-[#EAE6DE] placeholder-[#A8A399]/30 outline-none" />
                            <button type="submit"
                                    className="bg-[#C9A96E] text-[#04090F] px-7 py-4 ui text-[10px] tracking-[.2em] uppercase font-medium hover:bg-[#DEC090] transition-colors flex-shrink-0">
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Main footer body */}
            <div className="relative z-10 px-8 lg:px-14 pt-16 pb-10 max-w-[1600px] mx-auto">
                <div className="grid lg:grid-cols-4 gap-14 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <p className="display text-[44px] font-light text-[#C9A96E] leading-none mb-1"
                           style={{ fontFamily: "var(--font-display)" }}>VILLA 76</p>
                        <p className="ui text-[9px] tracking-[.45em] text-[#C9A96E]/40 uppercase mb-7">Weligama · Sri Lanka</p>
                        <p className="ui text-[13px] leading-[1.9] text-[#A8A399] max-w-[300px]">
                            An intimate beachside sanctuary where the rhythms of the Indian Ocean set the pace for every day.
                            Three private suites, 80 metres from Weligama Bay.
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            <a href="mailto:stay@villa76.lk"
                               className="ui text-[12px] text-[#A8A399]/60 hover:text-[#C9A96E] transition-colors gold-hover inline-flex items-center gap-2">
                                <span className="text-[#5B9BB5]/50 text-xs">@</span> stay@villa76.lk
                            </a>
                            <a href="tel:+94771234567"
                               className="ui text-[12px] text-[#A8A399]/60 hover:text-[#C9A96E] transition-colors gold-hover inline-flex items-center gap-2">
                                <span className="text-[#5B9BB5]/50 text-xs">✆</span> +94 77 123 4567
                            </a>
                            <p className="ui text-[12px] text-[#A8A399]/35 leading-[1.7]">
                                No. 212 Sangananda Mawatha<br />Kapparatota, Weligama, Sri Lanka
                            </p>
                        </div>
                        {/* Availability indicator */}
                        <div className="mt-6 flex items-center gap-3">
                            <span className="avail-dot" />
                            <span className="ui text-[10px] tracking-[.15em] uppercase text-[#A8A399]/40">Accepting reservations</span>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    {[col1, col2].map((col, ci) => (
                        <div key={ci}>
                            <p className="label mb-7" style={{ fontSize: "9px" }}>{ci === 0 ? "Explore" : "Plan Your Stay"}</p>
                            <ul className="flex flex-col gap-4">
                                {col.map(([label, href]) => (
                                    <li key={label}>
                                        <Link href={href}
                                              className="ui text-[13px] text-[#A8A399]/55 hover:text-[#C9A96E] transition-colors duration-300 gold-hover">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="divider mb-8" />

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <p className="ui text-[11px] text-[#A8A399]/25">
                        © {new Date().getFullYear()} Villa 76 Weligama. All rights reserved.
                    </p>
                    <p className="ui text-[11px] text-[#A8A399]/25 ticker-num">
                        6.0535° N, 80.4481° E — Southern Coast, Sri Lanka
                    </p>
                </div>
            </div>

            {/* Marquee watermark */}
            <div className="pointer-events-none overflow-hidden pb-0 leading-none opacity-[0.03]">
        <span className="footer-marquee display text-[18vw] font-light whitespace-nowrap text-[#C9A96E]"
              style={{ fontFamily: "var(--font-display)" }}>
          VILLA 76 · WELIGAMA · SRI LANKA · COASTAL SANCTUARY ·
        </span>
            </div>
        </footer>
    );
}
