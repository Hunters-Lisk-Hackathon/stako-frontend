"use client";

import { useRouter } from "next/navigation";
import { STOCKS } from "@/lib/stocks";
import { USD_IDR_RATE, REAL_PRICES_USD } from "@/lib/constants";

export function StockList() {
    const router = useRouter();

    const handleBuy = (symbol: string) => {
        router.push(`/trade/${symbol}`);
    };

    const getPriceIDR = (symbol: string, defaultPrice: string) => {
        const usdPrice = REAL_PRICES_USD[symbol];
        if (usdPrice) {
            const priceIDR = usdPrice * USD_IDR_RATE;
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(priceIDR);
        }
        return defaultPrice;
    };

    return (
        <section>
            <h2 className="text-xl font-bold mb-4 text-black">Favorite Stocks</h2>
            <div className="space-y-3">
                {STOCKS.map((stock, i) => (
                    <div
                        key={i}
                        className="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleBuy(stock.symbol)}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i === 0 ? 'bg-black text-white' : 'bg-gradient-to-br from-red-500 to-orange-500 text-white'}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                                    <path d="M10 2c1 .5 2 2 2 5" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-black">{stock.symbol}</div>
                                <div className="text-xs text-gray-500">{stock.name}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Mini Chart */}
                            <div className={`w-16 h-8 ${stock.chartColor} hidden sm:block`}>
                                <svg viewBox="0 0 100 50" className="w-full h-full fill-none stroke-current stroke-2">
                                    <path d="M0 40 Q 10 35, 20 40 T 40 30 T 60 20 T 80 25 T 100 10" />
                                    <path d="M0 40 L 100 40 L 100 50 L 0 50 Z" className="fill-current opacity-10 stroke-none" />
                                </svg>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-black">{getPriceIDR(stock.symbol, stock.price)}</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBuy(stock.symbol);
                                    }}
                                    className="text-xs bg-black text-white px-3 py-1 rounded-full mt-1 hover:bg-gray-800"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
