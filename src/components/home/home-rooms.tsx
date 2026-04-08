"use client";
import {useEffect, useRef} from "react";
import {gsap} from "@/lib/gsap";
import Link from "next/link";

const rooms = [
    {
        n: "01", name: "Ocean Suite",
        size: "48 m²", price: "From $95",
        desc: "Opens directly onto the garden terrace with a private balcony framing the Indian Ocean horizon. Our most sought-after room.",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=85&auto=format&fit=crop",
        tag: "Most Popular",
    },
    {
        n: "02", name: "Garden Retreat",
        size: "42 m²", price: "From $85",
        desc: "Elevated above the tropical garden with sweeping bay views. Warm textures, natural materials, and afternoon golden light.",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85&auto=format&fit=crop",
        tag: "Garden Views",
    },
    {
        n: "03", name: "Beach Bungalow",
        size: "38 m²", price: "From $75",
        desc: "The villa's most intimate room — a quiet cocoon just steps from the sand, designed for those who want sea, sun, and stillness.",
        img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=85&auto=format&fit=crop",
        tag: "Direct Beach",
    },
];

export const HomeRooms = ()=> {
    const pin  = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!track.current || !pin.current) return;

            const cards = gsap.utils.toArray<HTMLDivElement>(".room-card");
            const totalWidth = track.current.scrollWidth - window.innerWidth;

            // ✅ STORE the horizontal scroll animation
            const scrollTween = gsap.to(track.current, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: pin.current,
                    start: "top top",
                    end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                },
            });

            // ✅ Card image scaling tied to horizontal scroll
            cards.forEach((card) => {
                const img = card.querySelector(".card-img");
                if (!img) return;

                gsap.fromTo(
                    img,
                    { scale: 1.12 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween, // ✅ FIXED
                            start: "left right",
                            end: "right right",
                            scrub: true,
                        },
                    }
                );
            });

            // ✅ Section heading animation
            gsap.fromTo(
                ".rooms-heading .w",
                { yPercent: 110 },
                {
                    yPercent: 0,
                    stagger: 0.06,
                    duration: 1.0,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: pin.current,
                        start: "top 90%",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#071220]">
            {/* Static header above pin */}
            <div className="px-8 lg:px-14 pt-24 pb-10">
                <div className="label mb-6">Accommodation</div>
                <div className="flex items-end justify-between">
                    <h2 className="rooms-heading display text-[7vw] lg:text-[5vw] font-light leading-[1.0] text-[#EAE6DE] overflow-hidden">
                        {["Three Bespoke", "Sanctuaries"].map((line, li) => (
                            <span key={li} className="block overflow-hidden">
                {line.split(" ").map((w, wi) => (
                    <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
                    <span className="w inline-block">{li === 1 && wi === 0 ? <em className="italic text-[#C9A96E]">{w}</em> : w}</span>
                  </span>
                ))}
              </span>
                        ))}
                    </h2>
                    <Link href="/accommodation" className="hidden lg:flex btn-outline">View All Rooms</Link>
                </div>
            </div>

            {/* Pinned horizontal scroll */}
            <div ref={pin} className="h-screen overflow-hidden">
                <div ref={track} className="flex h-full items-center gap-5 pl-8 lg:pl-14" style={{ width: "max-content" }}>
                    {rooms.map(r => (
                        <div key={r.n} className="room-card relative flex-shrink-0 w-[80vw] lg:w-[38vw] h-[72vh] overflow-hidden group" data-cursor>
                            {/* Image */}
                            <div className="card-img absolute inset-0">
                                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#071220]/20 to-transparent" />
                            </div>
                            {/* Tag */}
                            <div className="absolute top-7 right-7">
                                <span className="float-card px-3 py-[6px] ui text-[9px] tracking-[.2em] uppercase text-[#C9A96E]">{r.tag}</span>
                            </div>
                            {/* Number */}
                            <span className="absolute top-7 left-7 display text-[72px] font-light text-white/10 leading-none">{r.n}</span>
                            {/* Info */}
                            <div className="absolute bottom-0 inset-x-0 p-8">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="display text-3xl font-light text-[#EAE6DE]">{r.name}</h3>
                                    <span className="display text-xl text-[#C9A96E] font-light">{r.price}</span>
                                </div>
                                <p className="ui text-[13px] leading-[1.8] text-[#A8A399] mb-5">{r.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="ui text-[11px] tracking-[.15em] uppercase text-[#5B9BB5]/70">{r.size}</span>
                                    <Link href="/accommodation" className="ui text-[11px] tracking-[.18em] uppercase text-[#C9A96E] gold-hover flex items-center gap-2">
                                        Details <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End card */}
                    <div className="flex-shrink-0 w-[50vw] lg:w-[24vw] h-[72vh] flex flex-col items-center justify-center gap-6 border border-[#1C3B58]/40 bg-[#071220]/60 mx-5">
                        <span className="display text-5xl font-light text-[#C9A96E]/30">76</span>
                        <Link href="/accommodation" className="btn-gold">All Suites</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
