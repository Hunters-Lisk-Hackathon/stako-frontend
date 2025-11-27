"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
    "Initializing Protocol...",
    "Loading Markets...",
    "Syncing Data...",
    "Almost Ready...",
];

export function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        // Progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setIsLoading(false), 600);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        // Rotating messages
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 1200);

        return () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
        };
    }, []);

    const circumference = 2 * Math.PI * 60;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="page-loader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50"></div>

                    <motion.div
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'linear',
                        }}
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.04) 0%, transparent 50%)',
                            backgroundSize: '200% 200%',
                        }}
                    />

                    <div
                        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Circular Progress Ring */}
                        <div className="relative mb-8">
                            {/* Background Ring */}
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    className="text-black/5"
                                />
                                {/* Progress Ring */}
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-black transition-all duration-300 ease-out"
                                    style={{
                                        strokeDasharray: circumference,
                                        strokeDashoffset: strokeDashoffset,
                                    }}
                                />
                            </svg>

                            {/* Logo in Center with Shimmer */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative"
                                >
                                    <h1 className="text-5xl font-bold tracking-tighter text-gradient relative">
                                        Stako
                                        {/* Shimmer Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                            animate={{
                                                x: ["-100%", "200%"],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                                repeatDelay: 1,
                                            }}
                                        />
                                    </h1>
                                </motion.div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-black/40 font-medium tracking-wider uppercase mb-4"
                        >
                            Tokenized Stock Protocol
                        </motion.p>

                        {/* Rotating Status Messages */}
                        <div className="h-6 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={messageIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-xs text-black/30 font-medium"
                                >
                                    {loadingMessages[messageIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Percentage */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-2xl font-bold tracking-tight text-black/80 font-mono"
                        >
                            {Math.floor(Math.min(progress, 100))}%
                        </motion.p>
                    </div>

                    {progress > 80 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        >
                            <motion.div
                                animate={{ y: [-3, 3, -3] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-black/30"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="18 15 12 9 6 15" />
                                </svg>
                            </motion.div>
                            <motion.p
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-xs text-black/30 font-medium tracking-wider uppercase"
                            >
                                Ready
                            </motion.p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
