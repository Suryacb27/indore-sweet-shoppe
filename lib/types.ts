export interface Profile {
    id: string
    created_at: string
    name: string | null
    phone: string | null
    email?: string | null
    role: "customer" | "admin"
}

export interface Category {
    id: string
    created_at: string
    name: string
    slug: string
    image_url: string | null
    is_active: boolean
    description?: string | null
}

export interface Product {
    id: string
    created_at: string
    name: string
    description: string
    category_id: string
    price: number
    discount: number
    gst_rate: number
    image_url: string | null
    is_active: boolean
    stock?: number
    categories?: Category
    inventory?: Inventory[]
}

export interface Inventory {
    id: string
    product_id: string
    variant: string
    stock: number
}

export interface CartItem {
    id: string
    user_id: string
    product_id: string
    quantity: number
    products: Product
}

export interface Order {
    id: string
    created_at: string
    user_id: string
    total_amount: number
    payment_status: "pending" | "paid" | "failed"
    order_status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
    profiles?: Profile
    status?: string // added for UI compatibility
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    quantity: number
    price: number
}
