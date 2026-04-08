"use client";
import {useEffect, useRef, useState} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {AnimatePresence, motion} from "framer-motion";
import {PageHero} from "@/components/ui/page-hero";
import Link from "next/link";

const categories = ["All", "On the Water", "Wildlife", "Culture", "Adventure", "Wellness"];

const experiences = [
    { id:"01", cat:"On the Water", title:"Surf Weligama Bay", duration:"Half Day", distance:"Steps Away", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1200&q=85&auto=format&fit=crop",
        desc:"Weligama Bay's long, forgiving break is Sri Lanka's most famous beginner surf spot. Multiple schools operate from the beach, and once you're comfortable, stronger breaks await at Midigama just 5 km east. Boards available through the villa.",
        includes:["Surfboard & leash hire","Recommended instructors","Post-surf rinse area","Local route tips"],
    },
    { id:"02", cat:"Wildlife", title:"Blue Whale Watching", duration:"Full Day", distance:"15 min drive", season:"Nov – Apr",
        img:"https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200&q=85&auto=format&fit=crop",
        desc:"Between December and April, Mirissa Harbour is one of the world's best locations for blue whale and sperm whale encounters. The deep ocean shelf drops steeply near the shore, bringing giants within reach of a morning boat trip.",
        includes:["Operator referrals","Early morning departure","Packed breakfast arranged","Marine-friendly operators only"],
    },
    { id:"03", cat:"Culture", title:"Galle Fort", duration:"Full Day", distance:"30 km", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&q=85&auto=format&fit=crop",
        desc:"A UNESCO World Heritage Site just 30 km away. The fort's Portuguese-built ramparts, Dutch colonial streets, boutique galleries, jewellery workshops, and waterfront cafés make for a full and endlessly absorbing day out.",
        includes:["Villa car & driver arranged","Walking map provided","Lunch recommendations","Sunset walk on the ramparts"],
    },
    { id:"04", cat:"Adventure", title:"Coastal Cycling", duration:"Half Day", distance:"Villa → Mirissa", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=85&auto=format&fit=crop",
        desc:"Borrow one of Villa 76's bicycles and trace the palm-lined coastal road south toward Mirissa or north toward Unawatuna. Stop for a coconut at a roadside stall, dip at a hidden cove, and return at your own pace.",
        includes:["Bicycle hire included","Route maps provided","Picnic lunch arranged","Support if needed"],
    },
    { id:"05", cat:"Wildlife", title:"Taprobane Island Visit", duration:"Half Day", distance:"10 min drive", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop",
        desc:"One of Sri Lanka's most romantic private islands, Taprobane sits just 100 metres offshore. Admire it from the sand, wade across at low tide, or arrange a private viewing through our concierge. A truly unique piece of the island's landscape.",
        includes:["Private viewing on request","Photography walk","Guided wade across at low tide","Local history story"],
    },
    { id:"06", cat:"Wellness", title:"Yoga on the Terrace", duration:"1 Hour", distance:"At the Villa", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop",
        desc:"Begin each morning with a private yoga session on Villa 76's open-air terrace, guided by a visiting instructor with the sound of the ocean as your backdrop. Hatha, Vinyasa, or restorative — tailored to your level.",
        includes:["Private instructor arranged","All equipment provided","Morning or sunset sessions","Meditation available"],
    },
    { id:"07", cat:"Culture", title:"Yala National Park", duration:"Full Day", distance:"2.5 hr drive", season:"Feb – Jul peak",
        img:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=85&auto=format&fit=crop",
        desc:"Sri Lanka's most celebrated wildlife reserve is a 2.5-hour drive east. Yala holds one of the world's highest densities of leopards, plus elephants, crocodiles, peacocks, and an extraordinary variety of birdlife.",
        includes:["Private jeep & guide arranged","Early 5 AM departure","Picnic breakfast","Park entry arranged"],
    },
    { id:"08", cat:"Wellness", title:"Ayurvedic Spa", duration:"1–3 Hours", distance:"In-villa or nearby", season:"Year-Round",
        img:"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=85&auto=format&fit=crop",
        desc:"Sri Lankan Ayurveda is among the most authentic in Asia. We arrange professional therapists to visit the villa for traditional oil massages, herbal treatments, and Shirodhara sessions — or direct you to trusted spas in town.",
        includes:["In-villa therapist available","Traditional Ayurvedic oils","Shirodhara & massage","Post-treatment tea ritual"],
    },
];

function ExpCard({ e }: { e: typeof experiences[0] }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div layout className="border border-[#1C3B58]/35 bg-[#0C1E33] overflow-hidden group" data-cursor>
            <div className="relative aspect-[16/9] overflow-hidden">
                <img src={e.img} alt={e.title}
                     className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E33] via-transparent to-transparent" />
                <div className="absolute top-5 left-5 flex gap-2">
                    <span className="float-card px-3 py-[5px] ui text-[8px] tracking-[.2em] uppercase text-[#C9A96E]">{e.cat}</span>
                </div>
                <span className="absolute top-5 right-5 display text-[52px] font-light text-white/10 leading-none">{e.id}</span>
            </div>

            <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="display text-2xl font-light text-[#EAE6DE] leading-tight">{e.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                    {[e.duration, e.distance, e.season].map(t => (
                        <span key={t} className="ui text-[9px] tracking-[.15em] uppercase text-[#5B9BB5]/60 border border-[#1C3B58]/60 px-2 py-[3px]">{t}</span>
                    ))}
                </div>
                <p className="ui text-[12px] leading-[1.8] text-[#A8A399] mb-5 line-clamp-3">{e.desc}</p>

                <button onClick={() => setOpen(!open)}
                        className="ui text-[10px] tracking-[.2em] uppercase text-[#C9A96E] gold-hover flex items-center gap-2 mb-4">
                    <span>{open ? "Less" : "Includes"}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-base leading-none">+</motion.span>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                   transition={{ duration: 0.3 }} className="overflow-hidden flex flex-col gap-[6px] mb-4">
                            {e.includes.map(inc => (
                                <li key={inc} className="flex items-center gap-2 ui text-[11px] text-[#A8A399]/65">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A96E]/50 flex-shrink-0" />
                                    {inc}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                <Link href="/contact" className="ui text-[10px] tracking-[.2em] uppercase text-[#C9A96E] gold-hover flex items-center gap-2">
                    Arrange This <span>→</span>
                </Link>
            </div>
        </motion.div>
    );
}

export const ExperiencesPage = () => {
    const [filter, setFilter] = useState("All");
    const ref = useRef<HTMLDivElement>(null);
    const filtered = filter === "All" ? experiences : experiences.filter(e => e.cat === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = splitWords(document.querySelector<HTMLHeadingElement>(".exp-intro-h")!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".exp-intro-h", start: "top 82%" },
            });
            gsap.fromTo(".exp-cat-btn", { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, stagger: 0.07, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: ".exp-cats", start: "top 85%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref}>
            <PageHero
                label="Experiences"
                title="Life Beyond"
                titleItalic="the Villa"
                sub="Weligama and Sri Lanka's southern coast offer more than just a beach. Here is your guide to the very best of it."
                img="https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=2000&q=88&auto=format&fit=crop"
            />

            {/* Intro */}
            <section className="py-24 lg:py-32 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
                <div className="orb orb-ocean w-[700px] h-[700px] top-0 right-0 opacity-25" />
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="exp-intro-h display text-[5vw] lg:text-[3.5vw] font-light leading-[1.2] text-[#EAE6DE] max-w-4xl mb-16 perspective-[600px]" style={{ perspective: "600px" }}>
                        {"From morning surf sessions to whale watching at dawn, from ancient forts to wild leopard safaris — the south coast is astonishing."}
                    </h2>

                    {/* Category filter */}
                    <div className="exp-cats flex flex-wrap gap-3">
                        {categories.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                    className={`exp-cat-btn px-5 py-2 ui text-[10px] tracking-[.2em] uppercase transition-all duration-300 border ${filter === c ? "bg-[#C9A96E] text-[#04090F] border-[#C9A96E]" : "border-[#1C3B58]/60 text-[#A8A399]/60 hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience grid */}
            <section className="pb-24 px-8 lg:px-14 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <AnimatePresence>
                            {filtered.map(e => (
                                <motion.div key={e.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                                    <ExpCard e={e} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Season guide */}
            <section className="py-20 px-8 lg:px-14 bg-[#071220]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="label mb-10">Best Times to Visit</div>
                    <div className="grid lg:grid-cols-4 gap-5">
                        {[
                            { s:"Dec – Apr", h:"Peak Season", d:"Whale watching, calm seas, perfect surf conditions. The best all-round window." },
                            { s:"May – Jul", h:"Yala Season", d:"Leopard and elephant sightings peak at Yala. Surf conditions remain good." },
                            { s:"Aug – Oct", h:"Quiet Season", d:"Fewer visitors, lower rates. Occasional rain but warm and lush." },
                            { s:"Nov", h:"Shoulder", d:"Transition period. Excellent value, improving conditions from mid-month." },
                        ].map(s => (
                            <div key={s.s} className="float-card p-7 border border-[#1C3B58]/30">
                                <p className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55 mb-2">{s.s}</p>
                                <h4 className="display text-2xl font-light text-[#EAE6DE] mb-3">{s.h}</h4>
                                <p className="ui text-[12px] leading-[1.8] text-[#A8A399]/65">{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-8 lg:px-14 bg-[#04090F] text-center">
                <h2 className="display text-[4vw] lg:text-[2.8vw] font-light text-[#EAE6DE] mb-6">Let Us Curate Your Experience</h2>
                <p className="ui text-[13px] text-[#A8A399] max-w-md mx-auto mb-8">Tell us what you love — adventure, culture, or relaxation. We'll build your perfect southern Sri Lanka itinerary.</p>
                <Link href="/contact" className="btn-gold">Start Planning</Link>
            </section>
        </div>
    );
}
