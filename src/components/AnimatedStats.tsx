"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { label: "Total Volume", value: 10000000, prefix: "$", suffix: "+", decimals: 0 },
    { label: "Active Users", value: 50000, prefix: "", suffix: "+", decimals: 0 },
    { label: "Trade Latency", value: 0.01, prefix: "< ", suffix: "s", decimals: 2 },
    { label: "Assets Listed", value: 150, prefix: "", suffix: "+", decimals: 0 },
];

export function AnimatedStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="w-full py-12 border-b border-black/5 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            {isInView ? (
                                <CountUp
                                    start={0}
                                    end={stat.value}
                                    duration={2.5}
                                    separator=","
                                    decimals={stat.decimals}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
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
