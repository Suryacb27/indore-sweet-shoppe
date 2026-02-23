import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Package } from "lucide-react"
import ProductCard from "@/components/ui/ProductCard"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { category?: string }
}) {
    const supabase = await createClient()

    // Get category details if slug is provided
    let category = null
    if (searchParams.category) {
        const { data: catData } = await supabase
            .from("categories")
            .select("*")
            .eq("slug", searchParams.category)
            .single()
        category = catData
    }

    let query = supabase
        .from("products")
        .select("*, categories(*)")
        .eq("is_active", true)

    if (category) {
        query = query.eq("category_id", category.id)
    }

    const { data: products } = await query

    const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Breadcrumbs productName="Collection" category={category ? { name: category.name, slug: category.slug } : undefined} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                        {category ? category.name : "Our Sweet Collection"}
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        {category?.description || "Experience the authentic taste of Indore. Hand-crafted, premium sweets made with pure desi ghee and tradition."}
                    </p>
                </div>

                <div className="w-full md:w-auto">
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/products"
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${!searchParams.category ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-primary/30'}`}
                        >
                            All Products
                        </Link>
                        {categories?.map(cat => (
                            <Link
                                key={cat.id}
                                href={`/products?category=${cat.slug}`}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${searchParams.category === cat.slug ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-primary/30'}`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCY3eQdkoRDpZC-7D9iOo2eNzC4LjJrpACiOoSlhhm0hdYkmc26gnAxsJfMwVovSzXjI0HuUnEuXlyf_jzHA4DNQKmBh5Je-0VCSzY1NlTDeE0DmzSbCgkhWHfYxzD8m8RtkFTWFcrkwEcdU62VLYwtPE3dw2xX8EGx7I3lXJl4mVrmD9DA-yLtHOrKRKZj5GHV5j2y9gkd2fwMhv7zgsH9T1nnOW9KYyeWs6EUX95Ti8yx8loix6SCa_9ty-A2PT-_ygYxYT5LSA"}
                        weight={product.weight || "500g"}
                        rating={4.8}
                        reviewCount={Math.floor(Math.random() * 200) + 50}
                    />
                ))}
            </div>

            {(!products || products.length === 0) && (
                <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-400">No delicacies found in this category.</h3>
                    <p className="text-slate-400 mt-2">Check back soon for freshly prepared batches!</p>
                </div>
            )}
        </div>
    )
}


