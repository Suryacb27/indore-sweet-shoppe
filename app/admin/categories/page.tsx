import { createClient } from "@/lib/supabase/server"
import { createCategory } from "@/actions/admin"
import { Category } from "@/lib/types"
import { Layers, Plus, Sparkles, Pencil, Trash2 } from "lucide-react"

export default async function CategoriesAdmin() {
    const supabase = await createClient()
    const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true })

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 font-serif italic mb-2">Category Library</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-orange-400" /> Organize your sweet collections
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Create Category Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/20 sticky top-32">
                        <h2 className="text-xl font-black text-gray-900 font-serif italic mb-6 flex items-center gap-3">
                            <Plus className="w-5 h-5 text-orange-600" /> New Category
                        </h2>

                        <form action={createCategory} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Category Name</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full bg-[#FFFDF9] border border-orange-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all placeholder:text-gray-300 font-bold"
                                    placeholder="e.g. Traditional Mithai"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full bg-[#FFFDF9] border border-orange-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all placeholder:text-gray-300 font-bold min-h-[120px]"
                                    placeholder="Briefly describe what goes into this collection..."
                                />
                            </div>
                            <button className="w-full py-5 bg-orange-600 text-white rounded-[1.5rem] font-black text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95">
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/10 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#FFFDF9] border-b border-orange-50">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Description</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-50">
                                {categories?.map((category: Category) => (
                                    <tr key={category.id} className="hover:bg-orange-50/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 font-black">
                                                    {category.name[0]}
                                                </div>
                                                <span className="font-bold text-gray-900">{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 max-w-xs">{category.description || 'No description provided'}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-300 hover:text-orange-600 transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
