export default function TrustBadges() {
    const badges = [
        { icon: "eco", title: "Pure Desi Ghee", desc: "Authentic premium ingredients" },
        { icon: "schedule", title: "Fresh Daily", desc: "Batch-made every morning" },
        { icon: "public", title: "Global Shipping", desc: "Taste of Indore, anywhere" },
        { icon: "verified", title: "Heritage Recipes", desc: "Passed down for 70 years" }
    ];

    return (
        <section className="py-16 border-t border-primary/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {badges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">{badge.title}</h4>
                            <p className="text-sm text-slate-500">{badge.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
