'use client';

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS, ERC20_ABI, VAULT_ETH_ABI } from "@/lib/contracts";
import { formatUnits } from "viem";
import { sepolia } from "wagmi/chains";
import { USD_IDR_RATE, REAL_PRICES_USD } from "@/lib/constants";
import { formatIDR } from "@/lib/utils";

export function MainStats() {
    const { address } = useAccount();

    // Fetch IDRX Balance (Lisk Sepolia)
    const { data: idrxBalance } = useReadContract({
        address: CONTRACTS.liskSepolia.IDRX,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Fetch AAPL Balance (Ethereum Sepolia)
    const { data: aaplBalance } = useReadContract({
        address: CONTRACTS.sepolia.VaultEth,
        abi: VAULT_ETH_ABI,
        functionName: "userBalances",
        args: address ? [address, CONTRACTS.sepolia.AAPLon] : undefined,
        chainId: sepolia.id,
        query: {
            enabled: !!address,
        }
    });

    // Calculate Values
    const idrxValue = idrxBalance ? Number(formatUnits(idrxBalance, 18)) : 0;
    const aaplValue = aaplBalance ? Number(formatUnits(BigInt(String(aaplBalance)), 18)) * REAL_PRICES_USD["AAPL"] * USD_IDR_RATE : 0;
    const totalPortfolio = idrxValue + aaplValue;

    const formattedPortfolio = formatIDR(totalPortfolio);
    const formattedIdrx = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(idrxValue);

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-gray-500 text-sm font-medium mb-1">Total Portfolio</h2>
                <div className="text-4xl font-bold tracking-tight text-black">
                    {formattedPortfolio}
                </div>
            </div>

            <div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">IDRX Balance</h3>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        X
                    </div>
                    <span className="text-2xl font-semibold text-black">{formattedIdrx} IDRX</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-4 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22v-5" />
                        <path d="M9 17l3 5 3-5" />
                        <path d="M19 17V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12" />
                    </svg>
                    Deposit
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-gray-200 py-3.5 px-4 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 2v5" />
                        <path d="M9 7l3-5 3 5" />
                        <path d="M19 7v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7" />
                    </svg>
                    Withdraw
                </button>
            </div>
        </section>
    );
}
