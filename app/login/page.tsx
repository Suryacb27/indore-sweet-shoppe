import React from "react"
import AuthLayout from "@/components/auth/AuthLayout"
import LoginForm from "@/components/auth/LoginForm"

export const metadata = {
    title: "Login - Indore Sweet Shoppe",
    description: "Login to your account at Indore Sweet Shoppe.",
}

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome to Our Shoppe"
            subtitle="Join our family for exclusive offers and faster checkout."
            activeTab="login"
        >
            <LoginForm />
        </AuthLayout>
    )
}
