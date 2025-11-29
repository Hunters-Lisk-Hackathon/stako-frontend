import { Header } from "@/components/dashboard/Header";
import { MainStats } from "@/components/dashboard/MainStats";
import { PortfolioCards } from "@/components/dashboard/PortfolioCards";
import { StockList } from "@/components/dashboard/StockList";
import { BottomNav } from "@/components/dashboard/BottomNav";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Header />
            <main className="px-4 pt-6 space-y-6">
                <MainStats />
                <PortfolioCards />
                <StockList />
            </main>
            <BottomNav />
        </div>
    );
}
