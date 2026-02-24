import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export const updateSession = async (request: NextRequest) => {
    // This `try/catch` block is only here to avoid unexpected errors when
    // refreshing a session.
    try {
        // Create an unmodified response
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        })

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            request.cookies.set(name, value)
                        )
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        })
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        // This will refresh session if expired - required for Server Components
        // https://supabase.com/docs/guides/auth/server-side/nextjs
        const { data: { user } } = await supabase.auth.getUser()

        // 1. Protect /admin routes (but not /admin/login itself)
        if (
            request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/admin/login')
        ) {
            if (!user) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }

            // Fetch role from profiles
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .maybeSingle()

            if (profile?.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }

        // 2. Protect customer routes
        if (
            request.nextUrl.pathname.startsWith('/profile') ||
            request.nextUrl.pathname.startsWith('/checkout')
        ) {
            if (!user) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }

        return response
    } catch (e) {
        // If you are here, a Supabase client could not be created!
        // This is probably because you have a local development environment
        // that is still setting up.
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        })
    }
}
