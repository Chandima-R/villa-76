import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-[#04090F] relative overflow-hidden">
            {/* Orbs */}
            <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                 style={{ background: "radial-gradient(circle, rgba(91,155,181,.1) 0%, transparent 65%)", filter: "blur(100px)" }} />

            <div className="relative z-10">
        <span className="display text-[22vw] font-light text-[#071220] leading-none select-none block mb-0"
              style={{ fontFamily: "var(--font-display)", WebkitTextStroke: "1px rgba(201,169,110,.15)" }}>
          404
        </span>
                <div className="mt-[-3vw]">
                    <p className="ui text-[10px] tracking-[.35em] uppercase text-[#C9A96E]/60 mb-4">Page Not Found</p>
                    <h1 className="display text-[5vw] lg:text-[3vw] font-light text-[#EAE6DE] mb-4"
                        style={{ fontFamily: "var(--font-display)" }}>
                        The tide took this page.
                    </h1>
                    <p className="ui text-[13px] text-[#A8A399] max-w-sm mx-auto mb-10 leading-[1.9]">
                        The page you're looking for doesn't exist or may have moved. Return to the villa and explore from there.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/" className="btn-gold">Back to Villa 76</Link>
                        <Link href="/contact" className="btn-outline">Reserve a Stay</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
