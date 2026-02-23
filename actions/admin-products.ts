"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { checkAdmin } from "./admin"

export async function createProduct(formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) return { error: "Unauthorized" }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const categoryId = formData.get("category_id") as string
    const price = parseFloat(formData.get("price") as string)
    const discount = parseFloat(formData.get("discount") as string || "0")
    const gstRate = parseFloat(formData.get("gst_rate") as string || "5")
    const imageUrl = formData.get("image_url") as string
    const isActive = formData.get("is_active") === "on"
    const stock = parseInt(formData.get("stock") as string || "0")

    const { data: product, error } = await supabase
        .from("products")
        .insert({
            name,
            description,
            category_id: categoryId,
            price,
            discount,
            gst_rate: gstRate,
            image_url: imageUrl,
            is_active: isActive
        })
        .select()
        .single()

    if (error) return { error: error.message }

    // Initialize inventory
    if (product) {
        await supabase.from("inventory").insert({
            product_id: product.id,
            stock: stock,
            variant: "Default"
        })
    }

    revalidatePath("/admin/products")
    revalidatePath("/products")
    return { success: true }
}

export async function deleteProduct(id: string) {
    const supabase = await checkAdmin()
    if (!supabase) return { error: "Unauthorized" }

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)

    if (error) return { error: error.message }

    revalidatePath("/admin/products")
    revalidatePath("/products")
    return { success: true }
}
