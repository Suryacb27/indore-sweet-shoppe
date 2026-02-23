"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function checkAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

    if (profile?.role !== "admin") return null

    return supabase
}

// Product Actions
export async function createProduct(formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const categoryId = formData.get("categoryId") as string
    const imageUrl = formData.get("imageUrl") as string
    const stock = parseInt(formData.get("stock") as string || "0")

    const { error } = await supabase.from("products").insert({
        name,
        description,
        price,
        category_id: categoryId,
        image_url: imageUrl,
        stock
    })

    if (error) throw new Error(error.message)
    revalidatePath("/admin/products")
    revalidatePath("/products")
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const categoryId = formData.get("categoryId") as string
    const imageUrl = formData.get("imageUrl") as string
    const stock = parseInt(formData.get("stock") as string || "0")

    const { error } = await supabase.from("products").update({
        name,
        description,
        price,
        category_id: categoryId,
        image_url: imageUrl,
        stock
    }).eq("id", id)

    if (error) throw new Error(error.message)
    revalidatePath("/admin/products")
    revalidatePath("/products")
}

export async function deleteProduct(id: string) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) throw new Error(error.message)
    revalidatePath("/admin/products")
    revalidatePath("/products")
}

// Category Actions
export async function createCategory(formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const description = formData.get("description") as string

    const { error } = await supabase.from("categories").insert({ name, description })

    if (error) throw new Error(error.message)
    revalidatePath("/admin/categories")
    revalidatePath("/")
}

export async function deleteCategory(id: string) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (error) throw new Error(error.message)
    revalidatePath("/admin/categories")
    revalidatePath("/")
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const description = formData.get("description") as string

    const { error } = await supabase.from("categories").update({ name, description }).eq("id", id)
    if (error) throw new Error(error.message)
    revalidatePath("/admin/categories")
    revalidatePath("/")
}

// Order Actions
export async function updateOrderStatus(orderId: string, status: string) {
    const supabase = await checkAdmin()
    if (!supabase) throw new Error("Unauthorized")

    const { error } = await supabase
        .from("orders")
        .update({ order_status: status }) // fixed field name from status to order_status
        .eq("id", orderId)

    if (error) throw new Error(error.message)
    revalidatePath("/admin/orders")
}
