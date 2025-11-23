"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TypingEffectProps = {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
};

export function TypingEffect({
    text,
    className,
    delay = 0,
    speed = 50,
}: TypingEffectProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[0.5em] h-[1em] bg-black ml-1 align-middle"
            />
        </span>
    );
}
