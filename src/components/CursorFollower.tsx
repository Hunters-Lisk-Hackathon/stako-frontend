"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorFollower() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", updateMousePosition);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed z-[9998] hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div className="h-2 w-2 rounded-full bg-black/30" />
            </motion.div>

            <motion.div
                className="pointer-events-none fixed z-[9997] hidden md:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                }}
            >
                <div className="h-8 w-8 rounded-full border border-black/20" />
            </motion.div>
        </>
    );
}
