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
            role: "customer",
        })

        if (profileError) {
            console.error("Profile creation error:", profileError)
            redirect(`/signup?message=${encodeURIComponent("User created but profile setup failed. Please contact support.")}`)
        }
    }

    redirect("/login?message=Check your email to verify your account")
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
}
