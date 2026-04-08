"use client";

/* ─── Marquee Strip ───────────────────────────────────── */
export const HomeMarquee = ()=> {
    const items = ["Beachfront Living","·","Three Private Suites","·","80m from the Bay","·","Rated 9.4 / 10","·","Weligama Bay","·","Indian Ocean","·","Private Chef Available","·","Watersports","·","UNESCO Galle Fort","·"];
    return (
        <div className="overflow-hidden border-y border-[#1C3B58]/35 bg-[#071220] py-5">
            <div className="marq-track">
                {[...items,...items].map((t,i) => (
                    <span key={i} className={`px-5 whitespace-nowrap ui text-[11px] tracking-[.22em] uppercase ${t==="·"?"text-[#C9A96E] text-xs":"text-[#A8A399]/50"}`}>{t}</span>
                ))}
            </div>
        </div>
    );
}
