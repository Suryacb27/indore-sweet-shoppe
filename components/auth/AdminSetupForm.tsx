"use client"

import { useState } from "react"
import { adminBootstrap } from "@/actions/auth"
import { Sparkles, User, Lock, ShieldCheck } from "lucide-react"

export default function AdminSetupForm() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        setIsPending(true)
        try {
            const result = await adminBootstrap(formData)
            if (result?.error) {
                setError(result.error)
            }
        } catch (err: any) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-4">
                    <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest">{error}</p>
                </div>
            )}

            <div className="space-y-5">
                <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                        <User className="w-3 h-3" /> Admin Name
                    </label>
                    <input id="name" name="name" type="text" required className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 shadow-sm transition-all" placeholder="Master Admin" />
                </div>
                <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                        <Lock className="w-3 h-3" /> Admin Email
                    </label>
                    <input id="email" name="email" type="email" required className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 shadow-sm transition-all" placeholder="admin@indoresweetshoppe.com" />
                </div>
                <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                        <Lock className="w-3 h-3" /> Secure Password
                    </label>
                    <input id="password" name="password" type="password" required className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 shadow-sm transition-all" placeholder="••••••••" />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="premium-button w-full flex items-center justify-center gap-3 text-lg py-5 group disabled:opacity-50"
            >
                {isPending ? "Initializing..." : (
                    <>
                        Initialize First Admin <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                )}
            </button>
        </form>
    )
}
