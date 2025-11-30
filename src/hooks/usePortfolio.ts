"use client";

import { useMockPortfolio } from '@/context/MockPortfolioContext';
import { STOCKS } from '@/lib/contracts';

export function usePortfolio() {
    const { idrxBalance, stockBalances, isLoading, buyStock } = useMockPortfolio();

    // Calculate portfolio value in IDRX
    const calculatePortfolioValue = () => {
        let total = idrxBalance;
        Object.entries(stockBalances).forEach(([symbol, amount]) => {
            const rate = STOCKS[symbol as keyof typeof STOCKS]?.rate || 0;
            total += amount * rate;
        });
        return total;
    };

    const portfolioValue = calculatePortfolioValue();

    const stocks = Object.keys(STOCKS).reduce((acc, symbol) => {
        acc[symbol] = {
            formattedBalance: (stockBalances[symbol] || 0).toString(),
            isLoading,
            refetch: () => { },
        };
        return acc;
    }, {} as any);

    return {
        idrx: {
            formattedBalance: idrxBalance.toString(),
            balance: BigInt(idrxBalance), // Mock BigInt
            isLoading,
            refetch: () => { },
        },
        stocks,
        portfolioValue,
        isLoading,
        buyStock, // Expose buy function
        refetchAll: () => { },
    };
}
