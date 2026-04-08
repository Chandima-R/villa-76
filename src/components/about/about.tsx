"use client";
import {useEffect, useRef} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {PageHero} from "@/components/ui/page-hero";
import Link from "next/link";

const timeline = [
    { year: "2018", title: "The Villa Opens", text: "Villa 76 welcomes its first guests — three families who fell in love with the quiet stretch of beach at Kapparatota and asked if they could come back the following year." },
    { year: "2020", title: "A Private Retreat", text: "Fully refurbished with new en-suite bathrooms in every room, a redesigned communal terrace, and an expanded kitchen. The villa takes shape as a true home-away-from-home." },
    { year: "2022", title: "Rated 9.4 / 10", text: "Over 18 verified guest reviews on Booking.com push the villa to a 9.4 rating — placing it among the top-rated properties on the entire Weligama stretch." },
    { year: "2024", title: "Coastal Concierge", text: "We launch a bespoke concierge service — private chefs, surf lessons, whale watching arrangements, and airport transfers — making Villa 76 a full-service sanctuary." },
];

const proximity = [
    { place: "Weligama Beach",    dist: "80 m",    dir: "Walking" },
    { place: "Weligama Town",     dist: "2 km",    dir: "5 min drive" },
    { place: "Taprobane Island",  dist: "3 km",    dir: "10 min drive" },
    { place: "Mirissa",           dist: "7 km",    dir: "15 min drive" },
    { place: "Koggala Airport",   dist: "17 km",   dir: "25 min drive" },
    { place: "Galle Fort",        dist: "30 km",   dir: "40 min drive" },
    { place: "Yala National Park",dist: "150 km",  dir: "2.5 hr drive" },
];

export const AboutPage = ()=> {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro statement words
            const words = splitWords(document.querySelector<HTMLElement>(".ab-quote")!);
            gsap.fromTo(words, { opacity: 0.12, yPercent: 70 }, {
                opacity: 1, yPercent: 0, stagger: 0.035, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".ab-quote", start: "top 82%" },
            });

            // Timeline items
            gsap.fromTo(".tl-item", { opacity: 0, x: -50 }, {
                opacity: 1, x: 0, stagger: 0.14, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: ".ab-timeline", start: "top 80%" },
            });

            // Proximity rows
            gsap.fromTo(".prox-row", { opacity: 0, x: 40 }, {
                opacity: 1, x: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".ab-prox", start: "top 82%" },
            });

            // Full-bleed image clip
            gsap.fromTo(".ab-img-clip", { clipPath: "inset(0 100% 0 0)" }, {
                clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.inOut",
                scrollTrigger: { trigger: ".ab-img-clip", start: "top 78%" },
            });
            gsap.fromTo(".ab-img-inner", { scale: 1.14 }, {
                scale: 1, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: ".ab-img-clip", start: "top 78%" },
            });

            // Horizontal scroll text
            gsap.fromTo(".ab-scroll-text", { x: "0%" }, {
                x: "-25%", ease: "none",
                scrollTrigger: { trigger: ".ab-scroll-wrap", start: "top bottom", end: "bottom top", scrub: true },
            });

            // Stats
            gsap.fromTo(".ab-stat", { opacity: 0, y: 35 }, {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
                scrollTrigger: { trigger: ".ab-stats", start: "top 84%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref}>
            <PageHero
                label="Our Story & Location"
                title="Where the Ocean"
                titleItalic="Is Home"
                sub="Villa 76 is a privately managed beachside property in Kapparatota, Weligama — where the pace of life slows with the tide."
                img="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2000&q=88&auto=format&fit=crop"
            />

            {/* Scrolling marquee band */}
            <div className="ab-scroll-wrap overflow-hidden bg-[#071220] border-y border-[#1C3B58]/30 py-5">
        <span className="ab-scroll-text display text-[10vw] font-light whitespace-nowrap text-[#0C1E33] leading-none select-none"
              style={{ WebkitTextStroke: "1px rgba(201,169,110,.18)" }}>
          VILLA 76 · WELIGAMA · SOUTHERN COAST · SRI LANKA · INDIAN OCEAN ·
        </span>
            </div>

            {/* Quote statement */}
            <section className="py-28 lg:py-44 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
                <div className="orb orb-ocean w-[700px] h-[700px] top-0 right-0 opacity-20" />
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-28 items-center">
                    <h2 className="ab-quote display text-[4.8vw] lg:text-[3.4vw] font-light leading-[1.22] text-[#EAE6DE] perspective-[700px]"
                        style={{ perspective: "700px" }}>
                        {"An intimate retreat for those who believe the best days begin with bare feet on warm sand and end with the sound of the ocean outside an open window."}
                    </h2>
                    <div className="flex flex-col gap-8">
                        <p className="ui text-[14px] leading-[1.95] text-[#A8A399]">
                            Villa 76 is not a hotel. It is a three-bedroom private villa, managed personally and maintained to an exacting standard, that has become a quiet favourite on Sri Lanka's southern coast.
                        </p>
                        <p className="ui text-[14px] leading-[1.95] text-[#A8A399]">
                            From the sunbathing terrace to the spacious communal kitchen — every element of the property has been designed to feel like a home that happens to sit 80 metres from one of the most beautiful bays in the Indian Ocean.
                        </p>
                        <div className="ab-stats grid grid-cols-3 gap-5 pt-6 border-t border-[#1C3B58]/40">
                            {[{ n:"2018", l:"Est." },{ n:"9.4", l:"Rating" },{ n:"3", l:"Suites" }].map(s => (
                                <div key={s.l} className="ab-stat">
                                    <span className="display text-[44px] font-light text-[#C9A96E] block leading-none mb-1">{s.n}</span>
                                    <span className="ui text-[9px] tracking-[.22em] uppercase text-[#A8A399]/50">{s.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-bleed image */}
            <section className="px-8 lg:px-14 pb-0 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="ab-img-clip overflow-hidden aspect-[21/9]">
                        <div className="ab-img-inner w-full h-full">
                            <img
                                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=2400&q=88&auto=format&fit=crop"
                                alt="Weligama Bay"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-28 lg:py-40 px-8 lg:px-14 bg-[#04090F]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="label mb-14">Villa History</div>
                    <div className="ab-timeline grid lg:grid-cols-4 gap-0">
                        {timeline.map((t, i) => (
                            <div key={t.year}
                                 className={`tl-item relative pl-6 pb-10 lg:pb-0 lg:pr-10 border-l lg:border-l-0 lg:border-t border-[#1C3B58]/40 ${i < 3 ? "lg:border-r-0" : ""}`}>
                                {/* Dot */}
                                <div className="absolute -left-[5px] top-0 lg:left-0 lg:-top-[5px] w-[9px] h-[9px] rounded-full bg-[#C9A96E] border-2 border-[#04090F]" />
                                <span className="display text-5xl font-light text-[#C9A96E]/20 block mb-2 mt-4 lg:mt-6">{t.year}</span>
                                <h3 className="display text-xl font-light text-[#EAE6DE] mb-3">{t.title}</h3>
                                <p className="ui text-[12px] leading-[1.85] text-[#A8A399]/65">{t.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location section */}
            <section className="py-28 lg:py-40 px-8 lg:px-14 bg-[#071220] overflow-hidden">
                <div className="orb orb-gold w-[500px] h-[500px] bottom-0 left-0 opacity-18" />
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28">
                    <div>
                        <div className="label mb-8">Location</div>
                        <h2 className="display text-[5.5vw] lg:text-[3.8vw] font-light leading-[1.1] text-[#EAE6DE] mb-8"
                            style={{ fontFamily: "var(--font-display)" }}>
                            Everything within reach, nothing in the way.
                        </h2>
                        <p className="ui text-[14px] leading-[1.9] text-[#A8A399] mb-10">
                            Villa 76 sits in the quiet residential lane of Kapparatota — away from the noise of the main town but within 5 minutes of everything Weligama offers. The beach is an 80-metre walk. The world-famous surf break is visible from the terrace.
                        </p>
                        <div className="flex flex-col gap-2 mb-10">
                            <p className="ui text-[11px] tracking-[.2em] uppercase text-[#C9A96E]/50 mb-2">Full Address</p>
                            <p className="ui text-[13px] text-[#A8A399]/70 leading-[1.8]">
                                No. 212, Sangananda Mawatha<br />
                                Kapparatota, Weligama<br />
                                Southern Province, Sri Lanka
                            </p>
                            <p className="display text-xl text-[#5B9BB5]/60 mt-2">6.0535° N, 80.4481° E</p>
                        </div>
                        <a href="https://maps.google.com/?q=Weligama+Sri+Lanka" target="_blank" rel="noopener noreferrer"
                           className="btn-outline inline-flex">Open in Google Maps →</a>
                    </div>

                    {/* Proximity table */}
                    <div className="ab-prox">
                        <div className="label mb-8">Getting Around</div>
                        <div className="divide-y divide-[#1C3B58]/25">
                            {proximity.map(p => (
                                <div key={p.place} className="prox-row flex items-center justify-between py-5">
                                    <div>
                                        <p className="ui text-[13px] text-[#EAE6DE]/75">{p.place}</p>
                                        <p className="ui text-[11px] text-[#A8A399]/40">{p.dir}</p>
                                    </div>
                                    <span className="display text-2xl font-light text-[#C9A96E]">{p.dist}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map embed placeholder */}
            <section className="bg-[#04090F] px-8 lg:px-14 pb-0">
                <div className="max-w-[1600px] mx-auto">
                    <div className="relative aspect-[21/8] overflow-hidden border border-[#1C3B58]/30">
                        <img
                            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2000&q=70&auto=format&fit=crop"
                            alt="Weligama Bay aerial"
                            className="w-full h-full object-cover opacity-35"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <span className="display text-[5vw] font-light text-[#EAE6DE]/60" style={{ fontFamily: "var(--font-display)" }}>
                6.0535° N — 80.4481° E
              </span>
                            <span className="ui text-[10px] tracking-[.35em] uppercase text-[#C9A96E]/50">
                Kapparatota · Weligama · Sri Lanka
              </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-8 lg:px-14 bg-[#04090F] text-center">
                <h2 className="display text-[4.5vw] lg:text-[3vw] font-light text-[#EAE6DE] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}>
                    Come and See for Yourself
                </h2>
                <p className="ui text-[13px] text-[#A8A399] max-w-md mx-auto mb-10">
                    The best way to understand Villa 76 is to arrive, unpack once, and let the ocean do the rest.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link href="/contact" className="btn-gold">Reserve a Suite</Link>
                    <Link href="/accommodation" className="btn-outline">View Suites</Link>
                </div>
            </section>
        </div>
    );
}
