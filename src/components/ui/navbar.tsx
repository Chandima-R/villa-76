"use client";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";

const links = [
    { href: "/accommodation", label: "Accommodation" },
    { href: "/dining",        label: "Dining"         },
    { href: "/experiences",   label: "Experiences"    },
    { href: "/gallery",       label: "Gallery"        },
    { href: "/contact",       label: "Contact"        },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen]         = useState(false);
    const path = usePathname();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setOpen(false); }, [path]);

    return (
        <>
            <nav className={`fixed top-0 inset-x-0 z-[500] transition-all duration-700 ${scrolled ? "py-4 bg-[#071220]/90 backdrop-blur-xl border-b border-[#1C3B58]/40" : "py-7"}`}>
                <div className="px-8 lg:px-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col leading-none group">
                        <span className="display text-[22px] font-light tracking-[.25em] text-[#C9A96E] group-hover:text-[#DEC090] transition-colors">VILLA</span>
                        <span className="ui text-[8px] tracking-[.55em] text-[#C9A96E]/50 group-hover:text-[#C9A96E]/80 transition-colors uppercase">76 · Weligama</span>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center gap-9">
                        {links.map(l => (
                            <li key={l.href}>
                                <Link href={l.href} className={`nav-link ${path === l.href ? "active" : ""}`}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="hidden lg:block">
                        <Link href="/contact" className="btn-outline text-[10px] py-[11px] px-7">Reserve Now</Link>
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden relative w-7 h-5 flex flex-col justify-between" aria-label="menu">
                        {[0,1,2].map(i => (
                            <motion.span key={i} className="block h-px bg-[#C9A96E] origin-center"
                                         animate={open
                                             ? i === 1 ? { opacity: 0, scaleX: 0 }
                                                 : i === 0 ? { rotate: 45,  y: 9  }
                                                     :           { rotate: -45, y: -9 }
                                             : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                                         transition={{ duration: .35 }} />
                        ))}
                    </button>
                </div>
            </nav>

            {/* Mobile fullscreen */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: .4 }}
                        className="fixed inset-0 z-[499] bg-[#04090F]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {links.map((l, i) => (
                            <motion.div key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 + .1 }}>
                                <Link href={l.href} className="display text-[11vw] font-light text-[#EAE6DE] hover:text-[#C9A96E] transition-colors">{l.label}</Link>
                            </motion.div>
                        ))}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
                            <Link href="/contact" className="btn-gold mt-4">Reserve Now</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
