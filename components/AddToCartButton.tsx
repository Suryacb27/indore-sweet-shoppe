"use client"

import { addToCart } from "@/actions/cart"
import { Plus, Check, Loader2 } from "lucide-react"
import { useTransition, useState } from "react"

export default function AddToCartButton({ productId }: { productId: string }) {
    const [isPending, startTransition] = useTransition()
    const [added, setAdded] = useState(false)

    return (
        <button
            onClick={() => {
                if (added) return
                startTransition(async () => {
                    const formData = new FormData()
                    formData.append("productId", productId)
                    formData.append("quantity", "1")
                    const result = await addToCart(formData)

                    if (result.error) {
                        alert(result.error)
                    } else {
                        setAdded(true)
                        setTimeout(() => setAdded(false), 2000)
                    }
                })
            }}
            disabled={isPending || added}
            className={`
                p-3 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center
                ${added
                    ? 'bg-green-500 text-white scale-110'
                    : 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white hover:-translate-y-1 active:scale-95'
                }
                ${isPending ? 'opacity-50' : ''}
            `}
            title={added ? "Added!" : "Add to Selection"}
        >
            {isPending ? (
                <Loader2 className="w-6 h-6 animate-spin" />
            ) : added ? (
                <Check className="w-6 h-6 animate-in zoom-in" />
            ) : (
                <Plus className="w-6 h-6" />
            )}
        </button>
    )
}
