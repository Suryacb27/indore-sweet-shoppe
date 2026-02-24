import { createClient } from "@/lib/supabase/server"
import { createOrder } from "@/actions/orders"
import Link from "next/link"
import { redirect } from "next/navigation"
import { CreditCard, Truck, ShieldCheck, ArrowRight, ShoppingBag, Package, Sparkles } from "lucide-react"

export default async function CheckoutPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Auth is handled by Middleware, so we can assume user exists if we reached here
    // However, we still fetch the user to get their cart data
    if (!user) {
        redirect("/login")
    }

    const { data: cartItems } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("user_id", user.id)

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="mb-12">
                    <Package className="w-24 h-24 text-primary/10 mx-auto mb-8" />
                    <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tighter">Your Selection is Empty</h1>
                    <p className="text-slate-500 font-medium">Add some traditional delicacies to your cart first.</p>
                </div>
                <Link href="/products" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Browse Collection</Link>
            </div>
        )
    }

    const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.products.price * item.quantity), 0)
    const deliveryThreshold = 500
    const deliveryFee = subtotal >= deliveryThreshold ? 0 : 70
    const tax = Math.round(subtotal * 0.05)
    const total = subtotal + deliveryFee + tax

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 admin-sidebar-pattern opacity-5 pointer-events-none -rotate-12" />

            <header className="mb-12 lg:mb-20">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.4em] mb-4">
                    <Sparkles className="w-4 h-4" /> Secure Checkout
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-tight">
                    Finalize <span className="text-primary italic">Order</span>
                </h1>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Shipping & Payment Form */}
                <div className="xl:col-span-7 space-y-8 animate-in slide-in-from-bottom duration-700">
                    <section className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-xl shadow-primary/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Truck className="w-7 h-7 text-primary" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Shipping Details</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" name="name" placeholder="e.g. Rahul Sharma" className="w-full p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" className="w-full p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Address</label>
                                <textarea name="address" placeholder="House No, Street, Landmark..." className="w-full p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 transition-all h-32 resize-none" required></textarea>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-xl shadow-primary/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <CreditCard className="w-7 h-7 text-primary" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Payment Method</h2>
                        </div>
                        <div className="relative p-6 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between group overflow-hidden cursor-pointer shadow-lg shadow-primary/10 transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 admin-sidebar-pattern opacity-5 pointer-events-none" />
                            <div className="relative z-10">
                                <p className="font-black text-slate-900 dark:text-slate-100 text-xl">Cash on Delivery (COD)</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic">Pay on arrival • Quality Guaranteed</p>
                            </div>
                            <div className="relative z-10 w-6 h-6 rounded-full border-4 border-primary bg-white shadow-inner flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Order Summary Confirmation */}
                <div className="xl:col-span-5 sticky top-32 animate-in slide-in-from-right duration-700">
                    <div className="bg-white dark:bg-slate-900 p-8 lg:p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-primary/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 admin-sidebar-pattern opacity-5 pointer-events-none rotate-12" />

                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 relative z-10 font-black">Order Summary</h2>

                        <div className="max-h-[300px] overflow-y-auto mb-10 pr-2 space-y-6 relative z-10 custom-scrollbar">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-start group/item">
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm transition-colors group-hover/item:text-primary leading-tight">{item.products.name}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Qty: {item.quantity} x ₹{item.products.price}</p>
                                    </div>
                                    <span className="font-black text-slate-900 dark:text-slate-100 text-lg tabular-nums">₹{item.products.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 mb-10 pt-8 border-t-2 border-dashed border-slate-100 dark:border-slate-800 relative z-10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                                <span className="font-black text-slate-900 dark:text-slate-100">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Delivery Fee</span>
                                <span className={`font-black ${deliveryFee === 0 ? "text-green-500" : "text-slate-900 dark:text-slate-100"}`}>
                                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Tax (GST 5%)</span>
                                <span className="font-black text-slate-900 dark:text-slate-100">₹{tax}</span>
                            </div>
                            <div className="flex justify-between items-end pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Payable</span>
                                    <span className="text-5xl font-black text-primary tracking-tighter">₹{total}</span>
                                </div>
                            </div>
                        </div>

                        <form action={async (formData) => {
                            "use server";
                            await createOrder(formData)
                        }} className="relative z-10">
                            <button type="submit" className="w-full bg-primary text-white py-5 rounded-xl font-bold text-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                                Place Order <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-10 p-5 bg-green-50/50 dark:bg-green-900/10 rounded-2xl flex items-start gap-4 border border-green-100 dark:border-green-800/20 relative z-10">
                            <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <p className="text-[10px] text-green-800 dark:text-green-400 font-bold leading-relaxed uppercase tracking-widest">
                                Quality and freshness guaranteed for your Indori celebration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

