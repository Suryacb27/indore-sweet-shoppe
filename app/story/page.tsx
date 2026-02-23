import { Sparkles, Heart, History, Users, Globe } from "lucide-react"

export default function StoryPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/* Artistic Header */}
            <section className="relative h-[70vh] flex items-center justify-center bg-bg-dark">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?q=80&w=2070&auto=format&fit=crop"
                        alt="Heritage"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-dark" />
                </div>
                <div className="relative z-10 text-center px-6">
                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.5em] mb-6">
                        <History className="w-5 h-5" /> Since 1952
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter italic font-serif mb-8">
                        The <span className="text-primary">Legend</span> of Malwa
                    </h1>
                </div>
            </section>

            {/* Narrative Sections */}
            <section className="py-24 bg-bg-light dark:bg-bg-dark relative">
                <div className="absolute top-0 right-0 w-96 h-96 admin-sidebar-pattern opacity-5 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 space-y-24 text-center">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 italic font-serif mb-8">A Legacy Reborn</h2>
                        <p className="text-xl text-slate-500 font-medium leading-loose">
                            It began in the heart of Indore's Sarafa Bazaar. A small hearth, a secret recipe, and a vision to bring the royal flavors of Central India to the common man. Over seven decades later, we remain committed to the artisanal craft that made us a household name.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
                        <StoryStat icon={Heart} label="Passion" value="Pure Desi Ghee" />
                        <StoryStat icon={Users} label="Family" value="3 Generations" />
                        <StoryStat icon={Globe} label="Reach" value="Global Indore" />
                    </div>
                </div>
            </section>
        </div>
    )
}

function StoryStat({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-4 shadow-xl shadow-primary/5">
                <Icon className="w-8 h-8" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg font-black text-slate-900 dark:text-slate-100 italic font-serif">{value}</p>
        </div>
    )
}
