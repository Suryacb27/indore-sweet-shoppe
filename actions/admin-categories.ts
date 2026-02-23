"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { checkAdmin } from "./admin"

export async function createCategory(formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) return { error: "Unauthorized" }

    const name = formData.get("name") as string
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const imageUrl = formData.get("image_url") as string
    const isActive = formData.get("is_active") === "on"

    const { error } = await supabase
        .from("categories")
        .insert({
            name,
            slug,
            image_url: imageUrl,
            is_active: isActive
        })

    if (error) return { error: error.message }

    revalidatePath("/admin/categories")
    revalidatePath("/")
    return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await checkAdmin()
    if (!supabase) return { error: "Unauthorized" }

    const name = formData.get("name") as string
    const imageUrl = formData.get("image_url") as string
    const isActive = formData.get("is_active") === "on"

    const { error } = await supabase
        .from("categories")
        .update({
            name,
            image_url: imageUrl,
            is_active: isActive
        })
        .eq("id", id)

    if (error) return { error: error.message }

    revalidatePath("/admin/categories")
    revalidatePath("/")
    return { success: true }
}

export async function deleteCategory(id: string) {
    const supabase = await checkAdmin()
    if (!supabase) return { error: "Unauthorized" }

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)

    if (error) return { error: error.message }

    revalidatePath("/admin/categories")
    revalidatePath("/")
    return { success: true }
}
