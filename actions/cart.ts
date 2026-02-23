"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addToCart(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "You must be logged in to add items to cart" }
    }

    const productId = formData.get("productId") as string
    const quantity = parseInt(formData.get("quantity") as string || "1")

    // Check if item already in cart
    const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

    if (existingItem) {
        const { error } = await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + quantity })
            .eq("id", existingItem.id)

        if (error) return { error: error.message }
    } else {
        const { error } = await supabase
            .from("cart_items")
            .insert({
                user_id: user.id,
                product_id: productId,
                quantity
            })

        if (error) return { error: error.message }
    }

    revalidatePath("/cart")
    revalidatePath("/products")
    return { success: true }
}

export async function removeFromCart(cartItemId: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId)

    if (error) return { error: error.message }

    revalidatePath("/cart")
    return { success: true }
}

export async function updateCartQuantity(cartItemId: string, quantity: number) {
    const supabase = await createClient()

    if (quantity <= 0) {
        return removeFromCart(cartItemId)
    }

    const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", cartItemId)

    if (error) return { error: error.message }

    revalidatePath("/cart")
    return { success: true }
}
