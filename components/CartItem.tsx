"use client"

import { useState, useTransition } from "react"
import { Trash2, Plus, Minus, Loader2 } from "lucide-react"
import { removeFromCart, updateCartQuantity } from "@/actions/cart"

interface CartItemProps {
    item: {
        id: string
        quantity: number
        products: {
            id: string
            name: string
            price: number
            image_url: string
            categories?: {
                name: string
            }
        }
    }
}

export default function CartItem({ item }: CartItemProps) {
    const [isPending, startTransition] = useTransition()
    const [localQuantity, setLocalQuantity] = useState(item.quantity)

    const handleQuantityChange = (newQty: number) => {
        if (newQty < 1) return
        setLocalQuantity(newQty)
        startTransition(async () => {
            await updateCartQuantity(item.id, newQty)
        })
    }

    const handleRemove = () => {
        startTransition(async () => {
            await removeFromCart(item.id)
        })
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm transition-all duration-300 ${isPending ? 'opacity-50 grayscale-[0.5]' : 'hover:shadow-xl hover:shadow-orange-100/50'}`}>
            <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shadow-inner bg-[#FFFDF9] flex-shrink-0 relative group">
                <img
                    src={item.products.image_url || `https://images.unsplash.com/photo-1589119634710-86d4957f72da?q=80&w=2070&auto=format&fit=crop`}
                    alt={item.products.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between w-full h-full">
                <div className="mb-4 sm:mb-0">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-1 block opacity-80">
                        {item.products.categories?.name || 'Handcrafted'}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2 font-serif">{item.products.name}</h3>
                    <p className="text-orange-600 font-black text-xl flex items-baseline gap-1">
                        <span className="text-sm">₹</span>
                        {item.products.price}
                    </p>
                </div>

                <div className="flex flex-col items-start sm:items-end justify-between gap-4">
                    <div className="flex items-center gap-4 bg-[#FFFDF9] border border-orange-100 rounded-2xl p-1 shadow-inner">
                        <button
                            onClick={() => handleQuantityChange(localQuantity - 1)}
                            disabled={isPending || localQuantity <= 1}
                            className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl transition-all active:scale-90 disabled:opacity-30"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-black text-gray-900 text-lg tabular-nums">
                            {localQuantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(localQuantity + 1)}
                            disabled={isPending}
                            className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl transition-all active:scale-90"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={handleRemove}
                        disabled={isPending}
                        className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-red-500 transition-colors py-2 px-3 hover:bg-red-50 rounded-xl"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove Selection</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
