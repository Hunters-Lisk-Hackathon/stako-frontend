export function PortfolioCards() {
    const stocks = [
        { symbol: "AAPL", name: "Apple Inc", price: "Rp 1.499.000", color: "bg-black" },
        { symbol: "AAPL", name: "Apple Inc", price: "Rp 1.499.000", color: "bg-red-500" }, // Just varying colors for demo
        { symbol: "AAPL", name: "Apple Inc", price: "Rp 1.499.000", color: "bg-orange-500" },
    ];

    return (
        <section className="bg-black rounded-[2.5rem] p-6 text-white -mx-4 sm:mx-0">
            <h2 className="text-lg font-medium mb-4">Portfolio</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
                {stocks.map((stock, i) => (
                    <div
                        key={i}
                        className="min-w-[160px] bg-white text-black p-4 rounded-3xl snap-center flex flex-col justify-between h-[140px]"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
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
                        </div>
                        <div>
                            <div className="font-bold text-lg">{stock.symbol}</div>
                            <div className="text-xs text-gray-500">{stock.name}</div>
                        </div>
                        <div className="font-semibold text-sm">{stock.price}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
