"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function ScrambleText({
    text,
    className = "",
    delay = 0,
    duration = 2000
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;

        const timeoutId = setTimeout(() => {
            hasAnimated.current = true;
            let startTime = Date.now();
            let frameId: number;

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);

                if (progress === 1) {
                    setDisplayText(text);
                    return;
                }

                const numRevealed = Math.floor(text.length * progress);

                const scrambled = text
                    .split("")
                    .map((char, i) => {
                        if (i < numRevealed) return char;
                        if (char === " ") return " ";
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");

                setDisplayText(scrambled);
                frameId = requestAnimationFrame(animate);
            };

            frameId = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(frameId);
        }, delay * 1000);

        return () => clearTimeout(timeoutId);
    }, [isInView, text, delay, duration]);

    // Initial placeholder with random chars to prevent layout shift or empty space
    useEffect(() => {
        if (!displayText) {
            setDisplayText(
                text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
            );
        }
    }, [text, displayText]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}
