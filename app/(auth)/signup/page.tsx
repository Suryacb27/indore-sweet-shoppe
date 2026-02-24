import React from "react"
import AuthLayout from "@/components/auth/AuthLayout"
import SignupForm from "@/components/auth/SignupForm"

export const metadata = {
    title: "Sign Up - Indore Sweet Shoppe",
    description: "Create a new account at Indore Sweet Shoppe.",
}

export default function SignupPage() {
    return (
        <AuthLayout
            title="Welcome to Our Shoppe"
            subtitle="Join our family for exclusive offers and faster checkout."
            activeTab="signup"
        >
            <SignupForm />
        </AuthLayout>
    )
}
