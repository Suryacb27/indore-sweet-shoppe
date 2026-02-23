import { createClient } from "@/lib/supabase/server"
import { createProduct, deleteProduct } from "@/actions/admin"
import { Product, Category } from "@/lib/types"
import { Package, Plus, Sparkles, Pencil, Trash2, Camera } from "lucide-react"

export default async function ProductsAdmin() {
    const supabase = await createClient()

    const { data: products } = await supabase
        .from("products")
        .select("*, categories(name)")
        .order("created_at", { ascending: false })

    const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true })

    return (
        <div className="space-y-12 pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 font-serif italic mb-2">Inventory Control</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-orange-400" /> Management of artisanal collections
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <div className="bg-white p-8 rounded-[3rem] border border-orange-50 shadow-2xl shadow-orange-100/20 sticky top-32">
                        <h2 className="text-2xl font-black text-gray-900 font-serif italic mb-8 border-b border-orange-50 pb-6">New Sweet</h2>

                        <form action={createProduct} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Product Name</label>
                                    <input name="name" required className="admin-input" placeholder="e.g. Special Guna" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Category</label>
                                    <select name="categoryId" required className="admin-input">
                                        <option value="">Select Category</option>
                                        {categories?.map((c: Category) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Price (₹)</label>
                                        <input name="price" type="number" step="0.01" required className="admin-input" placeholder="450" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Stock (kg/unit)</label>
                                        <input name="stock" type="number" required className="admin-input" placeholder="50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Image URL</label>
                                    <div className="relative">
                                        <Camera className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input name="imageUrl" className="admin-input pl-14" placeholder="Unsplash/Direct link..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Description</label>
                                    <textarea name="description" className="admin-input min-h-[100px]" placeholder="Flavor notes, ingredients..." />
                                </div>
                            </div>
                            <button className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 active:scale-95">
                                <Plus className="w-6 h-6" /> Add to Catalog
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-[3rem] border border-orange-50 shadow-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#FFFDF9] border-b border-orange-50 text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                <tr>
                                    <th className="px-8 py-6">Sweet Details</th>
                                    <th className="px-8 py-6 text-center">Stock</th>
                                    <th className="px-8 py-6 text-right">Price</th>
                                    <th className="px-8 py-6 text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-50">
                                {products?.map((product: Product) => (
                                    <tr key={product.id} className="hover:bg-orange-50/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-gray-50 flex-shrink-0">
                                                    <img src={product.image_url || ''} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-0.5">{product.categories?.name}</p>
                                                    <p className="font-bold text-gray-900">{product.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center font-bold text-gray-500 italic font-serif">
                                            {product.stock} <span className="text-[10px] font-black uppercase text-gray-400 ml-1">left</span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-gray-900 italic font-serif">₹{product.price}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-3 text-gray-300 hover:text-orange-600 transition-colors hover:bg-white rounded-xl shadow-sm">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <form action={async () => { "use server"; await deleteProduct(product.id) }}>
                                                    <button className="p-3 text-gray-300 hover:text-red-500 transition-colors hover:bg-white rounded-xl shadow-sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
                .admin-input {
                    width: 100%;
                    background-color: #FFFDF9;
                    border: 1px solid #ffedd5;
                    border-radius: 1rem;
                    padding: 1rem 1.25rem;
                    outline: none;
                    transition: all 0.2s;
                    font-weight: 700;
                    color: #111827;
                }
                .admin-input:focus {
                    border-color: #ea580c;
                    box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.05);
                }
                .admin-input::placeholder {
                    color: #d1d5db;
                }
            `}</style>
        </div>
    )
}
