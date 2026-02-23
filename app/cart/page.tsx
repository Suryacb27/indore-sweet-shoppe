import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ShoppingBag, ArrowRight, Package, ShieldCheck, Truck, Sparkles, Plus } from "lucide-react"
import CartItem from "@/components/CartItem"

export default async function CartPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="mb-12">
                    <ShoppingBag className="w-24 h-24 text-primary/20 mx-auto mb-8 animate-bounce" />
                    <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">Namaste!</h1>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Please login to access your curated selection of Indore's finest sweets.</p>
                </div>
                <Link href="/login" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1">
                    Login to Shop <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        )
    }

    const { data: cartItems } = await supabase
        .from("cart_items")
        .select("*, products(*, categories(*))")
        .eq("user_id", user.id)

    const subtotal = cartItems?.reduce((acc: number, item: any) => acc + (item.products.price * item.quantity), 0) || 0
    const deliveryThreshold = 500
    const deliveryFee = subtotal >= deliveryThreshold ? 0 : 70
    const tax = Math.round(subtotal * 0.05) // 5% GST
    const total = subtotal + deliveryFee + tax

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="relative inline-block mb-12">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
                    <ShoppingBag className="w-32 h-32 text-primary/10 mx-auto relative z-10" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">Your Selection is Empty</h1>
                <p className="text-slate-500 font-medium mb-12 max-w-md mx-auto leading-relaxed">
                    Indulge in the legendary taste of Indori sweets. Explore our signature collections and find your new favorites.
                </p>
                <Link href="/products" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95">
                    Explore Collection <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <header className="mb-12 lg:mb-20">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.4em] mb-4">
                    <Sparkles className="w-4 h-4" /> Ready for checkout
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                    Your Selection
                </h1>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Cart Items List */}
                <div className="xl:col-span-7 space-y-6">
                    {cartItems.map((item: any) => (
                        <div key={item.id} className="premium-card">
                            <CartItem item={item} />
                        </div>
                    ))}

                    <div className="pt-8 flex justify-center">
                        <Link href="/products" className="group flex items-center gap-3 text-xs font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add more delicacies
                        </Link>
                    </div>
                </div>

                {/* Summary Column */}
                <div className="xl:col-span-5 sticky top-32">
                    <div className="bg-white dark:bg-slate-900 p-8 lg:p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-primary/10 relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-48 h-48 admin-sidebar-pattern opacity-5 pointer-events-none" />

                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">Order Summary</h2>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                                <span className="font-black text-slate-900 dark:text-slate-100">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-400 uppercase tracking-widest">Delivery Fee</span>
                                    {subtotal < deliveryThreshold && (
                                        <span className="text-[10px] text-primary font-bold mt-1">
                                            ₹{deliveryThreshold - subtotal} more for FREE delivery
                                        </span>
                                    )}
                                </div>
                                <span className={`font-black ${deliveryFee === 0 ? 'text-green-500' : 'text-slate-900 dark:text-slate-100'} `}>
                                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee} `}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400 uppercase tracking-widest">GST (5%)</span>
                                <span className="font-black text-slate-900 dark:text-slate-100">₹{tax}</span>
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-slate-100 dark:border-slate-800 pt-8 mb-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] block mb-1">Total Payable</span>
                                    <span className="text-4xl font-black text-slate-900 dark:text-slate-100">₹{total}</span>
                                </div>
                                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest mb-1">
                                    Inc. all taxes
                                </span>
                            </div>
                        </div>

                        <Link href="/checkout" className="group relative flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95 overflow-hidden">
                            Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="mt-10 grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                                <ShieldCheck className="w-4 h-4 text-primary" /> SECURE PAY
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                                <Truck className="w-4 h-4 text-primary" /> FAST DELIVER
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/10 flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                            Every delicacy is <span className="text-primary">hand-packed</span> and quality-checked for absolute Indori freshness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

