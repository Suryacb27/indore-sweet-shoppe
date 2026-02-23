import { signup } from "@/actions/auth"
import Link from "next/link"
import { Sparkles, ArrowRight, User, Mail, Lock, Heart } from "lucide-react"

export default function SignupPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark">
            {/* Left Side: Artistic Visual (Desktop) */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?q=80&w=2070&auto=format&fit=crop"
                    alt="Traditional Indian Sweets"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12 text-center backdrop-blur-[2px]">
                    <div className="bg-primary p-4 rounded-3xl text-white mb-8 shadow-2xl shadow-primary/20 animate-bounce">
                        <span className="material-symbols-outlined text-5xl">bakery_dining</span>
                    </div>
                    <h2 className="text-white text-6xl font-black tracking-tighter drop-shadow-2xl mb-6 uppercase">Begin Your <br /><span className="text-primary italic">Sweet</span> Journey</h2>
                    <p className="text-white/90 text-xl font-bold tracking-widest uppercase opacity-80 max-w-sm border-t border-white/20 pt-6">Join our community of legendary taste seekers.</p>
                </div>
                {/* Mandala Pattern Overlay */}
                <div className="absolute top-0 left-0 w-full h-full admin-sidebar-pattern opacity-10 pointer-events-none" />
            </div>

            {/* Right Side: Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-[-100px] left-[-100px] w-80 h-80 admin-sidebar-pattern opacity-5 pointer-events-none -rotate-12" />
                <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 admin-sidebar-pattern opacity-5 pointer-events-none rotate-45" />

                <div className="w-full max-w-md relative z-10">
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
                            <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined block text-2xl">bakery_dining</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter leading-none uppercase text-slate-900 dark:text-slate-100">Indore</h1>
                                <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">Sweet Shoppe</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Sparkles className="w-4 h-4" /> Fresh Start
                        </div>
                        <h3 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-4">Join Us</h3>
                        <p className="text-slate-500 font-bold text-sm tracking-wide">Create your account to unlock the full Indori experience.</p>
                    </div>

                    <form action={signup} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                                    <User className="w-3 h-3" /> Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 shadow-sm transition-all"
                                    placeholder="Rahul Sharma"
                                />
                            </div>
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                                    <Mail className="w-3 h-3" /> Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 shadow-sm transition-all"
                                    placeholder="rahul@example.com"
                                />
                            </div>
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary">
                                    <Lock className="w-3 h-3" /> Chosen Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 shadow-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="premium-button w-full flex items-center justify-center gap-3 text-lg py-5 group"
                        >
                            Create Free Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {searchParams?.message && (
                        <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                            <p className="text-xs font-black text-primary uppercase tracking-widest">{searchParams.message}</p>
                        </div>
                    )}

                    <div className="mt-12 text-center pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-slate-400 font-bold text-sm">
                            Already part of the tradition?{" "}
                            <Link href="/login" className="text-primary hover:underline transition-all underline-offset-4 decoration-2">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest pointer-events-none">
                    Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Indore
                </div>
            </div>
        </div>
    )
}

