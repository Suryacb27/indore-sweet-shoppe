"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    redirect("/")
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    })

    if (error) {
        redirect(`/signup?message=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
        // Explicitly insert into profiles as requested
        const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            name: name,
            email: email, // Added email
            role: "customer",
        })

        if (profileError) {
            console.error("Profile creation error:", profileError)
            redirect(`/signup?message=${encodeURIComponent("User created but profile setup failed. Please contact support.")}`)
        }
    }

    redirect("/login?message=Check your email to verify your account")
}

export async function adminBootstrap(formData: FormData) {
    const supabase = await createClient()

    // 1. Check if any admin exists
    const { data: existingAdmin, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "admin")
        .maybeSingle()

    if (existingAdmin) {
        redirect("/login?message=Setup disabled: Admin already exists.")
    }

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    // 2. Sign up the user
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    })

    if (error) {
        redirect(`/admin-setup?message=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
        // 3. Insert as admin
        const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            name: name,
            email: email,
            role: "admin",
        })

        if (profileError) {
            console.error("Admin Profile creation error:", profileError)
            redirect(`/admin-setup?message=${encodeURIComponent("Admin user created but profile setup failed.")}`)
        }
    }

    redirect("/login?message=Admin account created. Please verify your email and login.")
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
}
