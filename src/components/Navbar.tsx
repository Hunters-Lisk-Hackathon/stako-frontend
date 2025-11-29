"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StockTicker } from "@/components/StockTicker";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? "border-black/5 bg-white/70 backdrop-blur-md"
                    : "border-transparent bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between relative z-50">
                <div className="text-xl font-bold tracking-tighter">KR4</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-black/60">
                    <Link href="#" className="hover:text-black transition-colors">
                        Markets
                    </Link>
                    <Link href="#" className="hover:text-black transition-colors">
                        Governance
                    </Link>
                    <Link href="#" className="hover:text-black transition-colors">
                        Developers
                    </Link>
                </div>

                <div className="hidden md:block">
                    <Link
                        href="https://dclex-dex.netlify.app/"
                        className="btn-glow px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                        Launch App
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-black"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span
                            className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block w-full h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                                }`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-black/5 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 flex flex-col gap-6 text-lg font-medium text-black/80">
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-black transition-colors"
                            >
                                Markets
                            </Link>
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-black transition-colors"
                            >
                                Governance
                            </Link>
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-black transition-colors"
                            >
                                Developers
                            </Link>
                            <Link
                                href="https://dclex-dex.netlify.app/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-glow px-4 py-3 bg-black text-white text-center font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg"
                            >
                                Launch App
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <StockTicker />
        </nav>
    );
}
