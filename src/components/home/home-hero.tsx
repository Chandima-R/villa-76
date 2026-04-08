"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";

export const HomeHero = ()=> {
    const s   = useRef<HTMLElement>(null);
    const bg  = useRef<HTMLDivElement>(null);
    const h1  = useRef<HTMLHeadingElement>(null);
    const sub = useRef<HTMLParagraphElement>(null);
    const cta = useRef<HTMLDivElement>(null);
    const cur = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial curtain wipe reveal
            const tl = gsap.timeline({ delay: 0.15 });
            tl.fromTo(cur.current, { scaleY: 1 }, { scaleY: 0, duration: 1.5, ease: "power4.inOut", transformOrigin: "top" });

            // Word-by-word h1 reveal
            const words = splitWords(h1.current!);
            tl.fromTo(words, { yPercent: 105, rotateX: -25 }, {
                yPercent: 0, rotateX: 0, duration: 1.1, stagger: 0.055, ease: "power4.out",
            }, "-=0.6");

            tl.fromTo(sub.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.65");
            tl.fromTo(cta.current!.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.7");

            // Scroll parallax
            gsap.to(bg.current, {
                yPercent: 28, ease: "none",
                scrollTrigger: { trigger: s.current, start: "top top", end: "bottom top", scrub: true },
            });
            gsap.to(h1.current, {
                yPercent: 18, opacity: 0, ease: "none",
                scrollTrigger: { trigger: s.current, start: "40% top", end: "bottom top", scrub: true },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative h-screen min-h-[680px] flex flex-col justify-end pb-20 overflow-hidden">
            {/* Background */}
            <div ref={bg} className="absolute inset-0 scale-[1.18]">
                <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2400&q=90&auto=format&fit=crop"
                     alt="Villa 76 Weligama bay" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04090F]/50 to-transparent" />
                {/* Ocean colour wash */}
                <div className="absolute inset-0 bg-[#071220]/30 mix-blend-multiply" />
            </div>

            {/* Curtain */}
            <div ref={cur} className="absolute inset-0 z-30 bg-[#04090F]" />

            {/* Coordinates — top right */}
            <div className="absolute top-28 right-8 lg:right-14 z-10 text-right">
                <p className="ui text-[9px] tracking-[.3em] text-[#C9A96E]/50 uppercase">6.0535° N, 80.4481° E</p>
                <p className="ui text-[9px] tracking-[.2em] text-[#5B9BB5]/40 uppercase mt-1">Southern Coast · Sri Lanka</p>
            </div>

            {/* Scroll line */}
            <div className="absolute right-8 lg:right-14 bottom-28 z-10 flex flex-col items-center gap-3">
                <div className="w-px h-14 bg-gradient-to-b from-transparent to-[#C9A96E]/60" />
                <span className="ui text-[8px] tracking-[.35em] text-[#C9A96E]/45 uppercase [writing-mode:vertical-rl]">Scroll</span>
            </div>

            {/* Main content */}
            <div className="relative z-10 px-8 lg:px-14">
                <div className="label mb-7 opacity-80">A Coastal Sanctuary</div>

                <h1 ref={h1}
                    className="display text-[14vw] lg:text-[11.5vw] font-light leading-[.88] tracking-[-0.01em] text-[#EAE6DE] mb-8 perspective-[800px]"
                    style={{ perspective: "800px" }}>
                    Villa 76{"\n"}Weligama
                </h1>

                <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:justify-between">
                    <p ref={sub} className="ui text-[14px] leading-[1.95] text-[#A8A399] max-w-sm font-light">
                        Where the Indian Ocean becomes your living room.<br />
                        Three private suites · 80 metres from the bay.
                    </p>
                    <div ref={cta} className="flex items-center gap-6">
                        <a href="/accommodation" className="btn-gold">Explore Villa</a>
                        <a href="/contact" className="btn-outline">Reserve a Stay</a>
                    </div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#04090F] to-transparent pointer-events-none z-10" />
        </section>
    );
}
