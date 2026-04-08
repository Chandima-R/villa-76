"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Preloader} from "@/components/ui/preloader";

export const ClientShell = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <>
            {loading && <Preloader onDone={() => setLoading(false)} />}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </>
    );
}
