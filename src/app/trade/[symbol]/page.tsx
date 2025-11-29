"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStockBySymbol } from "@/lib/stocks";
import Link from "next/link";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, ERC20_ABI, IDRX_ROUTER_ABI } from "@/lib/contracts";
import { parseUnits, formatUnits } from "viem";

export default function TradePage() {
    const params = useParams();
    const router = useRouter();
    const symbol = params.symbol as string;
    const stock = getStockBySymbol(symbol);
    const { address } = useAccount();

    const [amount, setAmount] = useState<string>("");
    const [estimatedStock, setEstimatedStock] = useState<string>("0");
    const [transactionStatus, setTransactionStatus] = useState<'idle' | 'approving' | 'buying' | 'success' | 'error'>('idle');
    const [txHash, setTxHash] = useState<string | undefined>(undefined);

    // Wagmi Hooks
    const { writeContractAsync } = useWriteContract();

    // 1. Fetch IDRX Balance
    const { data: idrxBalance } = useReadContract({
        address: CONTRACTS.liskSepolia.IDRX,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
    });

    // 2. Fetch Allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: CONTRACTS.liskSepolia.IDRX,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: address ? [address, CONTRACTS.liskSepolia.IDRXRouter] : undefined,
    });

    // 3. Transaction Receipt Watcher
    const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
        hash: txHash as `0x${string}`,
    });

    // Effect to handle transaction completion
    useEffect(() => {
        if (isTxSuccess) {
            if (transactionStatus === 'approving') {
                setTransactionStatus('idle');
                setTxHash(undefined);
                refetchAllowance();
            } else if (transactionStatus === 'buying') {
                setTransactionStatus('success');
            }
        }
    }, [isTxSuccess, transactionStatus, refetchAllowance]);

    const balance = idrxBalance ? Number(formatUnits(idrxBalance, 18)) : 0;

    useEffect(() => {
        if (stock && amount) {
            const amountNum = parseFloat(amount.replace(/\./g, ""));
            if (!isNaN(amountNum)) {
                const estimated = amountNum / stock.priceRaw;
                setEstimatedStock(estimated.toLocaleString("id-ID", { maximumFractionDigits: 4 }).replace(".", ","));
            } else {
                setEstimatedStock("0");
            }
        } else {
            setEstimatedStock("0");
        }
    }, [amount, stock]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setAmount(value);
    };

    const handlePercentageClick = (percentage: number) => {
        const calculatedAmount = Math.floor(balance * percentage);
        setAmount(calculatedAmount.toString());
    };

    const handleAction = async () => {
        if (!amount || parseFloat(amount) === 0 || !address) return;

        const amountBigInt = parseUnits(amount, 18);

        try {
            // Check Allowance
            if (!allowance || allowance < amountBigInt) {
                setTransactionStatus('approving');
                const hash = await writeContractAsync({
                    address: CONTRACTS.liskSepolia.IDRX,
                    abi: ERC20_ABI,
                    functionName: "approve",
                    args: [CONTRACTS.liskSepolia.IDRXRouter, amountBigInt],
                });
                setTxHash(hash);
            } else {
                // Execute Buy
                setTransactionStatus('buying');

                // Map symbol to address (Hardcoded for MVP based on contracts.ts)
                let assetAddress = CONTRACTS.sepolia.AAPLon; // Default to AAPL
                // In a real app, use a proper mapping or lookup

                const hash = await writeContractAsync({
                    address: CONTRACTS.liskSepolia.IDRXRouter,
                    abi: IDRX_ROUTER_ABI,
                    functionName: "buyStockWithIDRX",
                    args: [assetAddress, amountBigInt, BigInt(50)], // 0.5% slippage
                });
                setTxHash(hash);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            setTransactionStatus('error');
            setTimeout(() => setTransactionStatus('idle'), 3000);
        }
    };

    const handleClose = () => {
        setTransactionStatus('idle');
        setAmount("");
        setTxHash(undefined);
        router.push('/dashboard');
    };

    if (!stock) {
        return <div className="p-4">Stock not found</div>;
    }

    const needsApproval = allowance !== undefined && amount ? allowance < parseUnits(amount, 18) : false;
    const buttonText = isTxLoading
        ? (transactionStatus === 'approving' ? 'Approving...' : 'Buying...')
        : (needsApproval ? 'Approve IDRX' : 'Buy Stock');

    return (
        <div className="min-h-screen bg-white text-black flex flex-col relative">
            {/* Header */}
            <header className="bg-black text-white p-4 flex items-center relative">
                <Link href="/dashboard" className="absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1 className="w-full text-center text-lg font-bold">TRADE</h1>
            </header>

            <main className="flex-1 p-6 flex flex-col gap-6">
                {/* Stock Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                                <path d="M10 2c1 .5 2 2 2 5" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-bold text-xl">{stock.symbol}</div>
                            <div className="text-gray-500">{stock.name}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`w-20 h-10 ${stock.chartColor}`}>
                            <svg viewBox="0 0 100 50" className="w-full h-full fill-none stroke-current stroke-2">
                                <path d="M0 40 Q 10 35, 20 40 T 40 30 T 60 20 T 80 25 T 100 10" />
                                <path d="M0 40 L 100 40 L 100 50 L 0 50 Z" className="fill-current opacity-10 stroke-none" />
                            </svg>
                        </div>
                        <div className="font-bold text-lg">{stock.price}</div>
                    </div>
                </div>

                {/* Buy Amount Input */}
                <div>
                    <label className="block font-bold mb-2">Jumlah pembelian (IDRX)</label>
                    <div className="border border-gray-300 rounded-3xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <input
                                type="text"
                                value={amount ? parseInt(amount).toLocaleString("id-ID") : ""}
                                onChange={handleAmountChange}
                                placeholder="0"
                                className="text-3xl font-bold outline-none w-full"
                            />
                            <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                <span className="bg-white text-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">X</span>
                                IDRX
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            {[0.25, 0.50, 0.75, 1].map((pct) => (
                                <button
                                    key={pct}
                                    onClick={() => handlePercentageClick(pct)}
                                    className="border border-gray-400 rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
                                >
                                    {pct * 100}%
                                </button>
                            ))}
                        </div>

                        <div className="text-gray-400 text-sm">
                            Balance : Rp {balance.toLocaleString("id-ID")}
                        </div>
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                        Exchange fees: 2.000 IDRX
                    </div>
                </div>

                {/* Estimated Output */}
                <div>
                    <label className="block font-bold mb-2">Jumlah yang didapatkan</label>
                    <div className="border border-gray-300 rounded-3xl p-4 flex items-center justify-between">
                        <div className="text-2xl font-bold">{estimatedStock}</div>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                                <path d="M10 2c1 .5 2 2 2 5" />
                            </svg>
                            <span className="font-bold">{stock.symbol}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleAction}
                        disabled={isTxLoading || !amount || parseFloat(amount) === 0}
                        className={`w-full text-white font-bold py-4 rounded-full transition-colors ${isTxLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {buttonText}
                    </button>
                </div>
            </main>

            {/* Transaction Status Overlay */}
            {transactionStatus !== 'idle' && transactionStatus !== 'approving' && transactionStatus !== 'buying' && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-blue-50 w-full rounded-t-3xl p-8 pb-12 animate-slide-up">
                        <div className="flex flex-col items-center justify-center gap-6 min-h-[300px]">
                            {transactionStatus === 'error' ? (
                                <>
                                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-center">Transaction Failed</h2>
                                    <button
                                        onClick={() => setTransactionStatus('idle')}
                                        className="w-full bg-red-600 text-white font-bold py-4 rounded-full hover:bg-red-700 transition-colors mt-4"
                                    >
                                        Try Again
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-center">Buy Stocks Successful</h2>
                                    <p className="text-gray-500 text-center text-sm">
                                        Your transaction has been submitted. It may take a few minutes for the cross-chain swap to complete.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-full hover:bg-blue-700 transition-colors mt-4"
                                    >
                                        Back to Dashboard
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
