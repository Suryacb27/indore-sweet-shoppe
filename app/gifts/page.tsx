import { Sparkles, Package, ArrowRight, Gift, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function GiftsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 bg-bg-dark overflow-hidden">
                <div className="absolute inset-0 admin-sidebar-pattern opacity-5" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.4em] mb-6">
                        <Sparkles className="w-5 h-5" /> The Art of Gifting
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 italic font-serif">
                        Indore <span className="text-primary italic">Signature</span> Curations
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-12">
                        Legendary sweets, handcrafted boxes, and the warmth of Indori tradition. Perfectly curated for your most special occasions.
                    </p>
                </div>
            </section>

            {/* Collection Grid */}
            <section className="py-24 bg-bg-light dark:bg-bg-dark">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <GiftingCategory
                            title="Festive Hampers"
                            description="Celebrating the spirit of Malwa with our most luxurious selections."
                            image="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop"
                        />
                        <GiftingCategory
                            title="Wedding Collections"
                            description="Elegance in every bite for your timeless celebrations."
                            image="https://images.unsplash.com/photo-1545601445-4d6a0a056a20?q=80&w=1974&auto=format&fit=crop"
                        />
                        <GiftingCategory
                            title="Corporate Gifting"
                            description="Premium artisanal hampers for your valued partners."
                            image="https://images.unsplash.com/photo-1549463591-24c1852bdc24?q=80&w=2070&auto=format&fit=crop"
                        />
                        <GiftingCategory
                            title="Custom Boxes"
                            description="Your favorites, your style. Create your own Indori signature."
                            image="https://images.unsplash.com/photo-1521917441209-e886f0404a7b?q=80&w=2060&auto=format&fit=crop"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

function GiftingCategory({ title, description, image }: { title: string, description: string, image: string }) {
    return (
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                <h3 className="text-3xl font-black mb-3 tracking-tight italic font-serif">{title}</h3>
                <p className="text-slate-300 font-medium text-sm max-w-xs mb-8">{description}</p>
                <Link href="/products" className="inline-flex items-center gap-3 bg-primary px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20">
                    Explore <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
