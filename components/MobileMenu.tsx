"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, LayoutDashboard, Package, Home, LogOut } from "lucide-react"
import Link from "next/link"

interface MobileMenuProps {
    user: any
    role: string | null
    cartCount: number
}

export default function MobileMenu({ user, role, cartCount }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-orange-100 shadow-2xl z-50 animate-in slide-in-from-top duration-500 gold-filigree-border overflow-hidden">
                    <div className="absolute inset-0 admin-sidebar-pattern opacity-5 pointer-events-none" />
                    <nav className="relative z-10 flex flex-col p-8 space-y-6">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 text-sm font-black text-gray-900 hover:text-orange-600 transition-all uppercase tracking-widest"
                        >
                            <Home className="w-5 h-5 text-orange-600" /> Home
                        </Link>
                        <Link
                            href="/products"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 text-sm font-black text-gray-900 hover:text-orange-600 transition-all uppercase tracking-widest"
                        >
                            <Package className="w-5 h-5 text-orange-600" /> Our Collection
                        </Link>
                        <Link
                            href="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between text-sm font-black text-gray-900 hover:text-orange-600 transition-all uppercase tracking-widest"
                        >
                            <div className="flex items-center gap-4">
                                <ShoppingCart className="w-5 h-5 text-orange-600" /> Cart Selection
                            </div>
                            {cartCount > 0 && <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full shadow-lg shadow-orange-100">{cartCount} items</span>}
                        </Link>

                        {role === "admin" && (
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-sm font-black text-orange-600 border border-orange-100 bg-orange-50/50 p-4 rounded-[1.5rem] uppercase tracking-widest"
                            >
                                <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                            </Link>
                        )}

                        <div className="pt-8 border-t border-orange-50">
                            {user ? (
                                <form action="/api/auth/signout" method="POST">
                                    <button type="submit" className="flex items-center gap-4 text-sm font-black text-red-500 w-full px-2 uppercase tracking-widest">
                                        <LogOut className="w-5 h-5 text-red-400" /> Secure Sign Out
                                    </button>
                                </form>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </div>
    )
}
