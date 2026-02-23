"use client";

import { useTransition, useState } from "react";
import { addToCart } from "@/actions/cart";
import { Loader2 } from "lucide-react";

interface AddToCartLargeProps {
    productId: string;
    variantId?: string;
    disabled?: boolean;
}

export default function AddToCartLarge({ productId, variantId, disabled }: AddToCartLargeProps) {
    const [isPending, startTransition] = useTransition();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (added || disabled) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("productId", productId);
            if (variantId) formData.append("variantId", variantId);
            formData.append("quantity", "1");

            const result = await addToCart(formData);

            if (result.error) {
                alert(result.error);
            } else {
                setAdded(true);
                setTimeout(() => setAdded(false), 3000);
            }
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isPending || added || disabled || !variantId}
            className={`
        w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
        ${(disabled || !variantId) ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' :
                    added ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'}
      `}
        >
            {isPending ? (
                <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
                <>
                    <span className="material-symbols-outlined">{added ? 'check' : 'shopping_bag'}</span>
                    {added ? 'Added to Cart' : !variantId ? 'Select a variant' : 'Add to Cart'}
                </>
            )}
        </button>
    );
}
