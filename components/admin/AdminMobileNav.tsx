"use client"

import { useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"
import AdminSidebar from "./AdminSidebar"

export default function AdminMobileNav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:hidden">
            {/* Header for mobile admin */}
            <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-900 italic font-serif leading-none">Indore Sweet Shoppe</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-600 mt-1 opacity-80 flex items-center gap-1">
                        <Sparkles className="w-2 h-2" /> Admin
                    </span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
                    <div className="w-80 h-full bg-white animate-in slide-in-from-left duration-300">
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="h-[calc(100%-80px)]" onClick={() => setIsOpen(false)}>
                            <AdminSidebar />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
