"use client";

import { TrendingUp, TrendingDown, Clock } from "lucide-react";

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    time: string;
    trend: "up" | "down" | "neutral";
    symbol?: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Apple Unveils Revolutionary AI Chip",
        summary: "AAPL surges 5% as new M4 chip promises 40% faster AI processing",
        time: "2h ago",
        trend: "up",
        symbol: "AAPL"
    },
    {
        id: 2,
        title: "NVIDIA Partners with Major Automakers",
        summary: "NVDA announces deals with Tesla, Mercedes for autonomous driving tech",
        time: "4h ago",
        trend: "up",
        symbol: "NVDA"
    },
    {
        id: 3,
        title: "Meta's VR Sales Hit Record High",
        summary: "Quest 3 sales exceed expectations, META stock rises 3.2%",
        time: "6h ago",
        trend: "up",
        symbol: "META"
    },
    {
        id: 4,
        title: "Amazon Expands Same-Day Delivery",
        summary: "AMZN launches instant delivery in 50 new cities across Asia",
        time: "8h ago",
        trend: "neutral",
        symbol: "AMZN"
    },
    {
        id: 5,
        title: "Netflix Subscriber Growth Accelerates",
        summary: "NFLX adds 8M subscribers in Q4, beats analyst estimates",
        time: "10h ago",
        trend: "up",
        symbol: "NFLX"
    },
    {
        id: 6,
        title: "Microsoft Cloud Revenue Soars",
        summary: "Azure growth drives MSFT to new all-time high",
        time: "12h ago",
        trend: "up",
        symbol: "MSFT"
    }
];

export function MarketNews() {
    return (
        <div className="space-y-3">
            {newsData.map((news) => (
                <div
                    key={news.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group hover:shadow-md"
                >
                    <div className="flex items-start gap-3">
                        {news.trend === "up" && (
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                            </div>
                        )}
                        {news.trend === "down" && (
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                                <TrendingDown className="w-4 h-4 text-red-600" />
                            </div>
                        )}
                        {news.trend === "neutral" && (
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                {news.symbol && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-black text-white rounded-full">
                                        {news.symbol}
                                    </span>
                                )}
                                <span className="text-[10px] text-gray-400">{news.time}</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {news.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {news.summary}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
