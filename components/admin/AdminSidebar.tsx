"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    Layers,
    ClipboardList,
    Home,
    User,
    ChevronRight,
    Sparkles
} from "lucide-react"

const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Layers },
    { href: "/admin/orders", label: "Orders", icon: ClipboardList },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-80 bg-white border-r border-orange-100 flex flex-col h-full sticky top-0 overflow-y-auto admin-sidebar-pattern relative group/sidebar">
            <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] z-0" />
            <div className="relative z-10 flex flex-col h-full">
                {/* Header / Logo */}
                <div className="p-8 border-b border-orange-50">
                    <Link href="/" className="group flex flex-col">
                        <span className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors italic leading-none font-serif">
                            Indore Sweet Shoppe
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 leading-none mt-2 opacity-80 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Admin Portal
                        </span>
                    </Link>
                </div>

                {/* User Profile Info */}
                <div className="p-8 border-b border-orange-50 bg-[#FFFDF9]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-100">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-0.5">Primary Admin</p>
                            <p className="font-serif italic text-lg text-gray-900">Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                group flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                                ${isActive
                                        ? 'bg-orange-600 text-white shadow-xl shadow-orange-100 translate-x-1'
                                        : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                                    }
                            `}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-6 border-t border-orange-50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 p-4 text-gray-400 hover:text-gray-900 font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Storefront
                    </Link>
                </div>
            </div>
        </aside>
    )
}
