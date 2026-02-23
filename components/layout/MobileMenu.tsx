"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu, Search, ShoppingBag, User, ChevronRight } from "lucide-react";

interface MobileMenuProps {
    cartCount: number;
    user: any;
    role?: string;
}

export default function MobileMenu({ cartCount, user, role = "customer" }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "Mithai", href: "/products?category=mithai" },
        { name: "Namkeen", href: "/products?category=namkeen" },
        { name: "Cakes", href: "/products?category=cakes" },
        { name: "Gifts", href: "/gifts" },
        { name: "Our Story", href: "/story" },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-primary/10 rounded-full transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Menu */}
            <div className={`fixed top-0 right-0 z-[101] h-full w-[80%] max-w-sm bg-bg-light dark:bg-bg-dark shadow-2xl transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between border-b border-primary/10">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined text-xl">bakery_dining</span>
                            </div>
                            <span className="font-black text-lg text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Indore</span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-500" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-6">
                        <div className="flex items-center bg-primary/5 dark:bg-primary/10 rounded-xl px-4 py-3 border border-primary/10 focus-within:border-primary/40 transition-all">
                            <Search className="w-5 h-5 text-primary" />
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 text-slate-700 dark:text-slate-300 ml-2"
                                placeholder="Search delicacies..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-6 space-y-2 overflow-y-auto py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 text-slate-700 dark:text-slate-300 font-bold group transition-all"
                            >
                                {link.name}
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                            </Link>
                        ))}
                    </nav>

                    {/* User & Actions */}
                    <div className="p-6 border-t border-primary/10 space-y-4 bg-primary/5 dark:bg-primary/10">
                        <Link
                            href={user ? (role === "admin" ? "/admin" : "/profile") : "/login"}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-primary/10"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                {role === "admin" ? (
                                    <span className="material-symbols-outlined">dashboard</span>
                                ) : (
                                    <User className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 dark:text-slate-100">
                                    {user ? (role === "admin" ? 'Admin Dashboard' : 'My Profile') : 'Login or Sign Up'}
                                </p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                    {user ? (role === "admin" ? 'Manage System' : 'Account Settings') : 'Join the tradition'}
                                </p>
                            </div>
                        </Link>

                        {user && (
                            <form action="/api/auth/signout" method="POST">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-red-100 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                                </button>
                            </form>
                        )}

                        <Link
                            href="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20"
                        >
                            <div className="flex items-center gap-4">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="font-bold">My Selection</span>
                            </div>
                            <span className="bg-white text-primary text-xs font-black min-w-[24px] h-6 rounded-full flex items-center justify-center px-1.5">
                                {cartCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
