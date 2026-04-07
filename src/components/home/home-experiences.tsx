"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "@/lib/gsap";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";

const exps = [
    { id:"01", cat:"On the Water", title:"Surf Weligama Bay", img:"https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1400&q=85&auto=format&fit=crop", desc:"Long, forgiving waves make Weligama one of Sri Lanka's finest surf spots. Boards and lessons just steps from the villa." },
    { id:"02", cat:"Wildlife",     title:"Blue Whale Watching", img:"https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1400&q=85&auto=format&fit=crop", desc:"December to April, blue whales and sperm whales pass Mirissa coast — 15 minutes from Villa 76." },
    { id:"03", cat:"Culture",      title:"Galle Fort",          img:"https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1400&q=85&auto=format&fit=crop", desc:"A UNESCO World Heritage site 30 km away. Portuguese walls, Dutch architecture, boutique galleries, and coastal cafés." },
    { id:"04", cat:"Adventure",    title:"Coastal Cycling",     img:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=85&auto=format&fit=crop", desc:"Borrow a villa bike and trace the palm-lined coast south to Mirissa or north to Unawatuna. Sri Lanka at your pace." },
];

export const HomeExperiences = () => {
    const s    = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".exp-heading-w", { yPercent: 110 }, {
                yPercent: 0, stagger: 0.05, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".exp-head", start: "top 82%" },
            });
        }, s);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={s} className="relative py-28 lg:py-40 bg-[#071220] overflow-hidden">
            <div className="orb orb-gold w-[500px] h-[500px] top-0 left-0 opacity-20" />

            <div className="px-8 lg:px-14 max-w-[1600px] mx-auto">
                <div className="exp-head flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
                    <div>
                        <div className="label mb-6">Experiences</div>
                        <h2 className="display text-[7vw] lg:text-[4.8vw] font-light leading-[1.05] text-[#EAE6DE]">
                            {["Life Beyond", "the Villa"].map((line, li) => (
                                <span key={li} className="block overflow-hidden">
                  {line.split(" ").map((w, wi) => (
                      <span key={wi} className="inline-block overflow-hidden mr-[.3em]">
                      <span className="exp-heading-w inline-block">{li === 1 && wi === 1 ? <em className="italic text-[#C9A96E]">{w}</em> : w}</span>
                    </span>
                  ))}
                </span>
                            ))}
                        </h2>
                    </div>
                    <Link href="/experiences" className="btn-outline hidden lg:inline-flex">All Experiences</Link>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1fr] border border-[#1C3B58]/40 overflow-hidden">
                    {/* List */}
                    <div className="divide-y divide-[#1C3B58]/30">
                        {exps.map((e, i) => (
                            <div key={e.id} onMouseEnter={() => setActive(i)}
                                 className={`px-8 py-8 cursor-pointer transition-colors duration-300 ${active === i ? "bg-[#0C1E33]" : "hover:bg-[#0C1E33]/50"}`} data-cursor>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/50 mb-2">{e.cat}</p>
                                        <h3 className={`display text-2xl lg:text-3xl font-light transition-colors duration-300 ${active === i ? "text-[#C9A96E]" : "text-[#EAE6DE]/65"}`}>{e.title}</h3>
                                        <AnimatePresence>
                                            {active === i && (
                                                <motion.p key="d" initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                                                          transition={{ duration:.3 }} className="ui text-[12px] leading-[1.8] text-[#A8A399] mt-3 overflow-hidden max-w-sm">{e.desc}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <span className={`display text-5xl font-light leading-none transition-colors ${active === i ? "text-[#C9A96E]/30" : "text-[#1C3B58]"}`}>{e.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image panel */}
                    <div className="hidden lg:block relative min-h-[480px]">
                        <AnimatePresence mode="wait">
                            <motion.img key={active} src={exps[active].img} alt={exps[active].title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{ opacity:0, scale:1.06 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.97 }}
                                        transition={{ duration:.65, ease:[.25,.46,.45,.94] }} />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#071220]/30 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
