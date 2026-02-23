import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { User, MapPin, Package, Settings, LogOut, Sparkles } from "lucide-react"
import { logout } from "@/actions/auth"

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.4em] mb-4">
                        <Sparkles className="w-4 h-4" /> Guest of Honor
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-8">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-2xl shadow-primary/10">
                                <User className="w-12 h-12 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter italic font-serif">{profile?.name || user.email}</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">{user.email}</p>
                            </div>
                        </div>
                        <form action={logout}>
                            <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </form>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileCard icon={Package} title="Order History" description="Track your recent Indori delicacies." />
                    <ProfileCard icon={MapPin} title="Saved Address" description="Manage your delivery locations." />
                    <ProfileCard icon={Settings} title="Account Settings" description="Update your legendary profile." />

                    {profile?.role === "admin" && (
                        <Link href="/admin" className="col-span-1 md:col-span-2">
                            <button className="w-full bg-orange-600 p-8 rounded-[2.5rem] border border-orange-500 shadow-xl shadow-orange-200/20 hover:shadow-2xl hover:shadow-orange-300/30 hover:-translate-y-1 transition-all text-left group">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-white italic font-serif mb-2">Admin Dashboard</h3>
                                <p className="text-sm text-orange-100 font-medium">Access the command center for orders and inventory.</p>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProfileCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <button className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-primary/10 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all text-left group">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 italic font-serif mb-2">{title}</h3>
            <p className="text-sm text-slate-400 font-medium">{description}</p>
        </button>
    )
}
