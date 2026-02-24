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
        const msg = error.message.toLowerCase()
        if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
            return { error: "Incorrect email or password. Please try again." }
        }
        if (msg.includes("email not confirmed")) {
            return { error: "Please confirm your email address before logging in." }
        }
        return { error: error.message }
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
        return { error: error.message }
    }

    if (data.user) {
        // Explicitly insert into profiles as requested
        const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            name: name,
            role: "customer",
        })

        if (profileError) {
            console.error("Profile creation error:", profileError)
            return { error: `User created but profile setup failed: ${profileError.message}` }
        }
    }

    redirect("/")
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
        throw new Error("Setup disabled: Admin already exists.")
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
        throw new Error(error.message)
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
            throw new Error("Admin user created but profile setup failed.")
        }
    }

    redirect("/")
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
}

export async function adminLogin(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // 1. Sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        const msg = error.message.toLowerCase()
        if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
            return { error: "Incorrect email or password. Please try again." }
        }
        return { error: error.message }
    }

    // 2. Validate role — sign out immediately and reject if not admin
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle()

    if (profile?.role !== "admin") {
        await supabase.auth.signOut()
        return { error: "Access denied. Admin credentials required." }
    }

    // 3. Role confirmed — redirect to admin dashboard
    redirect("/admin")
}
