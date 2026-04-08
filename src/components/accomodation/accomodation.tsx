"use client";
import {useEffect, useRef, useState} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {AnimatePresence, motion} from "framer-motion";
import {PageHero} from "@/components/ui/page-hero";
import Link from "next/link";

const rooms = [
    {
        n: "01", name: "Ocean Suite", size: "48 m²", guests: "2 Guests", price: "$95",
        desc: "Our most sought-after room opens directly onto the garden terrace with a private balcony that frames an unbroken Indian Ocean horizon. Morning light floods through floor-to-ceiling louvred shutters; evenings bring the sound of waves from a few steps away.",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=88&auto=format&fit=crop",
        img2: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop",
        amenities: ["King Bed","Private Balcony","En-suite Bath","Rain Shower","Garden & Ocean View","Air Conditioning","High-Speed WiFi","Work Desk","In-room Safe","Complimentary Minibar"],
        tag: "Most Popular",
    },
    {
        n: "02", name: "Garden Retreat", size: "42 m²", guests: "2 Guests", price: "$85",
        desc: "Elevated above the tropical garden canopy with sweeping bay glimpses, the Garden Retreat blends warm rattan textures and hand-selected local timber with all the modern comforts you'd expect from a five-star retreat — in a completely private setting.",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=88&auto=format&fit=crop",
        img2: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80&auto=format&fit=crop",
        amenities: ["King Bed","Balcony Seating","En-suite Shower","Garden Views","Ocean Glimpse","Air Conditioning","WiFi","Mini Kitchen Access","Reading Nook","Ceiling Fan"],
        tag: "Garden Views",
    },
    {
        n: "03", name: "Beach Bungalow", size: "38 m²", guests: "2 Guests", price: "$75",
        desc: "The villa's most intimate room — a quiet cocoon just steps from the sand, designed entirely for couples who want nothing but sun, sea, and silence. Wake to birdsong, step through the patio door, and find the Indian Ocean is already waiting.",
        img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=88&auto=format&fit=crop",
        img2: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop",
        amenities: ["Double Bed","Private Patio","Outdoor Shower","Direct Beach Access","Hammock","Ceiling Fan","WiFi","Beach Towels","Sunset Views","Mosquito Net"],
        tag: "Direct Beach",
    },
];

const policies = [
    { t: "Check-in", v: "2:00 PM onwards" },
    { t: "Check-out", v: "Until 12:00 PM" },
    { t: "Min. Stay", v: "2 nights" },
    { t: "Payment", v: "Cash on arrival" },
    { t: "Pets", v: "On request" },
    { t: "Children", v: "All ages welcome" },
];

function RoomCard({ room, i }: { room: typeof rooms[0]; i: number }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Clip reveal image
            gsap.fromTo(".rc-img-" + i, { clipPath: "inset(0 100% 0 0)" }, {
                clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut",
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
            gsap.fromTo(".rc-inner-" + i, { scale: 1.15 }, {
                scale: 1, duration: 1.4, ease: "power4.out",
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
            gsap.fromTo(".rc-text-" + i, { opacity: 0, x: i % 2 === 0 ? 50 : -50 }, {
                opacity: 1, x: 0, duration: 1.0, ease: "power3.out",
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
        }, ref);
        return () => ctx.revert();
    }, [i]);

    const isEven = i % 2 === 0;

    return (
        <div ref={ref} className={`grid lg:grid-cols-2 gap-0 border border-[#1C3B58]/30 overflow-hidden ${i > 0 ? "mt-6" : ""}`}>
            {/* Image */}
            <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] ${!isEven ? "lg:order-2" : ""}`}>
                <div className={`rc-img-${i} overflow-hidden w-full h-full`}>
                    <div className={`rc-inner-${i} w-full h-full`}>
                        <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="absolute top-6 left-6">
                    <span className="float-card px-3 py-[6px] ui text-[9px] tracking-[.2em] uppercase text-[#C9A96E]">{room.tag}</span>
                </div>
                <span className="absolute bottom-6 right-6 display text-[80px] font-light text-white/10 leading-none">{room.n}</span>
            </div>

            {/* Text */}
            <div className={`rc-text-${i} flex flex-col justify-between p-9 lg:p-12 bg-[#0C1E33]`}>
                <div>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="ui text-[9px] tracking-[.28em] uppercase text-[#5B9BB5]/60 mb-2">{room.size} · {room.guests}</p>
                            <h3 className="display text-[38px] lg:text-[44px] font-light text-[#EAE6DE] leading-none">{room.name}</h3>
                        </div>
                        <div className="text-right">
                            <p className="ui text-[9px] tracking-[.2em] uppercase text-[#A8A399]/40 mb-1">From</p>
                            <p className="display text-3xl text-[#C9A96E] font-light">{room.price}</p>
                            <p className="ui text-[9px] text-[#A8A399]/40">per night</p>
                        </div>
                    </div>
                    <p className="ui text-[13px] leading-[1.9] text-[#A8A399] mb-8">{room.desc}</p>

                    {/* Amenities toggle */}
                    <button onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 ui text-[11px] tracking-[.2em] uppercase text-[#C9A96E] mb-4 gold-hover"
                            data-cursor>
                        <span>{open ? "Hide" : "View"} Amenities</span>
                        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-lg leading-none">+</motion.span>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35 }} className="overflow-hidden">
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    {room.amenities.map(a => (
                                        <div key={a} className="flex items-center gap-2 ui text-[12px] text-[#A8A399]/70">
                                            <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50 flex-shrink-0" />
                                            {a}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#1C3B58]/40 mt-4">
                    <Link href="/contact" className="btn-gold flex-1 justify-center">Reserve This Suite</Link>
                    <div className="w-12 h-12 border border-[#1C3B58] flex items-center justify-center overflow-hidden group cursor-pointer">
                        <img src={room.img2} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const  AccomodationPage = ()=> {
    const pRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".policy-item", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".policies-grid", start: "top 82%" },
            });

            const words = splitWords(document.querySelector<HTMLHeadingElement>(".accom-intro-h")!);
            gsap.fromTo(words, { opacity: 0.15, yPercent: 70 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".accom-intro-h", start: "top 82%" },
            });
        }, pRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pRef}>
            <PageHero
                label="Accommodation"
                title="Three Private Sanctuaries"
                sub="Each suite is individually styled — a considered blend of natural materials, ocean light, and contemporary comfort."
                img="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=88&auto=format&fit=crop"
            />

            {/* Intro */}
            <section className="py-24 lg:py-36 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    <div className="orb orb-ocean w-[600px] h-[600px] top-0 right-0 opacity-25" />
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <h2 className="accom-intro-h display text-[5.5vw] lg:text-[3.8vw] font-light leading-[1.15] text-[#EAE6DE] perspective-[600px]" style={{ perspective: "600px" }}>
                            {"Where every detail is chosen with purpose, and every morning begins with the ocean."}
                        </h2>
                        <div>
                            <p className="ui text-[14px] leading-[1.95] text-[#A8A399] mb-8">
                                Villa 76 offers three beautifully appointed suites within a privately managed beachside property. Spacious, immaculately maintained, and designed to feel like a home rather than a hotel — each room has its own character, its own rhythm with the light.
                            </p>
                            <div className="grid grid-cols-3 gap-6">
                                {[{ n:"3", l:"Suites"}, { n:"6", l:"Max Guests"}, { n:"80m", l:"To Shore"}].map(s => (
                                    <div key={s.l} className="border-t border-[#1C3B58]/50 pt-5">
                                        <span className="display text-[42px] font-light text-[#C9A96E] block leading-none mb-1">{s.n}</span>
                                        <span className="ui text-[10px] tracking-[.18em] uppercase text-[#A8A399]/50">{s.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Room cards */}
            <section className="pb-24 px-8 lg:px-14 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    {rooms.map((r, i) => <RoomCard key={r.n} room={r} i={i} />)}
                </div>
            </section>

            {/* Policies */}
            <section className="py-20 px-8 lg:px-14 bg-[#071220]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="label mb-10">Villa Policies</div>
                    <div className="policies-grid grid grid-cols-2 lg:grid-cols-6 gap-0 border border-[#1C3B58]/30">
                        {policies.map(p => (
                            <div key={p.t} className="policy-item px-6 py-7 border-r border-b border-[#1C3B58]/20 last:border-r-0">
                                <p className="ui text-[9px] tracking-[.22em] uppercase text-[#C9A96E]/55 mb-2">{p.t}</p>
                                <p className="display text-xl font-light text-[#EAE6DE]">{p.v}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-8 lg:px-14 bg-[#04090F] text-center">
                <div className="label justify-center mb-6">Ready to Stay?</div>
                <h2 className="display text-[5vw] lg:text-[3.5vw] font-light text-[#EAE6DE] mb-8">Reserve Your Suite Today</h2>
                <div className="flex items-center justify-center gap-4">
                    <Link href="/contact" className="btn-gold">Check Availability</Link>
                    <Link href="/experiences" className="btn-outline">Explore Experiences</Link>
                </div>
            </section>
        </div>
    );
}
