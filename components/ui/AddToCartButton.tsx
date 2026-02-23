"use client";

import { useTransition, useState } from "react";
import { addToCart } from "@/actions/cart";
import { ShoppingCart, Loader2 } from "lucide-react";

interface AddToCartButtonProps {
    productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("productId", productId);
            formData.append("quantity", "1");

            const result = await addToCart(formData);

            if (result.success) {
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2000);
            } else if (result.error) {
                alert(result.error);
            }
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isPending || isAdded}
            className={`
                p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center
                ${isAdded ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}
                ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            title={isAdded ? "Added!" : "Add to Cart"}
        >
            {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : isAdded ? (
                <span className="material-symbols-outlined text-xl">check</span>
            ) : (
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
            )}
        </button>
    );
}
