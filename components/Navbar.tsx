import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ShoppingCart, LogOut, User, Sparkles } from "lucide-react"
import MobileMenu from "./MobileMenu"

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let role = null
    let cartCount = 0

    if (user) {
        // Fetch role
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single()
        role = profile?.role

        // Fetch cart count
        const { count } = await supabase
            .from("cart_items")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
        cartCount = count || 0
    }

    return (
        <nav className="sticky top-0 z-50 bg-[#FFFDF9]/90 backdrop-blur-xl border-b border-orange-100/50 shadow-sm transition-all duration-300">
            {/* Decorative Top Border (Indian motif inspired) */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="group flex flex-col pt-1">
                            <span className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-orange-600 transition-colors italic leading-none">
                                Indore Sweet Shoppe
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 leading-none mt-1 ml-0.5 opacity-80">
                                Authenticity Guaranteed
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-12">
                        <Link href="/" className="text-xs font-black text-gray-600 hover:text-orange-600 transition-all uppercase tracking-[0.2em] relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full" />
                        </Link>
                        <Link href="/products" className="text-xs font-black text-gray-600 hover:text-orange-600 transition-all uppercase tracking-[0.2em] relative group">
                            Collection
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full" />
                        </Link>

                        {role === "admin" && (
                            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-black text-orange-600 bg-orange-50 px-5 py-2.5 rounded-full border border-orange-100 hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95">
                                <Sparkles className="w-3 h-3" /> Admin Portal
                            </Link>
                        )}
                    </div>

                    {/* Action Icons Area */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <Link
                                    href="/cart"
                                    className="relative p-3.5 text-gray-600 hover:text-orange-600 bg-white border border-orange-50 rounded-2xl shadow-sm transition-all hover:-translate-y-1 active:scale-95 group"
                                >
                                    <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black text-white shadow-xl ring-4 ring-white animate-in zoom-in">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <div className="h-8 w-px bg-orange-100/50" />

                                <form action="/api/auth/signout" method="POST">
                                    <button
                                        type="submit"
                                        className="p-3.5 text-gray-400 hover:text-red-500 transition-all hover:rotate-12 active:scale-90"
                                        title="Secure Sign Out"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-10 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-100/20 hover:-translate-y-1 active:scale-95"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Component */}
                    <MobileMenu user={user} role={role} cartCount={cartCount} />
                </div>
            </div>
        </nav>
    )
}
