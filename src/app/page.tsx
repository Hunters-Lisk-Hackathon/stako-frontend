import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-black/10 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">KL4</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-black/60">
            <Link href="#" className="hover:text-black transition-colors">Markets</Link>
            <Link href="#" className="hover:text-black transition-colors">Governance</Link>
            <Link href="#" className="hover:text-black transition-colors">Developers</Link>
          </div>
          <Link
            href="https://dclex-dex.netlify.app/"
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Launch App
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-black/10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
              Tokenized Stocks <br />
              <span className="text-black/40">on Lisk.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl mb-12 leading-relaxed">
              Buy global stocks with <strong>IDRX</strong>. Low fees, instant settlement, and secured on the Lisk blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://dclex-dex.netlify.app/"
                className="px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
              >
                Start Trading
              </Link>
              <Link
                href="#"
                className="px-8 py-4 border border-black/20 text-black text-lg font-medium rounded-full hover:bg-black/5 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 border-b border-black/10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="group">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Buy with IDRX</h3>
              <p className="text-black/50 mb-6 leading-relaxed">
                Seamlessly swap between IDRX stablecoin and tokenized stocks. No traditional broker account needed.
              </p>
              <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors">
                Start Trading →
              </Link>
            </div>
            <div className="group">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Earn Yield on Stocks</h3>
              <p className="text-black/50 mb-6 leading-relaxed">
                Add your stocks to liquidity pools on Lisk and earn a share of fees on every swap.
              </p>
              <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors">
                Explore Pools →
              </Link>
            </div>
            <div className="group">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Track on Lisk</h3>
              <p className="text-black/50 mb-6 leading-relaxed">
                Manage your stock portfolio on-chain with full self-custody. Verify every transaction on the Lisk explorer.
              </p>
              <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors">
                View Portfolio →
              </Link>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Compliant and Secure</h2>
              <p className="text-xl text-black/60 max-w-2xl">
                Built with institutional-grade security and full regulatory compliance in mind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 border-t border-black/10 pt-12">
              <div>
                <h4 className="text-lg font-semibold mb-2">Licensed & Regulated</h4>
                <p className="text-black/50 text-sm">
                  All securities offered by and through our SEC Registered Broker-Dealer partners.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Institutional Reliability</h4>
                <p className="text-black/50 text-sm">
                  Delivering institutional-grade custody, liquidity, and security standards for all assets.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">100% Asset Reserves</h4>
                <p className="text-black/50 text-sm">
                  Tokens are 100% backed by verifiable, independently audited real-world asset reserves.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-black/40">
            © 2024 KL4. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-black/40">
            <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms</Link>
            <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
