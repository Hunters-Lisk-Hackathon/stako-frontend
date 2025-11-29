import Link from "next/link";

export function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-6 flex items-end justify-between z-50">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-black">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-xs font-medium">Home</span>
            </Link>

            <div className="relative -top-6">
                <Link
                    href="/trade"
                    className="flex flex-col items-center justify-center w-16 h-16 bg-black rounded-full text-white shadow-lg shadow-black/30 transform transition-transform active:scale-95"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                    <span className="text-[10px] font-medium mt-0.5">Trade</span>
                </Link>
            </div>

            <Link href="/history" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
                <span className="text-xs font-medium">History</span>
            </Link>
        </nav>
    );
}
