import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let cartCount = 0;
    let role = "customer";
    if (user) {
        const [{ count }, { data: profile }] = await Promise.all([
            supabase
                .from("cart_items")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id),
            supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .maybeSingle()
        ]);
        cartCount = count || 0;
        role = profile?.role || "customer";
    }

    return (
        <header className="sticky top-0 z-50 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <span className="material-symbols-outlined block text-2xl">bakery_dining</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight leading-none uppercase text-slate-900 dark:text-slate-100">Indore</h1>
                        <p className="text-[10px] tracking-[0.2em] font-medium text-primary uppercase">Sweet Shoppe</p>
                    </div>
                </Link>

                {/* Main Nav (Desktop) */}
                <nav className="hidden lg:flex items-center gap-10">
                    <Link className="text-sm font-semibold hover:text-primary transition-colors text-slate-700 dark:text-slate-300" href="/products?category=mithai">Mithai</Link>
                    <Link className="text-sm font-semibold hover:text-primary transition-colors text-slate-700 dark:text-slate-300" href="/products?category=namkeen">Namkeen</Link>
                    <Link className="text-sm font-semibold hover:text-primary transition-colors text-slate-700 dark:text-slate-300" href="/products?category=cakes">Cakes</Link>
                    <Link className="text-sm font-semibold hover:text-primary transition-colors text-slate-700 dark:text-slate-300" href="/gifts">Gifts</Link>
                    <Link className="text-sm font-semibold hover:text-primary transition-colors text-slate-700 dark:text-slate-300" href="/story">Our Story</Link>
                </nav>

                {/* Search & Icons */}
                <div className="flex items-center gap-2 md:gap-6">
                    <div className="hidden md:flex items-center bg-primary/5 dark:bg-primary/10 rounded-full px-4 py-2 border border-primary/10 focus-within:border-primary/40 transition-all">
                        <span className="material-symbols-outlined text-primary text-xl">search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-32 xl:w-48 placeholder:text-slate-400 text-slate-700 dark:text-slate-300"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-1 md:gap-4">
                        {user ? (
                            <>
                                {role === "admin" ? (
                                    <Link href="/admin" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-colors">
                                        <span className="material-symbols-outlined text-sm">dashboard</span> Admin
                                    </Link>
                                ) : (
                                    <Link href="/profile" className="hidden sm:flex p-2 hover:bg-primary/10 rounded-full transition-colors relative text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined">person</span>
                                    </Link>
                                )}
                                <form action="/api/auth/signout" method="POST" className="hidden sm:block">
                                    <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors">
                                        <span className="material-symbols-outlined">logout</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link href="/login" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest px-4 py-2">Login</Link>
                                <Link href="/signup" className="text-[10px] font-black bg-primary text-white uppercase tracking-widest px-4 py-2 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all">Sign Up</Link>
                            </div>
                        )}

                        <Link href="/cart" className="p-2 hover:bg-primary/10 rounded-full transition-colors relative text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <MobileMenu cartCount={cartCount} user={user} role={role} />
                    </div>
                </div>
            </div>
        </header>
    );
}

