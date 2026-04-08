"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "@/lib/gsap";
import {AnimatePresence, motion} from "framer-motion";
import {PageHero} from "@/components/ui/page-hero";

const cats = ["All", "Villa & Rooms", "Beach & Ocean", "Dining", "Surroundings"];

const photos = [
    { src:"https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=90&auto=format&fit=crop", cat:"Beach & Ocean",   alt:"Weligama Bay golden hour",          cls:"col-span-2 row-span-2" },
    { src:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85&auto=format&fit=crop", cat:"Villa & Rooms",  alt:"Ocean Suite interior",              cls:"" },
    { src:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop", cat:"Villa & Rooms",  alt:"Garden Retreat bedroom",            cls:"" },
    { src:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85&auto=format&fit=crop", cat:"Beach & Ocean",   alt:"Weligama beach at sunset",          cls:"col-span-2" },
    { src:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop", cat:"Dining",         alt:"Private chef table setting",        cls:"" },
    { src:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=85&auto=format&fit=crop", cat:"Dining",         alt:"Terrace breakfast spread",          cls:"" },
    { src:"https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1200&q=85&auto=format&fit=crop", cat:"Surroundings",   alt:"Surfing Weligama Bay",              cls:"" },
    { src:"https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&q=85&auto=format&fit=crop", cat:"Surroundings",   alt:"Galle Fort ramparts",               cls:"" },
    { src:"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=85&auto=format&fit=crop", cat:"Villa & Rooms",  alt:"Beach Bungalow patio",              cls:"" },
    { src:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85&auto=format&fit=crop", cat:"Dining",         alt:"Surfer Rooftop Bar",                cls:"" },
    { src:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=85&auto=format&fit=crop", cat:"Surroundings",   alt:"Sri Lankan wildlife",               cls:"" },
    { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop", cat:"Beach & Ocean",   alt:"South coast coastline",             cls:"col-span-2" },
    { src:"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=85&auto=format&fit=crop", cat:"Villa & Rooms",  alt:"Villa spa & wellness",              cls:"" },
    { src:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=85&auto=format&fit=crop", cat:"Surroundings",   alt:"Coastal cycling route",             cls:"" },
];

export const GalleryPage = () => {
    const [filter, setFilter]   = useState("All");
    const [light, setLight]     = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const filtered = filter === "All" ? photos : photos.filter(p => p.cat === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".gp-item", { opacity: 0, y: 40, scale: 0.96 }, {
                opacity: 1, y: 0, scale: 1, stagger: { amount: 0.6 }, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: ".gp-grid", start: "top 82%" },
            });
        }, ref);
        return () => ctx.revert();
    }, [filter]);

    // Keyboard nav for lightbox
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (light === null) return;
            if (e.key === "Escape") setLight(null);
            if (e.key === "ArrowRight") setLight(l => l !== null ? (l + 1) % filtered.length : null);
            if (e.key === "ArrowLeft")  setLight(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null);
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [light, filtered.length]);

    return (
        <div ref={ref}>
            <PageHero
                label="Gallery"
                title="Life at Villa 76"
                sub="A visual journal of the villa, the bay, and the southern coast of Sri Lanka."
                img="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2000&q=90&auto=format&fit=crop"
            />

            <section className="py-20 px-8 lg:px-14 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    {/* Filter */}
                    <div className="flex flex-wrap gap-3 mb-14">
                        {cats.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                    className={`px-5 py-2 ui text-[10px] tracking-[.2em] uppercase border transition-all duration-300 ${filter===c ? "bg-[#C9A96E] text-[#04090F] border-[#C9A96E]" : "border-[#1C3B58]/60 text-[#A8A399]/55 hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Masonry grid */}
                    <motion.div layout className="gp-grid grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[240px]">
                        <AnimatePresence>
                            {filtered.map((p, i) => (
                                <motion.div key={p.src} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className={`gp-item group relative overflow-hidden cursor-pointer ${p.cls}`}
                                            onClick={() => setLight(i)} data-cursor>
                                    <img src={p.src} alt={p.alt}
                                         className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.08]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]">
                                        <p className="ui text-[9px] tracking-[.2em] uppercase text-[#C9A96E] mb-1">{p.cat}</p>
                                        <p className="ui text-[12px] text-[#EAE6DE]/80">{p.alt}</p>
                                    </div>
                                    {/* Zoom icon */}
                                    <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white/60 text-xs">⊕</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {light !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[800] bg-[#04090F]/97 flex items-center justify-center"
                                onClick={() => setLight(null)}>
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [.25,.46,.45,.94] }}
                                    className="relative max-w-[90vw] max-h-[85vh]"
                                    onClick={e => e.stopPropagation()}>
                            <img src={filtered[light].src} alt={filtered[light].alt}
                                 className="max-w-full max-h-[80vh] object-contain" />
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#04090F]/80 to-transparent">
                                <p className="ui text-[10px] tracking-[.2em] uppercase text-[#C9A96E]">{filtered[light].cat}</p>
                                <p className="ui text-[13px] text-[#EAE6DE]/70">{filtered[light].alt}</p>
                            </div>
                            {/* Nav arrows */}
                            <button onClick={() => setLight(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null)}
                                    className="absolute left-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 border border-[#1C3B58] text-[#5B9BB5] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center">←</button>
                            <button onClick={() => setLight(l => l !== null ? (l + 1) % filtered.length : null)}
                                    className="absolute right-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 border border-[#1C3B58] text-[#5B9BB5] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center">→</button>
                            {/* Close */}
                            <button onClick={() => setLight(null)}
                                    className="absolute -top-10 right-0 ui text-[11px] tracking-[.2em] uppercase text-[#A8A399]/60 hover:text-[#C9A96E] transition-colors">Close ×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
