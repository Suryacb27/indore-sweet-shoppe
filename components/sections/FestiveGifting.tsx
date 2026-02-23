export default function FestiveGifting() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="relative bg-primary rounded-3xl overflow-hidden p-12 md:p-20 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern height="40" id="pattern-gold" patternUnits="userSpaceOnUse" width="40" x="0" y="0">
                                <path d="M0 40L40 0M0 0l40 40" fill="none" stroke="white" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#pattern-gold)" height="100%" width="100%"></rect>
                    </svg>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Exquisite Festive Gifting</h2>
                        <p className="text-xl text-white/90 mb-8 max-w-lg">
                            Share the sweetness of tradition with our hand-packed, luxury gift hampers. Perfectly curated for Diwali, weddings, and corporate occasions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors">
                                Customize Your Box
                            </button>
                            <button className="bg-black/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-bold text-lg hover:bg-black/30 transition-colors">
                                Download Catalog
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img
                            className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                            alt="Festive Gifting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc0jMWYkCkXdlcHFJm1og2oRR91_oNvwz2QNYc3yh0uYaHL8pGRZHPvXV1EVDeSwdr7squHwqMMTxNqZFd8TMYQxaxgmKjakOkqoRoDbtXdo7f4ChIiuZYfSgTbK2aenPYdh2efQT54pdtC7BR_KxgVdVmJKACfL-sFKOWgiGe-YJaE7ldDR5UbIpLB_h6sBlw9H14LOWZmsCm3A4BiSW3vSUemCpPXDBVhHXVZ4NuXNfLhPvDTAucOsZ9pDxajqAwuKb6OsSIwg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
