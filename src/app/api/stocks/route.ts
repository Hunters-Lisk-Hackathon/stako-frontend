import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

const SYMBOLS = ["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL", "AMZN", "COIN", "MSTR"];

export async function GET() {
    try {
        const quotes = await yahooFinance.quote(SYMBOLS);

        const formattedData = (quotes as any[]).map((quote: any) => ({
            symbol: quote.symbol,
            price: quote.regularMarketPrice?.toFixed(2) || "0.00",
            change: (quote.regularMarketChangePercent || 0).toFixed(2) + "%",
            up: (quote.regularMarketChangePercent || 0) >= 0,
        }));

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Stock fetch error:", error);
        // Fallback mock data
        return NextResponse.json([
            { symbol: "AAPL", price: "182.50", change: "+1.20%", up: true },
            { symbol: "TSLA", price: "240.10", change: "-0.50%", up: false },
            { symbol: "NVDA", price: "485.90", change: "+2.80%", up: true },
            { symbol: "MSFT", price: "370.20", change: "+0.90%", up: true },
            { symbol: "GOOGL", price: "138.40", change: "-0.20%", up: false },
            { symbol: "AMZN", price: "145.80", change: "+1.50%", up: true },
            { symbol: "COIN", price: "155.60", change: "+4.20%", up: true },
            { symbol: "MSTR", price: "590.00", change: "+5.10%", up: true },
        ]);
    }
}
