"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { STOCKS } from '@/lib/contracts';

interface PortfolioState {
    idrxBalance: number;
    stockBalances: { [symbol: string]: number };
    buyStock: (symbol: string, amountIDRX: number) => Promise<void>;
    isLoading: boolean;
}

const MockPortfolioContext = createContext<PortfolioState | undefined>(undefined);

export function MockPortfolioProvider({ children }: { children: ReactNode }) {
    const [idrxBalance, setIdrxBalance] = useState(100_000_000); // 100M IDRX Initial
    const [stockBalances, setStockBalances] = useState<{ [symbol: string]: number }>({
        AAPL: 0,
        NVDA: 0,
        GOOGL: 0,
        MSFT: 0,
        AMZN: 0,
        TSLA: 0,
        META: 0,
        NFLX: 0,
        AMD: 0,
        COIN: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const buyStock = async (symbol: string, amountIDRX: number) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (amountIDRX > idrxBalance) {
            setIsLoading(false);
            throw new Error("Insufficient IDRX balance");
        }

        const stockRate = STOCKS[symbol as keyof typeof STOCKS]?.rate || 0;
        if (!stockRate) {
            setIsLoading(false);
            throw new Error("Invalid stock symbol");
        }

        const stockAmount = amountIDRX / stockRate;

        setIdrxBalance(prev => prev - amountIDRX);
        setStockBalances(prev => ({
            ...prev,
            [symbol]: (prev[symbol] || 0) + stockAmount
        }));

        setIsLoading(false);
    };

    return (
        <MockPortfolioContext.Provider value={{ idrxBalance, stockBalances, buyStock, isLoading }}>
            {children}
        </MockPortfolioContext.Provider>
    );
}

export function useMockPortfolio() {
    const context = useContext(MockPortfolioContext);
    if (context === undefined) {
        throw new Error('useMockPortfolio must be used within a MockPortfolioProvider');
    }
    return context;
}
