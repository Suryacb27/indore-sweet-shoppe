"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { adminLogin } from "@/actions/auth"
import { ShieldCheck, ArrowLeft } from "lucide-react"

export default function AdminLoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        const result = await adminLogin(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            {/* Back to store */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Store
            </Link>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500/30 mb-6">
                        <ShieldCheck className="w-8 h-8 text-orange-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                        Admin Access
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        Indore Sweet Shoppe — Management Portal
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 bg-red-950/50 border border-red-800 text-red-400 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
                            <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                Admin Email
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
                                    mail
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder:text-slate-500 outline-none text-sm"
                                    placeholder="admin@indoresweetshoppe.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
                                    lock
                                </span>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder:text-slate-500 outline-none text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <SubmitButton />
                    </form>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-600 mt-6">
                    Not an admin?{" "}
                    <Link href="/login" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">
                        Customer login →
                    </Link>
                </p>
            </div>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl shadow-lg shadow-orange-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2 text-sm uppercase tracking-widest"
        >
            {pending ? (
                <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    Verifying...
                </>
            ) : (
                <>
                    <ShieldCheck className="w-4 h-4" />
                    Sign In to Dashboard
                </>
            )}
        </button>
    )
}
