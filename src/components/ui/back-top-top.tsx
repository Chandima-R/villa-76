"use client";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fn = () => setVisible(window.scrollY > window.innerHeight);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const scrollToTop = () => {
        // Works with both Lenis and native scroll
        const lenis = (window as unknown as Record<string, unknown>).lenis as
            | { scrollTo: (target: number, opts?: object) => void }
            | undefined;

        if (lenis) {
            lenis.scrollTo(0, { duration: 1.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 left-8 z-[400] group flex flex-col items-center gap-2"
                    aria-label="Back to top"
                >
                    {/* Button circle */}
                    <div className="w-11 h-11 border border-[#1C3B58] bg-[#04090F]/80 backdrop-blur-md
                                    flex items-center justify-center
                                    group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/8
                                    transition-all duration-400">
                        <motion.span
                            className="text-[#5B9BB5] group-hover:text-[#C9A96E] transition-colors text-sm leading-none"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ↑
                        </motion.span>
                    </div>

                    {/* Label */}
                    <span className="ui text-[8px] tracking-[.3em] uppercase text-[#A8A399]/30
                                     group-hover:text-[#C9A96E]/50 transition-colors duration-300">
                        Top
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
