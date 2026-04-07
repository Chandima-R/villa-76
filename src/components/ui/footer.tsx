"use client";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {gsap} from "@/lib/gsap";

export const Footer = () => {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".footer-marquee", { x: "0%" }, { x: "-8%", ease: "none",
                scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true }
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const col1 = [["Accommodation","/accommodation"],["Dining","/dining"],["Experiences","/experiences"]];
    const col2 = [["Gallery","/gallery"],["Reserve Now","/contact"],["Location","/contact"]];

    return (
        <footer ref={ref} className="relative overflow-hidden bg-[#071220] border-t border-[#1C3B58]/30 pt-20 pb-8">
            {/* Orbs */}
            <div className="orb orb-ocean w-[500px] h-[500px] -bottom-40 -left-20 opacity-40" />

            {/* Marquee BG text */}
            <div className="pointer-events-none overflow-hidden absolute bottom-0 left-0 w-full leading-none opacity-[0.035]">
        <span className="footer-marquee display text-[20vw] font-light whitespace-nowrap text-[#C9A96E]">
          VILLA 76 · WELIGAMA · SRI LANKA · COASTAL SANCTUARY ·
        </span>
            </div>

            <div className="relative z-10 px-8 lg:px-14 max-w-[1600px] mx-auto">
                <div className="grid lg:grid-cols-4 gap-14 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <p className="display text-[42px] font-light text-[#C9A96E] leading-none mb-2">VILLA 76</p>
                        <p className="ui text-[10px] tracking-[.4em] text-[#C9A96E]/40 uppercase mb-6">Weligama · Sri Lanka</p>
                        <p className="ui text-[13px] leading-[1.85] text-[#A8A399] max-w-[280px]">
                            An intimate beachside sanctuary where the rhythms of the Indian Ocean set the pace.
                            Three private suites, 80 metres from Weligama Bay.
                        </p>
                        <div className="mt-8 flex flex-col gap-2">
                            <a href="mailto:stay@villa76.lk" className="ui text-[12px] text-[#A8A399] hover:text-[#C9A96E] transition-colors gold-hover">stay@villa76.lk</a>
                            <a href="tel:+94771234567"       className="ui text-[12px] text-[#A8A399] hover:text-[#C9A96E] transition-colors gold-hover">+94 77 123 4567</a>
                            <p className="ui text-[12px] text-[#A8A399]/60">No. 212 Sangananda Mawatha, Kapparatota, Weligama</p>
                        </div>
                    </div>

                    {/* Nav */}
                    {[col1, col2].map((col, ci) => (
                        <div key={ci}>
                            <p className="label mb-7" style={{ fontSize: "9px" }}>{ci === 0 ? "Explore" : "Plan"}</p>
                            <ul className="flex flex-col gap-4">
                                {col.map(([label, href]) => (
                                    <li key={label}><Link href={href} className="ui text-[13px] text-[#A8A399] hover:text-[#C9A96E] transition-colors gold-hover">{label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="divider mb-7" />
                <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                    <p className="ui text-[11px] text-[#A8A399]/35">© {new Date().getFullYear()} Villa 76 Weligama. All rights reserved.</p>
                    <p className="ui text-[11px] text-[#A8A399]/35">6.0535° N, 80.4481° E — Southern Coast, Sri Lanka</p>
                </div>
            </div>
        </footer>
    );
}
