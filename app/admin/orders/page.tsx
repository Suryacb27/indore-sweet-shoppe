import { createClient } from "@/lib/supabase/server"
import { updateOrderStatus } from "@/actions/admin"
import { Order } from "@/lib/types"
import { ClipboardList, Sparkles, Filter, MoreVertical, Package, Truck, CheckCircle2, Clock } from "lucide-react"

export default async function OrdersAdmin() {
    const supabase = await createClient()

    const { data: orders } = await supabase
        .from("orders")
        .select("*, profiles(name, email, phone, role)") // adding phone for shipping visibility
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-12 pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 font-serif italic mb-2">Order Management</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-orange-400" /> Track and process artisanal deliveries
                    </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-orange-100 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm shadow-orange-100/10">
                    <Filter className="w-4 h-4" /> Filter Status
                </button>
            </header>

            <div className="bg-white rounded-[3rem] border border-orange-50 shadow-2xl shadow-orange-100/20 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#FFFDF9] border-b border-orange-50 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="px-8 py-6">Order Info</th>
                            <th className="px-8 py-6">Customer</th>
                            <th className="px-8 py-6">Shipping Details</th>
                            <th className="px-8 py-6">Amount</th>
                            <th className="px-8 py-6">Current Status</th>
                            <th className="px-8 py-6 text-right">Update Progression</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                        {orders?.map((order: Order) => (
                            <tr key={order.id} className="hover:bg-orange-50/20 transition-colors group">
                                <td className="px-8 py-8">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs text-orange-600 font-black mb-1">#{order.id.slice(0, 8)}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-8">
                                    <div className="flex flex-col">
                                        <span className="font-black text-gray-900 leading-tight">{order.profiles?.name || 'Guest'}</span>
                                        <span className="text-[10px] font-bold text-gray-400 truncate max-w-[150px]">{order.profiles?.email}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-8">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400">
                                            <Sparkles className="w-3 h-3 text-orange-400" /> Default Address
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 line-clamp-2">
                                            {/* @ts-ignore */}
                                            {order.profiles?.address || "Address not provided"}
                                        </span>
                                        <span className="text-[10px] font-black text-orange-600 tracking-widest">
                                            {order.profiles?.phone || "No phone"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-8 font-black text-gray-900 italic font-serif text-lg">
                                    ₹{order.total_amount}
                                </td>
                                <td className="px-8 py-8">
                                    <StatusBadge status={order.order_status} />
                                </td>
                                <td className="px-8 py-8 text-right">
                                    <div className="flex justify-end gap-2">
                                        <form action={async (formData) => { "use server"; await updateOrderStatus(order.id, "processing") }}>
                                            <button className="p-3 bg-[#FFFDF9] border border-orange-100 rounded-xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95" title="Move to Processing">
                                                <Package className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <form action={async (formData) => { "use server"; await updateOrderStatus(order.id, "shipped") }}>
                                            <button className="p-3 bg-[#FFFDF9] border border-orange-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95" title="Mark as Shipped">
                                                <Truck className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <form action={async (formData) => { "use server"; await updateOrderStatus(order.id, "completed") }}>
                                            <button className="p-3 bg-[#FFFDF9] border border-orange-100 rounded-xl text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm active:scale-95" title="Complete Order">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders?.length === 0 && (
                <div className="py-24 text-center">
                    <ClipboardList className="w-20 h-20 text-orange-100 mx-auto mb-6" />
                    <h2 className="text-2xl font-serif italic text-gray-900">No Orders in Catalog</h2>
                    <p className="text-gray-400 font-medium">As sweets find their homes, they will appear here.</p>
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const config: any = {
        'pending': { color: 'bg-gray-100 text-gray-500', icon: Clock },
        'processing': { color: 'bg-orange-100 text-orange-600', icon: Package },
        'shipped': { color: 'bg-blue-100 text-blue-600', icon: Truck },
        'completed': { color: 'bg-green-100 text-green-600', icon: CheckCircle2 },
        'cancelled': { color: 'bg-red-100 text-red-600', icon: CheckCircle2 },
    }

    const { color, icon: Icon } = config[status] || config['pending']

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${color}`}>
            <Icon className="w-3.5 h-3.5" /> {status}
        </span>
    )
}
