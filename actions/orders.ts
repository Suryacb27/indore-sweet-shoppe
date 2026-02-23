"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createOrder(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // 1. Get cart items
    const { data: cartItems } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("user_id", user.id)

    if (!cartItems || cartItems.length === 0) {
        return { error: "Cart is empty" }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.products.price * item.quantity), 0)
    const delivery = subtotal > 500 ? 0 : 50
    const total = subtotal + delivery

    // 2. Execute Atomic Order Transaction via RPC
    const { data: orderId, error: orderError } = await supabase.rpc('create_order_transaction', {
        p_user_id: user.id,
        p_total_amount: total,
        p_items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.products.price
        }))
    })

    if (orderError) return { error: orderError.message }

    // 3. Clear cart
    await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)

    revalidatePath("/cart")
    revalidatePath("/admin/orders")

    redirect(`/checkout/success?orderId=${orderId}`)
}
