"use client";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";

export const FloatingReserve = ()=> {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fn = () => setShow(window.scrollY > window.innerHeight * 0.6);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 right-8 z-[400]"
                >
                    <Link
                        href="/contact"
                        className="flex items-center gap-3 bg-[#C9A96E] text-[#04090F] px-6 py-4 ui text-[10px] tracking-[.22em] uppercase font-medium shadow-[0_8px_40px_rgba(0,0,0,.5)] hover:bg-[#DEC090] transition-colors duration-400"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#04090F]/40 animate-[pulse_2s_ease-in-out_infinite]" />
                        Reserve Now
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
