import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ProductDetailContent from "@/components/sections/ProductDetailContent"

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const supabase = await createClient()

    // Fetch product with category
    const { data: product } = await supabase
        .from("products")
        .select("*, categories(*)")
        .eq("id", params.id)
        .single()

    if (!product) {
        notFound()
    }

    // Fetch variants from inventory
    const { data: variants } = await supabase
        .from("inventory")
        .select("*")
        .eq("product_id", params.id)
        .order("variant", { ascending: true })

    return <ProductDetailContent product={product} variants={variants || []} />
}

