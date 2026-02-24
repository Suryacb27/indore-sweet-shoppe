import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminMobileNav from "@/components/admin/AdminMobileNav"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/admin/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()

    if (profile?.role !== "admin") {
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-[#FFFDF9] lg:flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-screen sticky top-0">
                <AdminSidebar />
            </div>

            {/* Mobile Navigation */}
            <AdminMobileNav />

            <main className="flex-1 min-h-screen p-6 lg:p-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
