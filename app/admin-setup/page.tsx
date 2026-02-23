import { adminBootstrap } from "@/actions/auth"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Sparkles, ArrowRight, User, Lock, ShieldCheck } from "lucide-react"

export default async function AdminSetupPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    const supabase = await createClient()

    // Check if any admin exists to disable the page if one does
    const { data: existingAdmin } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "admin")
        .maybeSingle()

    if (existingAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-light dark:bg-bg-dark p-6">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 shadow-2xl text-center">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-4">Setup Disabled</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">An administrator already exists for this system. Please use the standard login page.</p>
                    <Link href="/login" className="premium-button inline-flex items-center gap-3">
                        Go to Login <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-hidden">
                <div className="w-full max-w-md relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Sparkles className="w-4 h-4" /> System Initialization
                        </div>
                        <h3 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-4">Admin Setup</h3>
                        <p className="text-slate-500 font-bold text-sm tracking-wide">Securely bootstrap the first administrator for Indore Sweet Shoppe.</p>
                    </div>

                    <form action={adminBootstrap} className="space-y-6">
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

                        <button type="submit" className="premium-button w-full flex items-center justify-center gap-3 text-lg py-5 group">
                            Initialize First Admin <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </form>

                    {searchParams?.message && (
                        <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 flex items-center gap-4">
                            <p className="text-xs font-black text-primary uppercase tracking-widest">{searchParams.message}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Informational (Desktop only) */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-24 text-center">
                    <div className="bg-orange-600/20 p-6 rounded-full mb-8 border border-orange-500/30">
                        <ShieldCheck className="w-16 h-16 text-orange-500" />
                    </div>
                    <h2 className="text-white text-4xl font-black tracking-tighter mb-6 uppercase">Secure Bootstrap</h2>
                    <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">This page is for system initialization only. It will automatically disable once the first administrator is created for security purposes.</p>
                </div>
                <div className="absolute inset-0 admin-sidebar-pattern opacity-10 pointer-events-none" />
            </div>
        </div>
    )
}
