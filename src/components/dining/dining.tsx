"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {PageHero} from "@/components/ui/page-hero";
import Link from "next/link";

const diningFeatures = [
    {
        n: "01", title: "Private Chef Experience",
        sub: "Market-fresh · Ocean-to-Table",
        desc: "Arrange your own private chef for evenings at the villa. Our curated network of local chefs will design a menu around your preferences — Sri Lankan classics, fresh-caught seafood, or international cuisine. Ingredients are sourced from Weligama market that morning.",
        img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=88&auto=format&fit=crop",
        detail: ["Available nightly · 24hr notice required", "3-course to 7-course formats", "Dietary requirements catered", "Wine pairing available"],
    },
    {
        n: "02", title: "Sunrise Terrace Breakfast",
        sub: "Daily · Curated & Inclusive",
        desc: "Each morning begins on the villa's sun-drenched terrace with a spread of tropical fruits, fresh bread, Sri Lankan hoppers, eggs, local jams, and freshly brewed Ceylon tea or coffee. A ritual as much as a meal — the perfect start before the beach.",
        img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1400&q=88&auto=format&fit=crop",
        detail: ["Served 7:30 AM – 10:00 AM", "Full Sri Lankan & continental options", "Bespoke dietary menus", "Terrace or in-room service"],
    },
    {
        n: "03", title: "Self-Catering Kitchen",
        sub: "Fully Equipped · Always Available",
        desc: "The villa's communal kitchen is stocked and equipped for serious home cooking — oven, blender, kettle, full refrigeration, and high-quality cookware. The Weligama fish market is a 5-minute drive. The setup is everything you need to cook like a local.",
        img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=88&auto=format&fit=crop",
        detail: ["Full oven, hob & microwave", "Blender · Toaster · Kettle", "Crockery & high-quality cookware", "Grocery delivery on request"],
    },
    {
        n: "04", title: "The Surfer Rooftop Bar",
        sub: "200 Metres Away · European & Seafood",
        desc: "Walk 200 metres and you're at The Surfer Rooftop Restaurant & Bar — a sweeping open-air terrace above Weligama Bay. European-influenced seafood menus, fresh cocktails, and uninterrupted ocean views make it the perfect spot for sundowners or dinner.",
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&q=88&auto=format&fit=crop",
        detail: ["European & Sri Lankan seafood menus", "Open daily from 11 AM", "Sunset cocktail hour", "Reservations recommended in season"],
    },
];

function DiningFeature({ f, i }: { f: typeof diningFeatures[0]; i: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isEven = i % 2 === 0;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(`.df-img-${i}`, { clipPath: "inset(0 100% 0 0)" }, {
                clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut",
                scrollTrigger: { trigger: ref.current, start: "top 78%" },
            });
            gsap.fromTo(`.df-inn-${i}`, { scale: 1.14 }, {
                scale: 1, duration: 1.4, ease: "power4.out",
                scrollTrigger: { trigger: ref.current, start: "top 78%" },
            });
            gsap.fromTo(`.df-txt-${i}`, { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
        }, ref);
        return () => ctx.revert();
    }, [i]);

    return (
        <div ref={ref} className={`grid lg:grid-cols-2 gap-0 border border-[#1C3B58]/25 overflow-hidden mb-5`}>
            {/* Image */}
            <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] ${!isEven ? "lg:order-2" : ""}`}>
                <div className={`df-img-${i} w-full h-full overflow-hidden`}>
                    <div className={`df-inn-${i} w-full h-full`}>
                        <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090F]/50 to-transparent" />
                <span className="absolute top-6 left-6 display text-[70px] font-light text-white/10 leading-none">{f.n}</span>
            </div>

            {/* Text */}
            <div className={`df-txt-${i} bg-[#0C1E33] flex flex-col justify-center p-9 lg:p-12`}>
                <p className="ui text-[9px] tracking-[.28em] uppercase text-[#5B9BB5]/60 mb-3">{f.sub}</p>
                <h3 className="display text-[32px] lg:text-[40px] font-light text-[#EAE6DE] leading-[1.05] mb-6">{f.title}</h3>
                <p className="ui text-[13px] leading-[1.9] text-[#A8A399] mb-8">{f.desc}</p>
                <ul className="flex flex-col gap-2">
                    {f.detail.map(d => (
                        <li key={d} className="flex items-center gap-3 ui text-[12px] text-[#A8A399]/65">
                            <span className="w-[5px] h-[1px] bg-[#C9A96E]/60 flex-shrink-0" />
                            {d}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const DiningPage = ()=> {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = splitWords(document.querySelector<HTMLHeadingElement>(".din-intro-h")!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".din-intro-h", start: "top 82%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref}>
            <PageHero
                label="Dining & Flavour"
                title="Coastal Cuisine,"
                titleItalic="Your Way"
                sub="From private chef evenings to sunrise terrace breakfasts and rooftop sundowners — every meal at Villa 76 is designed to be savoured."
                img="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2000&q=88&auto=format&fit=crop"
            />

            {/* Intro statement */}
            <section className="py-24 lg:py-36 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
                <div className="orb orb-gold w-[500px] h-[500px] top-0 left-0 opacity-20" />
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <h2 className="din-intro-h display text-[5vw] lg:text-[3.5vw] font-light leading-[1.2] text-[#EAE6DE] perspective-[600px]" style={{ perspective: "600px" }}>
                        {"Food in Weligama is an experience. At Villa 76, we make sure you savour every last bite of it."}
                    </h2>
                    <div className="flex flex-col gap-5">
                        <p className="ui text-[14px] leading-[1.9] text-[#A8A399]">Whether you choose to cook in the fully equipped kitchen with market-fresh ingredients, arrange a private chef for the evening, or simply walk 200 metres to one of Weligama's finest rooftop restaurants — the flavours of Sri Lanka's southern coast are always within reach.</p>
                        <div className="grid grid-cols-2 gap-0 border border-[#1C3B58]/30">
                            {[["Private Chef", "On Request"], ["Breakfast", "Daily Inclusive"], ["Kitchen", "Fully Equipped"], ["Nearby Bar", "200 Metres"]].map(([l,v]) => (
                                <div key={l} className="px-6 py-5 border-r border-b border-[#1C3B58]/20">
                                    <p className="ui text-[9px] tracking-[.22em] uppercase text-[#C9A96E]/55 mb-1">{l}</p>
                                    <p className="display text-xl font-light text-[#EAE6DE]">{v}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining features */}
            <section className="pb-24 px-8 lg:px-14 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    {diningFeatures.map((f, i) => <DiningFeature key={f.n} f={f} i={i} />)}
                </div>
            </section>

            {/* Nearby restaurants strip */}
            <section className="py-20 px-8 lg:px-14 bg-[#071220]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="label mb-10">Nearby Favourites</div>
                    <div className="grid lg:grid-cols-3 gap-5">
                        {[
                            { name:"The Surfer Rooftop", dist:"200m", type:"Seafood & European", note:"Best sunset views in Weligama" },
                            { name:"Weligama Bay Beach", dist:"5 min walk", type:"Street Food & Cafés", note:"Local kottu, hoppers, fresh coconut" },
                            { name:"Mirissa Restaurants", dist:"15 min drive", type:"International & Sri Lankan", note:"Seafood-heavy menus, beachfront dining" },
                        ].map(r => (
                            <div key={r.name} className="float-card p-7 border border-[#1C3B58]/30">
                                <p className="ui text-[9px] tracking-[.22em] uppercase text-[#5B9BB5]/50 mb-2">{r.dist} · {r.type}</p>
                                <h4 className="display text-2xl font-light text-[#EAE6DE] mb-2">{r.name}</h4>
                                <p className="ui text-[12px] text-[#A8A399]/60">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-8 lg:px-14 bg-[#04090F] text-center">
                <h2 className="display text-[4.5vw] lg:text-[3vw] font-light text-[#EAE6DE] mb-8">Arrange Your Private Chef</h2>
                <p className="ui text-[13px] text-[#A8A399] max-w-md mx-auto mb-8">Contact us 24 hours in advance and we'll arrange everything — menu, ingredients, presentation, and service.</p>
                <Link href="/contact" className="btn-gold">Make an Enquiry</Link>
            </section>
        </div>
    );
}
