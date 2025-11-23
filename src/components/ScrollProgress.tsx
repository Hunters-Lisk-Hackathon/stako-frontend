"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", updateScrollProgress);
        updateScrollProgress();

        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-black/20 via-black to-black/20 origin-left z-[100]"
            style={{
                scaleX: scrollProgress / 100,
            }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
        />
    );
}
