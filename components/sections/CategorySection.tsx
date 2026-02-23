import Link from "next/link";

interface Category {
    id: string;
    name: string;
    slug: string;
    image_url: string;
    description?: string;
}

interface CategorySectionProps {
    categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
    // If no categories provided, we use the ones from the design as fallback or placeholder
    const displayCategories = categories?.length > 0 ? categories.slice(0, 3) : [
        {
            id: "1",
            name: "Traditional Mithai",
            slug: "mithai",
            image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuClwy9vX7ZQTfsOU_ri54O3DB44plkfcypBNntYJV_HKAPNU8e5_QLXqMNs9kVvFCsN6-LI8pP6XC3hqYyVD3udL5sOnUCPV16mu9f54-tE5midg6nwMqn9qG6hFVvoL8wMcuVRCQ_DMCBya31jk95srHlH8XCkN8EEAcLie1X2bWctSCvQaa1O5SKBrfyabW0Ze9wrNgLJ0Jf5rsAQZZg-R-MolIBX3EGyI1cyBZOI6QRxWKCkTOAYEIf73SIRgt9KiBGr1t7IKQ",
            description: "Signature Laddoos & Katlis"
        },
        {
            id: "2",
            name: "Savory Namkeen",
            slug: "namkeen",
            image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9DZBdta-hu3nWYrSAEZP46d1t8Fa5PJO_-207Ujcy4Rvv9iaMHvebpudwIks-LYPQo3M3GSXooWuQinX8TWFUaysOLfKqB6UwH07okPvXweIrREiryCRusyvLaGfmGJlZG2vM6UTEMKG3F2_BD6gBGWU0GzTXQsKYA869EivopCPz6vea_sYz2AKJM3MKWj4fflquN-TEOE1mXSsASG82WNBXfFaEHMo3qclTPtby3ZTalJKEpkcbxb-x07JJwPCt6AVwIItliw",
            description: "Famous Indori Sev & Snacks"
        },
        {
            id: "3",
            name: "Fusion Cakes",
            slug: "cakes",
            image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrJJ_lHL7kVbCVH7eUqFTfeyGacvhLg3tCp9OXtQFg5oHqJSTWp7_aoHMwcYuZKTQnJom21wCANRCzznw_mIbKGiQ3hRyZ8v6x-gGRyT8C1ROAHw6PXm8coARaOBFX283ums10G-miLVQClsS7VnmZaWV8_j1h5vue3h1h5wqL0_LwsNOBnSI9Qc6Bvf7FqJW052zwnFalJa7tMna3cKL1mTbR8qXt3tdcWcUo_5sJPspnqOy9XMC-pFMNgDS2hJZIlpJtb68Rug",
            description: "Contemporary Celebrations"
        }
    ];

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-md">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-4">Curated Collections</h2>
                    <p className="text-slate-500 dark:text-slate-400">Explore our diverse range of traditional hand-crafted delicacies made with 100% pure desi ghee.</p>
                </div>
                <Link className="text-primary font-bold flex items-center gap-2 group" href="/products">
                    View All Categories <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">trending_flat</span>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
                    >
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={category.name}
                            src={category.image_url}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                            <p className="text-slate-300 text-sm">{category.description || "Premium Selection"}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
