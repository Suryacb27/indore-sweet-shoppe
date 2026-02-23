"use client";

interface Variant {
    id: string;
    variant: string;
    stock: number;
}

interface VariantSelectorProps {
    variants: Variant[];
    selectedVariantId?: string;
    onSelect: (variant: Variant) => void;
}

export default function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
    if (variants.length === 0) return null;

    return (
        <div className="space-y-4">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Select Weight</p>
            <div className="flex flex-wrap gap-3">
                {variants.map((v) => {
                    const isSelected = selectedVariantId === v.id;
                    return (
                        <button
                            key={v.id}
                            onClick={() => onSelect(v)}
                            disabled={v.stock === 0}
                            className={`px-6 py-2.5 rounded-full border-2 text-sm font-bold transition-all ${isSelected
                                    ? "border-primary bg-primary/5 text-slate-900 dark:text-slate-100"
                                    : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary/50"
                                } ${v.stock === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            {v.variant}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
