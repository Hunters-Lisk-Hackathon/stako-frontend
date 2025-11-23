"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
    { label: "Total Volume", value: 10000000, prefix: "$", suffix: "", decimals: 0, ticker: true, increment: 1, interval: 100 }, // +$1 every 0.1s
    { label: "Active Users", value: 50000, prefix: "", suffix: "", decimals: 0, ticker: true, increment: 1, interval: 100000 }, // +1 every 100s
    { label: "Trade Latency", value: 0.01, prefix: "< ", suffix: "s", decimals: 2, ticker: false },
    { label: "Assets Listed", value: 150, prefix: "", suffix: "+", decimals: 0, ticker: false },
];

export function AnimatedStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [liveValues, setLiveValues] = useState<{ [key: number]: number }>({});

    // Initialize live values when in view
    useEffect(() => {
        if (isInView) {
            const initialValues: { [key: number]: number } = {};
            stats.forEach((stat, index) => {
                if (stat.ticker) {
                    // Load from localStorage if available, otherwise start from 0
                    const savedValue = localStorage.getItem(`stat_${index}`);
                    initialValues[index] = savedValue ? parseInt(savedValue, 10) : 0;
                }
            });
            setLiveValues(initialValues);
        }
    }, [isInView]);

    // Set up infinite tickers
    useEffect(() => {
        if (!isInView) return;

        const intervals: NodeJS.Timeout[] = [];

        stats.forEach((stat, index) => {
            if (stat.ticker) {
                const interval = setInterval(() => {
                    setLiveValues((prev) => {
                        const newValue = (prev[index] || 0) + (stat.increment || 1);
                        // Save to localStorage
                        localStorage.setItem(`stat_${index}`, newValue.toString());
                        return {
                            ...prev,
                            [index]: newValue,
                        };
                    });
                }, stat.interval);
                intervals.push(interval);
            }
        });

        return () => {
            intervals.forEach((interval) => clearInterval(interval));
        };
    }, [isInView]);

    const formatNumber = (num: number, decimals: number) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    };

    return (
        <div ref={ref} className="w-full py-12 border-b border-black/5 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2 font-mono">
                            {isInView ? (
                                stat.ticker ? (
                                    // Live ticker
                                    <span>
                                        {stat.prefix}
                                        {formatNumber(liveValues[index] ?? 0, stat.decimals)}
                                        {stat.suffix}
                                    </span>
                                ) : (
                                    // One-time countup
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator=","
                                        decimals={stat.decimals}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                )
                            ) : (
                                <span>{stat.prefix}0{stat.suffix}</span>
                            )}
                        </div>
                        <div className="text-sm font-medium text-black/40 uppercase tracking-wider">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
