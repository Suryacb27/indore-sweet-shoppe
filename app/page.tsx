import { createClient } from "@/lib/supabase/server"
import HeroSection from "@/components/sections/HeroSection"
import CategorySection from "@/components/sections/CategorySection"
import ProductCard from "@/components/ui/ProductCard"
import TrustBadges from "@/components/sections/TrustBadges"
import FestiveGifting from "@/components/sections/FestiveGifting"

export default async function Home() {
  const supabase = await createClient()

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)

  // Fetch best sellers (first 4 products)
  const { data: bestSellers } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("is_active", true)
    .limit(4)

  return (
    <div className="flex flex-col">
      {/* Luxury Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection categories={categories || []} />

      {/* Best Sellers Grid */}
      <section className="py-24 bg-primary/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-slate-100">Our Best Sellers</h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The flavors that made us famous. Hand-selected favorites loved by generations of Indoris.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCY3eQdkoRDpZC-7D9iOo2eNzC4LjJrpACiOoSlhhm0hdYkmc26gnAxsJfMwVovSzXjI0HuUnEuXlyf_jzHA4DNQKmBh5Je-0VCSzY1NlTDeE0DmzSbCgkhWHfYxzD8m8RtkFTWFcrkwEcdU62VLYwtPE3dw2xX8EGx7I3lXJl4mVrmD9DA-yLtHOrKRKZj5GHV5j2y9gkd2fwMhv7zgsH9T1nnOW9KYyeWs6EUX95Ti8yx8loix6SCa_9ty-A2PT-_ygYxYT5LSA"}
                weight={product.weight || "500g"}
                rating={4.5} // Placeholder as db doesn't have it
                reviewCount={120} // Placeholder
              />
            ))}

            {/* Fallback if no products in DB yet */}
            {(!bestSellers || bestSellers.length === 0) && [1, 2, 3, 4].map((i) => (
              <ProductCard
                key={i}
                name={`Premium Product ${i}`}
                description="Delicious artisanal sweet handcrafted for perfection."
                price={850}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCY3eQdkoRDpZC-7D9iOo2eNzC4LjJrpACiOoSlhhm0hdYkmc26gnAxsJfMwVovSzXjI0HuUnEuXlyf_jzHA4DNQKmBh5Je-0VCSzY1NlTDeE0DmzSbCgkhWHfYxzD8m8RtkFTWFcrkwEcdU62VLYwtPE3dw2xX8EGx7I3lXJl4mVrmD9DA-yLtHOrKRKZj5GHV5j2y9gkd2fwMhv7zgsH9T1nnOW9KYyeWs6EUX95Ti8yx8loix6SCa_9ty-A2PT-_ygYxYT5LSA"
                weight="500g"
                rating={5}
                reviewCount={100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Festive Gifting Banner */}
      <FestiveGifting />

      {/* Features/Trust Badges */}
      <TrustBadges />
    </div>
  )
}