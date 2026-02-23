export default function ShippingPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-8 italic font-serif tracking-tighter uppercase">Returns & Shipping</h1>
            <div className="prose prose-slate dark:prose-invert font-medium text-slate-500 leading-relaxed space-y-8">
                <section>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">1. Delivery Coverage</h2>
                    <p>We ship our delicacies across India and selected global regions. Packaging is designed to maintainSarafa Bazaar freshness.</p>
                </section>
                <section>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">2. Perishables Policy</h2>
                    <p>Due to the nature of our fresh artisanal sweets, returns are only accepted if the packaging is compromised upon arrival.</p>
                </section>
            </div>
        </div>
    )
}
