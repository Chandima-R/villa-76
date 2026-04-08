"use client";
import {useEffect, useRef, useState} from "react";
import {gsap, splitWords} from "@/lib/gsap";
import {motion} from "framer-motion";
import {PageHero} from "@/components/ui/page-hero";

type FormData = {
    name: string; email: string; phone: string;
    checkin: string; checkout: string; guests: string;
    suite: string; requests: string;
};

const suites = ["No preference", "Ocean Suite (from $95)", "Garden Retreat (from $85)", "Beach Bungalow (from $75)", "Full Villa (all 3 suites)"];

export default function ContactPage() {
    const ref  = useRef<HTMLDivElement>(null);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState<FormData>({
        name:"", email:"", phone:"", checkin:"", checkout:"", guests:"2", suite:"No preference", requests:"",
    });

    const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm(f => ({ ...f, [k]: e.target.value }));

    const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = splitWords(document.querySelector<HTMLHeadingElement>(".ct-h2")!);
            gsap.fromTo(words, { opacity: 0.1, yPercent: 80 }, {
                opacity: 1, yPercent: 0, stagger: 0.04, duration: 1.0, ease: "power4.out",
                scrollTrigger: { trigger: ".ct-h2", start: "top 82%" },
            });
            gsap.fromTo(".ct-info-card", { opacity: 0, x: -40 }, {
                opacity: 1, x: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: ".ct-info", start: "top 82%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref}>
            <PageHero
                label="Reserve Your Stay"
                title="Begin Your"
                titleItalic="Weligama Story"
                sub="Three private suites · Direct beach access · Minimum 2-night stay. We respond within 24 hours."
                img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=88&auto=format&fit=crop"
            />

            {/* Intro */}
            <section className="py-24 lg:py-32 px-8 lg:px-14 bg-[#04090F] overflow-hidden">
                <div className="orb orb-gold  w-[500px] h-[500px] top-0  left-0   opacity-18" />
                <div className="orb orb-ocean w-[600px] h-[600px] bottom-0 right-0 opacity-22" />

                <div className="max-w-[1600px] mx-auto">
                    <h2 className="ct-h2 display text-[5vw] lg:text-[3.5vw] font-light leading-[1.2] text-[#EAE6DE] max-w-4xl mb-20 perspective-[600px]" style={{ perspective: "600px" }}>
                        {"Booking direct means better rates, personal attention, and a complimentary airport transfer from Koggala Airport."}
                    </h2>

                    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">

                        {/* Form */}
                        <div>
                            {sent ? (
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                            className="float-card p-12 border border-[#1C3B58]/30 text-center">
                                    <span className="display text-7xl text-[#C9A96E] block mb-5 leading-none">✓</span>
                                    <h3 className="display text-3xl font-light text-[#EAE6DE] mb-4">Enquiry Received</h3>
                                    <p className="ui text-[13px] leading-[1.85] text-[#A8A399]">
                                        Thank you, {form.name.split(" ")[0]}. We've received your reservation request and will confirm availability within 24 hours at <span className="text-[#C9A96E]">{form.email}</span>.
                                    </p>
                                    <p className="ui text-[11px] text-[#A8A399]/50 mt-6">No payment is required at this stage.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <h3 className="display text-3xl font-light text-[#EAE6DE] mb-2">Reservation Enquiry</h3>
                                    <p className="ui text-[12px] text-[#A8A399]/60 mb-4">All fields marked * are required. No payment needed at this stage.</p>

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Full Name *</label>
                                            <input required value={form.name} onChange={set("name")} placeholder="Your name" className="inp" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Email *</label>
                                            <input required type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" className="inp" />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex flex-col gap-2">
                                        <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Phone / WhatsApp</label>
                                        <input value={form.phone} onChange={set("phone")} placeholder="+1 000 000 0000" className="inp" />
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Check-in *</label>
                                            <input required type="date" value={form.checkin} onChange={set("checkin")} className="inp [color-scheme:dark]" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Check-out *</label>
                                            <input required type="date" value={form.checkout} onChange={set("checkout")} className="inp [color-scheme:dark]" />
                                        </div>
                                    </div>

                                    {/* Guests + Suite */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Guests *</label>
                                            <select value={form.guests} onChange={set("guests")} className="inp appearance-none">
                                                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Suite Preference</label>
                                            <select value={form.suite} onChange={set("suite")} className="inp appearance-none">
                                                {suites.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Special requests */}
                                    <div className="flex flex-col gap-2">
                                        <label className="ui text-[9px] tracking-[.25em] uppercase text-[#C9A96E]/55">Special Requests or Questions</label>
                                        <textarea value={form.requests} onChange={set("requests")} rows={4} placeholder="Dietary requirements, occasion, late arrival, airport transfer…" className="inp resize-none" />
                                    </div>

                                    <button type="submit" className="btn-gold w-full justify-center mt-2">Send Reservation Request</button>
                                    <p className="ui text-[11px] text-center text-[#A8A399]/35">We respond within 24 hours · No payment required now</p>
                                </form>
                            )}
                        </div>

                        {/* Info panel */}
                        <div className="ct-info flex flex-col gap-5">
                            <div className="ct-info-card float-card border border-[#1C3B58]/30 p-7">
                                <p className="label mb-5" style={{ fontSize:"9px" }}>Direct Booking Benefits</p>
                                {["Complimentary Koggala Airport transfer","Best available rate guaranteed","Priority suite selection","Packed lunches for day trips","Personal WhatsApp concierge","Flexible check-in window"].map(b => (
                                    <div key={b} className="flex items-center gap-3 mb-3 last:mb-0">
                                        <span className="w-1 h-1 rounded-full bg-[#C9A96E]/60 flex-shrink-0" />
                                        <p className="ui text-[12px] text-[#A8A399]/75">{b}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="ct-info-card float-card border border-[#1C3B58]/30 p-7">
                                <p className="label mb-5" style={{ fontSize:"9px" }}>Villa Details</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[["Check-in","2:00 PM"],["Check-out","12:00 PM"],["Min. Stay","2 nights"],["Payment","Cash on arrival"],["Suites","3 private rooms"],["Max Guests","6 guests"]].map(([l,v]) => (
                                        <div key={l}>
                                            <p className="ui text-[9px] tracking-[.18em] uppercase text-[#C9A96E]/45 mb-1">{l}</p>
                                            <p className="display text-lg font-light text-[#EAE6DE]">{v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ct-info-card float-card border border-[#1C3B58]/30 p-7">
                                <p className="label mb-5" style={{ fontSize:"9px" }}>Get in Touch</p>
                                <div className="flex flex-col gap-4">
                                    <a href="mailto:stay@villa76.lk" className="flex items-center gap-3 group">
                                        <span className="w-8 h-8 border border-[#1C3B58] flex items-center justify-center text-[#5B9BB5]/60 text-xs">@</span>
                                        <span className="ui text-[12px] text-[#A8A399]/70 group-hover:text-[#C9A96E] transition-colors gold-hover">stay@villa76.lk</span>
                                    </a>
                                    <a href="tel:+94771234567" className="flex items-center gap-3 group">
                                        <span className="w-8 h-8 border border-[#1C3B58] flex items-center justify-center text-[#5B9BB5]/60 text-xs">✆</span>
                                        <span className="ui text-[12px] text-[#A8A399]/70 group-hover:text-[#C9A96E] transition-colors gold-hover">+94 77 123 4567</span>
                                    </a>
                                    <div className="flex items-start gap-3">
                                        <span className="w-8 h-8 border border-[#1C3B58] flex items-center justify-center text-[#5B9BB5]/60 text-xs flex-shrink-0">⊕</span>
                                        <span className="ui text-[12px] text-[#A8A399]/50 leading-[1.7]">No. 212, Sangananda Mawatha,<br/>Kapparatota, Weligama, Sri Lanka</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map placeholder */}
                            <div className="ct-info-card border border-[#1C3B58]/30 overflow-hidden aspect-[16/9] relative">
                                <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=70&auto=format&fit=crop"
                                     alt="Weligama location" className="w-full h-full object-cover opacity-40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                    <span className="display text-3xl text-[#C9A96E] mb-2">6.0535° N</span>
                                    <span className="ui text-[10px] tracking-[.25em] uppercase text-[#A8A399]/55">Weligama Bay, Sri Lanka</span>
                                    <a href="https://maps.google.com/?q=Weligama+Sri+Lanka" target="_blank" rel="noopener noreferrer"
                                       className="mt-4 ui text-[9px] tracking-[.2em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-4 py-2 hover:bg-[#C9A96E]/10 transition-colors">
                                        Open in Maps →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
