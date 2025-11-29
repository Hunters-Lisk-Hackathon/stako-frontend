export interface Stock {
    symbol: string;
    name: string;
    price: string;
    priceRaw: number;
    chartColor: string;
}

export const STOCKS: Stock[] = [
    { symbol: "AAPL", name: "Apple Inc", price: "Rp 150.000", priceRaw: 150000, chartColor: "text-blue-400" },
    { symbol: "TSLA", name: "Tesla Inc", price: "Rp 2.500.000", priceRaw: 2500000, chartColor: "text-green-400" },
    { symbol: "GOOGL", name: "Alphabet Inc", price: "Rp 1.800.000", priceRaw: 1800000, chartColor: "text-blue-400" },
];

export const getStockBySymbol = (symbol: string): Stock | undefined => {
    return STOCKS.find(s => s.symbol === symbol);
};
