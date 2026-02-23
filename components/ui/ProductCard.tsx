import { ShoppingCart, Star, Heart } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
    id?: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    weight?: string;
}

export default function ProductCard({
    id,
    name,
    description,
    price,
    image,
    rating = 5,
    reviewCount = 0,
    weight = "500g",
}: ProductCardProps) {
    return (
        <div className="bg-bg-light dark:bg-bg-dark rounded-xl overflow-hidden border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
            <div className="relative aspect-square overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt={name}
                    src={image}
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                </button>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-primary text-sm ${i < Math.floor(rating) ? 'fill-current' : ''}`}>
                            {i < Math.floor(rating) ? 'star' : i < rating ? 'star_half' : 'star'}
                        </span>
                    ))}
                    {reviewCount > 0 && (
                        <span className="text-xs text-slate-400 ml-1">({reviewCount})</span>
                    )}
                </div>
                <h3 className="font-bold text-lg mb-1">{name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-1">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-primary font-black text-xl">
                        ₹{price.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ {weight}</span>
                    </span>
                    <AddToCartButton productId={id!} />
                </div>
            </div>
        </div>
    );
}
