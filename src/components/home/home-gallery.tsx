"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import Link from "next/link";

/* ─── Marquee Strip ───────────────────────────────────── */
export function HomeMarquee() {
    const items = ["Beachfront Living","·","Three Private Suites","·","80m from the Bay","·","Rated 9.4 / 10","·","Weligama Bay","·","Indian Ocean","·","Private Chef Available","·","Watersports","·","UNESCO Galle Fort","·"];
    return (
        <div className="overflow-hidden border-y border-[#1C3B58]/35 bg-[#071220] py-5">
            <div className="marq-track">
                {[...items,...items].map((t,i) => (
                    <span key={i} className={`px-5 whitespace-nowrap ui text-[11px] tracking-[.22em] uppercase ${t==="·"?"text-[#C9A96E] text-xs":"text-[#A8A399]/50"}`}>{t}</span>
                ))}
            </div>
        </div>
    );
}

/* ─── Gallery Preview ─────────────────────────────────── */
const photos = [
    { src:"https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85&auto=format&fit=crop", alt:"Ocean view", cls:"col-span-2 row-span-2 aspect-square" },
    { src:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85&auto=format&fit=crop", alt:"Suite interior", cls:"aspect-[4/3]" },
    { src:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=85&auto=format&fit=crop", alt:"Weligama beach sunset", cls:"aspect-[4/3]" },
    { src:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85&auto=format&fit=crop", alt:"Dining rooftop bar", cls:"col-span-2 aspect-[16/7]" },
];

export const HomeGallery = ()=> {
    const s = useRef<HTMLElement>(null);
    const h = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = splitWords(h.current!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.05, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: h.current, start: "top 82%" },
            });
            gsap.fromTo(".gal-item", { opacity: 0, scale: 0.94 }, {
                opacity: 1, scale: 1, stagger: { amount: 0.5 }, duration: 1.0, ease: "power3.out",
                scrollTrigger: { trigger: ".gal-grid", start: "top 80%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="py-28 lg:py-40 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="label mb-5">Gallery</div>
                        <h2 ref={h} className="display text-[7vw] lg:text-[4.8vw] font-light leading-tight text-[#EAE6DE] perspective-[600px]" style={{ perspective:"600px" }}>
                            {"Life at Villa 76"}
                        </h2>
                    </div>
                    <Link href="/gallery" className="btn-outline hidden lg:inline-flex">Full Gallery</Link>
                </div>

                <div className="gal-grid grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-3 lg:gap-4">
                    {photos.map((p, i) => (
                        <div key={i} className={`gal-item group relative overflow-hidden ${p.cls} img-parallax`}>
                            <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.07]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04090F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="ui text-[10px] tracking-[.18em] uppercase text-[#C9A96E]">{p.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
