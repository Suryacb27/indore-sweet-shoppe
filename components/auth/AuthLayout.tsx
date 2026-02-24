"use client"

import React from "react"
import Link from "next/link"

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
    activeTab: "login" | "signup"
}

export default function AuthLayout({ children, title, subtitle, activeTab }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f8f7f5] dark:bg-[#221c10] text-slate-900 dark:text-slate-100 flex flex-col font-['Newsreader',_serif]">
            {/* Header */}
            <header className="w-full border-b border-[#f2a60d]/20 bg-[#f8f7f5]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="text-[#f2a60d]">
                                <span className="material-symbols-outlined text-4xl leading-none">bakery_dining</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Indore Sweet Shoppe</h1>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center py-12 px-6">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-[#f2a60d]/20">
                    {/* Left Side: Aesthetic Visual */}
                    <div className="hidden lg:block relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#221c10]/80 to-transparent z-10"></div>
                        <img
                            alt="Premium Sweets"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsPU4MiR0n5GqVprUnEp5FB4jENpULz5pi3ayHJ1xXAI-6jVo4_yI7nMRvFkCPUix9L_IEYdQ7uQmne9GHGRmwyeKgvGfSCqSqbuwl47ChspUeG0yz6Je2lveJ4hhM5IrNB9ugVgUZj4Ld1SzEk-DTj2gXlN1kC9NlKrQaHf6aFT4O72jBdyIUfEyXD8eXz56GXxWUVPpFIqQVMPGBEYeEK27UnqVP50hU1F-dGQoMnfCzeCDMZm0ErpXjYOUaDsUSHS5lKFIXYQ"
                        />
                        <div className="absolute bottom-12 left-12 z-20 text-white max-w-sm">
                            <h2 className="text-4xl font-serif font-bold mb-4">A Taste of Tradition</h2>
                            <p className="text-lg opacity-90 leading-relaxed font-serif italic">"Experience the authentic flavors of Malwa, crafted with love and pure ingredients."</p>
                        </div>
                    </div>

                    {/* Right Side: Auth Card */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="mb-8 text-center lg:text-left">
                            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">{title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">{subtitle}</p>
                        </div>

                        {/* Tabs Container */}
                        <div className="mb-8">
                            <div className="flex border-b border-slate-200 dark:border-slate-800">
                                <Link
                                    href="/login"
                                    className={`flex-1 py-4 text-sm font-bold border-b-2 text-center tracking-wide uppercase transition-colors ${activeTab === "login"
                                            ? "border-[#f2a60d] text-[#f2a60d]"
                                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className={`flex-1 py-4 text-sm font-bold border-b-2 text-center tracking-wide uppercase transition-colors ${activeTab === "signup"
                                            ? "border-[#f2a60d] text-[#f2a60d]"
                                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>

                        {/* Form Section */}
                        {children}

                        {/* Admin Access Footer */}
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-sm text-slate-500 mb-4">Are you a part of our management team?</p>
                            <Link href="/login" className="inline-flex items-center gap-2 text-[#f2a60d] font-bold hover:underline transition-all">
                                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                <span>Admin Access</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-[#f2a60d]/10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 Indore Sweet Shoppe. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-slate-500 hover:text-[#f2a60d]">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-slate-500 hover:text-[#f2a60d]">Terms of Service</Link>
                        <Link href="#" className="text-xs text-slate-500 hover:text-[#f2a60d]">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
