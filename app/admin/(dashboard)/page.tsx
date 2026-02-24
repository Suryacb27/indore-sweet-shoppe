import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Order } from "@/lib/types"
import {
    ShoppingBag,
    CircleDollarSign,
    Package,
    Users,
    ArrowUpRight,
    TrendingUp,
    Clock
} from "lucide-react"

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch stats
    const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })

    const { data: orders } = await supabase
        .from("orders")
        .select("total_amount")

    const revenue = orders?.reduce((acc: number, o: any) => acc + o.total_amount, 0) || 0

    const { count: totalProducts } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })

    const { data: recentOrders } = await supabase
        .from("orders")
        .select("*, profiles(name)")
        .order("created_at", { ascending: false })
        .limit(5)

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-black text-gray-900 font-serif italic mb-2">Dashboard Overview</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Welcome back to the command center</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={`₹${revenue.toLocaleString()}`}
                    icon={CircleDollarSign}
                    color="orange"
                />
                <StatCard
                    label="Active Orders"
                    value={totalOrders?.toString() || "0"}
                    icon={ShoppingBag}
                    color="blue"
                />
                <StatCard
                    label="Total Sweets"
                    value={totalProducts?.toString() || "0"}
                    icon={Package}
                    color="purple"
                />
                <StatCard
                    label="Customer Base"
                    value="1.2k"
                    icon={Users}
                    color="green"
                    trend="+12%"
                />
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/20 overflow-hidden">
                <div className="p-8 border-b border-orange-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 font-serif italic mb-1 flex items-center gap-3">
                            <Clock className="w-5 h-5 text-orange-600" /> Recent Orders
                        </h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Late activity monitor</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-black text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest">
                        View All <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FFFDF9] border-b border-orange-50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50">
                            {recentOrders?.map((order: any) => (
                                <tr key={order.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-6 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                                    <td className="px-8 py-6 font-bold text-gray-900">{order.profiles?.name || 'In-store Guest'}</td>
                                    <td className="px-8 py-6">
                                        <span className={`
                                            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                                            ${order.order_status === 'completed' ? 'bg-green-100 text-green-600' :
                                                order.order_status === 'processing' ? 'bg-orange-100 text-orange-600' :
                                                    'bg-gray-100 text-gray-500'}
                                        `}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-gray-900 italic font-serif">₹{order.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

interface StatCardProps {
    label: string
    value: string
    icon: any
    color: 'orange' | 'blue' | 'purple' | 'green'
    trend?: string
}

function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
    const colors = {
        orange: 'text-orange-600 bg-orange-50 border-orange-100',
        blue: 'text-blue-600 bg-blue-50 border-blue-100',
        purple: 'text-purple-600 bg-purple-50 border-purple-100',
        green: 'text-green-600 bg-green-50 border-green-100',
    }

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colors[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{label}</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-gray-900 font-serif italic leading-none">{value}</h3>
                    {trend && (
                        <span className="flex items-center gap-1 text-green-500 font-black text-[10px] bg-green-50 px-2 py-1 rounded-lg">
                            <TrendingUp className="w-3 h-3" /> {trend}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
