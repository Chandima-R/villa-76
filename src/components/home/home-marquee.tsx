"use client";
import {useEffect, useRef, useState} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";

/* ─── Marquee Strip ───────────────────────────────────── */
export const HomeMarquee = ()=> {
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

export function HomeGallery() {
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

/* ─── Testimonials ────────────────────────────────────── */
const reviews = [
    { q:"The villa is exceptionally clean and beautifully designed. Big rooms with private showers and balconies. The best shower I've had in Sri Lanka. The beach is literally 50 metres away.", by:"Anna K.", from:"Germany", score:"10.0" },
    { q:"Fresh, spacious, and steps from the shore. A fully equipped kitchen and a large terrace made it feel like a home. The staff were incredibly warm and helpful throughout.", by:"Marco T.", from:"Italy",   score:"9.8"  },
    { q:"That sweet spot between city convenience and a wide, nearly private beach. Fast WiFi, excellent kitchen, very comfortable beds. I'd stay here every time I'm in Weligama.", by:"James R.", from:"United Kingdom", score:"9.6" },
    { q:"Friendly owner, pristine rooms, and the fully equipped kitchen is a genuine game-changer. Villa 76 hits every note — location, cleanliness, and service all top-tier.", by:"Priya M.", from:"Australia", score:"9.4" },
];

export function HomeTestimonials() {
    const [cur, setCur] = useState(0);
    const [dir, setDir] = useState(1);
    const s = useRef<HTMLElement>(null);

    const go = (d: number) => { setDir(d); setCur(c => (c + d + reviews.length) % reviews.length); };

    const vars = {
        enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
        center: { opacity: 1, x: 0 },
        exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".test-el", { opacity: 0, y: 36 }, {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: s.current, start: "top 78%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative py-28 lg:py-40 bg-[#071220] overflow-hidden">
            <div className="orb orb-ocean w-[700px] h-[700px] top-0 right-0 opacity-25" />
            {/* Quotation watermark */}
            <span className="display absolute top-10 left-8 lg:left-14 text-[22vw] font-light text-[#0C1E33] leading-none select-none pointer-events-none">"</span>

            <div className="relative z-10 px-8 lg:px-14 max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                    <div className="test-el">
                        <div className="label mb-5">Guest Stories</div>
                        <h2 className="display text-[6.5vw] lg:text-[4.2vw] font-light text-[#EAE6DE]">
                            Voices from <em className="italic text-[#C9A96E]">the Bay</em>
                        </h2>
                    </div>
                    <div className="test-el float-card px-8 py-5 flex items-center gap-5">
                        <span className="display text-5xl font-light text-[#C9A96E]">9.4</span>
                        <div>
                            <p className="ui text-[10px] tracking-[.2em] uppercase text-[#A8A399]/60 mb-1">Guest Rating</p>
                            <p className="ui text-[11px] text-[#A8A399]/50">Booking.com · 18+ Reviews</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#1C3B58]/40 pt-12 min-h-[220px] relative">
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div key={cur} custom={dir} variants={vars} initial="enter" animate="center" exit="exit"
                                    transition={{ duration: .5, ease: [.25,.46,.45,.94] }} className="absolute inset-0">
                            <blockquote className="display text-[2.8vw] lg:text-[2vw] font-light leading-[1.4] text-[#EAE6DE] max-w-5xl">
                                "{reviews[cur].q}"
                            </blockquote>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center display text-lg text-[#C9A96E]">{reviews[cur].by[0]}</div>
                                <div>
                                    <p className="ui text-[12px] text-[#EAE6DE]/75 font-medium">{reviews[cur].by}</p>
                                    <p className="ui text-[11px] text-[#C9A96E]/50">{reviews[cur].from} · {reviews[cur].score} / 10</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-5 mt-16">
                    <button onClick={() => go(-1)} className="w-11 h-11 border border-[#1C3B58] text-[#5B9BB5] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center">←</button>
                    <div className="flex gap-[6px]">
                        {reviews.map((_,i) => (
                            <button key={i} onClick={() => { setDir(i>cur?1:-1); setCur(i); }}
                                    className={`h-px transition-all duration-500 ${i===cur?"w-10 bg-[#C9A96E]":"w-4 bg-[#1C3B58]"}`} />
                        ))}
                    </div>
                    <button onClick={() => go(1)} className="w-11 h-11 border border-[#1C3B58] text-[#5B9BB5] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center">→</button>
                </div>
            </div>
        </section>
    );
}

/* ─── CTA Banner ──────────────────────────────────────── */
export function HomeCTA() {
    const s  = useRef<HTMLElement>(null);
    const bg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bg.current, { yPercent: 22, ease:"none",
                scrollTrigger: { trigger: s.current, start:"top bottom", end:"bottom top", scrub: true },
            });
            const words = splitWords(document.querySelector<HTMLHeadingElement>(".cta-heading")!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: s.current, start: "top 80%" },
            });
            gsap.fromTo(".cta-sub-el", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: s.current, start: "top 75%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div ref={bg} className="absolute inset-0 scale-[1.18]">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85&auto=format&fit=crop"
                     alt="Weligama coast" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#04090F]/72" />
                <div className="absolute inset-0 bg-[#071220]/40 mix-blend-multiply" />
            </div>

            <div className="relative z-10 px-8 lg:px-14 text-center max-w-4xl mx-auto">
                <div className="label justify-center cta-sub-el mb-8">Begin Your Journey</div>
                <h2 className="cta-heading display text-[9vw] lg:text-[6vw] font-light leading-[1.0] text-[#EAE6DE] mb-6 perspective-[600px]" style={{ perspective:"600px" }}>
                    {"Your Weligama Story Begins Here"}
                </h2>
                <p className="cta-sub-el ui text-[14px] leading-[1.9] text-[#A8A399] max-w-md mx-auto mb-10">
                    Three private suites · Direct beach access · Private chef on request.<br />
                    Minimum 2-night stay. Direct booking benefits included.
                </p>
                <div className="cta-sub-el flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact" className="btn-gold">Reserve Your Stay</Link>
                    <Link href="/accommodation" className="btn-outline">Explore the Villa</Link>
                </div>
            </div>
        </section>
    );
}
