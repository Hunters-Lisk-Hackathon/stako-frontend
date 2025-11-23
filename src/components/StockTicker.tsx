"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Stock = {
    symbol: string;
    price: string;
    change: string;
    up: boolean;
};

export function StockTicker() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStocks() {
            try {
                const res = await fetch("/api/stocks");
                const data = await res.json();
                setStocks(data);
            } catch (error) {
                console.error("Failed to fetch stocks", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStocks();
        // Refresh every 60 seconds
        const interval = setInterval(fetchStocks, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="h-9 bg-black/5 border-y border-black/5" />;

    return (
        <div className="w-full bg-black/5 border-y border-black/5 overflow-hidden py-2 flex items-center">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {/* Duplicate list 4 times for smooth infinite scroll */}
                    {[...stocks, ...stocks, ...stocks, ...stocks].map((stock, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-black/80">{stock.symbol}</span>
                            <span className="text-black/60">${stock.price}</span>
                            <span className={stock.up ? "text-green-600" : "text-red-500"}>
                                {stock.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
