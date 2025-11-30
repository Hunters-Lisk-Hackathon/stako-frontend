"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePortfolio } from "@/hooks/usePortfolio";
import { STOCKS } from "@/lib/contracts";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { formatNumber, parseNumber } from "@/utils/format";

export default function BuyPage() {
    const params = useParams();
    const router = useRouter();
    const symbol = params.symbol as string;
    const { idrx, buyStock, isLoading: isPortfolioLoading } = usePortfolio();

    const [displayAmount, setDisplayAmount] = useState("");
    const [rawValue, setRawValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const stock = STOCKS[symbol as keyof typeof STOCKS];

    if (!stock) {
        return <div className="p-6">Invalid stock symbol</div>;
    }

    const estimatedReceived = rawValue ? (parseFloat(rawValue) / stock.rate).toFixed(4) : "0";

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow only numbers and dots
        if (!/^[0-9.]*$/.test(val)) return;

        const parsed = parseNumber(val);
        setRawValue(parsed);

        if (parsed) {
            setDisplayAmount(formatNumber(parsed));
        } else {
            setDisplayAmount("");
        }
    };

    const handleBuy = async () => {
        if (!rawValue || parseFloat(rawValue) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        if (parseFloat(rawValue) > parseFloat(idrx.formattedBalance)) {
            setError("Insufficient IDRX balance");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            await buyStock(symbol, parseFloat(rawValue));
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (err) {
            setError("Failed to buy stock. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <FadeIn>
                    <div className="bg-white rounded-3xl p-8 text-center shadow-xl max-w-sm w-full">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
                        <p className="text-gray-500 mb-6">
                            You successfully bought {estimatedReceived} {symbol}
                        </p>
                        <div className="animate-pulse text-sm text-gray-400">Redirecting to dashboard...</div>
                    </div>
                </FadeIn>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 relative">
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-bold">Buy {symbol}</h1>
                    </div>

                    <div className="mb-8 text-center">
                        <div className="text-gray-500 text-sm mb-1">Current Price</div>
                        <div className="text-3xl font-bold">{formatNumber(stock.rate)} IDRX</div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount (IDRX)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={displayAmount}
                                    onChange={handleAmountChange}
                                    placeholder="0"
                                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                    IDRX
                                </span>
                            </div>
                            <div className="mt-2 text-right text-sm text-gray-500">
                                Balance: {formatNumber(idrx.formattedBalance)} IDRX
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-blue-700 font-medium">Estimated Received</span>
                            <span className="text-blue-900 font-bold text-lg">
                                {estimatedReceived} {symbol}
                            </span>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleBuy}
                            disabled={isSubmitting || !rawValue}
                            className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Buy ${symbol}`
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
