"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function InteractiveGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: ev.clientX - rect.left,
                y: ev.clientY - rect.top,
            });

            // Check if mouse is inside the container
            if (
                ev.clientX >= rect.left &&
                ev.clientX <= rect.right &&
                ev.clientY >= rect.top &&
                ev.clientY <= rect.bottom
            ) {
                setOpacity(1);
            } else {
                setOpacity(0);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
            {/* Base Faint Grid */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
            />

            {/* Glowing Grid - Revealed by Mouse */}
            <motion.div
                className="absolute inset-0 transition-opacity duration-300"
                animate={{ opacity }}
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    maskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                }}
            />

            {/* Optional: Highlight Pulse at Mouse Position */}
            <motion.div
                className="absolute w-96 h-96 bg-black/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    opacity: opacity * 0.5
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />
        </div>
    );
}
