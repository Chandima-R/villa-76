'use client'

import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import Link from "next/link";

export const HomeCTA = ()=> {
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
