import Link from "next/link";

interface HeroSectionProps {
    title?: React.ReactNode;
    subtitle?: string;
    image?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

export default function HeroSection({
    title = <>Taste the <span className="text-primary italic">Tradition</span> of Indore</>,
    subtitle = "Experience the luxury of hand-crafted, saffron-infused premium Indian sweets delivered from our heritage kitchen to your doorstep.",
    image = "https://lh3.googleusercontent.com/aida-public/AB6AXuB174rd3ZajwbfrRF96lD6R1xWfGcnFHFhM1h0mEqqg7tHOJercSWojOmyQ70YIeAAsjJYjsxeynXIo1DrIkhqkTn2gA567TGpxQBbPBWwv99mHQTM1jor1dHrpu8wi82o68XNf_spd83g7cPrbPrqG044yaqGWwBbswU_H-BeCCt2SJsMF6I3_sCrGxybcy0gS_EF8EjsXCUWJdatwHMm26o4CL0Hw1LWtPP_FSEMGUyLJ3YjJkcQLPcfc4oPjpQSjGPBtg0m60g",
    ctaText = "Shop Collection",
    ctaLink = "/products",
    secondaryCtaText = "Festive Gifting",
    secondaryCtaLink = "/gifts",
}: HeroSectionProps) {
    return (
        <section className="relative h-[85vh] w-full overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    alt="Hero"
                    src={image}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start text-white">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                    Est. 1952 • Authentic Indori Flavors
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 max-w-2xl">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-10 font-light leading-relaxed">
                    {subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href={ctaLink}
                        className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        {ctaText} <span className="material-symbols-outlined">arrow_right_alt</span>
                    </Link>
                    <Link
                        href={secondaryCtaLink}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all"
                    >
                        {secondaryCtaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
