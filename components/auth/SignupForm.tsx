"use client"

import React, { useState } from "react"
import { useFormStatus } from "react-dom"
import { signup } from "@/actions/auth"

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        try {
            const result = await signup(formData)
            if (result?.error) {
                setError(result.error)
            }
        } catch (err: any) {
            // In Next.js, redirects throw an error. In production, the message is omitted.
            // If it's a redirect, we shouldn't show an error.
            if (err.message && (err.message.includes("NEXT_REDIRECT") || err.digest?.includes("NEXT_REDIRECT"))) {
                return;
            }
            // If we are here, it's a real error.
            setError("An unexpected error occurred. Please try again.")
            console.error(err)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                    <input
                        name="name"
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#f2a60d] focus:border-[#f2a60d] transition-all text-base outline-none dark:text-white"
                        placeholder="John Doe"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#f2a60d] focus:border-[#f2a60d] transition-all text-base outline-none dark:text-white"
                        placeholder="example@email.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#f2a60d] focus:border-[#f2a60d] transition-all text-base outline-none dark:text-white"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#f2a60d] hover:bg-[#f2a60d]/90 text-slate-900 font-bold py-4 rounded-lg shadow-lg shadow-[#f2a60d]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
                <SubmitButton />
            </button>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <>
            <span>{pending ? "Creating Account..." : "Join our Family"}</span>
            {!pending && <span className="material-symbols-outlined leading-none">person_add</span>}
        </>
    )
}
