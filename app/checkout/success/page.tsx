import Link from "next/link"
import { CheckCircle, ShoppingBag, ArrowRight, Sparkles } from "lucide-react"

export default function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: { orderId: string }
}) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 text-center relative overflow-hidden">
            {/* Decorative Patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 admin-sidebar-pattern opacity-5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 admin-sidebar-pattern opacity-5 pointer-events-none rotate-180" />

            <div className="bg-white dark:bg-slate-900 p-12 md:p-24 rounded-[3rem] shadow-2xl inline-block max-w-2xl w-full border border-primary/10 relative overflow-hidden group">
                {/* Decorative Accent Line */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-amber-400" />

                <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping scale-150 opacity-20" />
                    <div className="relative z-10 inline-flex items-center justify-center p-8 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/20">
                        <CheckCircle className="w-16 h-16" />
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                    <Sparkles className="w-4 h-4" /> Order Confirmed
                </div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 tracking-tighter">Legendary Choice!</h1>
                <p className="text-xl text-slate-500 font-bold mb-8 leading-relaxed">
                    Thank you for your purchase. We are preparing your delicacies with utmost care.
                </p>

                <div className="inline-block px-6 py-3 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 mb-12">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                    <span className="text-xl font-black text-primary">#{searchParams.orderId?.slice(-8).toUpperCase()}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/products" className="flex items-center justify-center gap-3 py-5 px-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                        <ShoppingBag className="w-5 h-5" /> More Sweets
                    </Link>
                    <Link href="/" className="premium-button flex items-center justify-center gap-3 py-5 px-8 group">
                        Back to Home <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    A confirmation email is on its way to your inbox.
                </p>
            </div>
        </div>
    )
}

