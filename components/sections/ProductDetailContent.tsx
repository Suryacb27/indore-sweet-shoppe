"use client";

import { useState } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import VariantSelector from "@/components/ui/VariantSelector";
import AddToCartLarge from "@/components/ui/AddToCartLarge";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProductTabs from "@/components/ui/ProductTabs";

interface ProductDetailContentProps {
    product: any;
    variants: any[];
}

export default function ProductDetailContent({ product, variants }: ProductDetailContentProps) {
    const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

    const price = selectedVariant ?
        (product.price * (parseFloat(selectedVariant.variant) / 500)) : // Crude logic if variant is weight-based
        product.price;

    // If price logic is handled in DB per variant, update Here. 
    // For now, using the product price from Stitch design as base.

    const discountPrice = product.discount > 0 ?
        product.price - (product.price * (product.discount / 100)) :
        null;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs
                category={product.categories}
                productName={product.name}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Image Gallery */}
                <div className="lg:col-span-7">
                    <ImageGallery
                        mainImage={product.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDotVCvmI6hWgZhhQZnC0mHs4Nj3zPMdBn0n_qjVQhC0_-bQNtNd2CrR_zT8E4hsl8-B3RlPcxbLsLBHUACUBWnPKcjeSYiJhkcwLt_DzL5JN318_qSwoyyYcOpFtF9tsVEYTklpY7qtBUbd6ONYwpkbhojoHKBh3u7rBKi8-TLLgJcLEqhuyakyEIKC8DJfnX0YHNcL8Ek6zVOhS5J92VMAGvwy1RcxeqtkiRJ5J7Ud5_YG3lDTxxuU3_hSg-_UNL-pEnF3oaSmw"}
                        productName={product.name}
                    />
                </div>

                {/* Right: Product Information */}
                <div className="lg:col-span-5 space-y-8 sticky top-28 h-fit">
                    <div>
                        {product.discount > 0 && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded mb-3">
                                Best Seller
                            </span>
                        )}
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2">
                            {product.name}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-symbols-outlined ${i < 4 ? 'fill-1' : ''}`}>
                                    {i < 4 ? 'star' : 'star_half'}
                                </span>
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-500 underline cursor-pointer">
                            4.8 (1.2k Reviews)
                        </span>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                                ₹{product.price}
                            </span>
                            {product.discount > 0 && (
                                <>
                                    <span className="text-xl text-slate-400 line-through">
                                        ₹{Math.round(product.price / (1 - product.discount / 100))}
                                    </span>
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 italic">Inclusive of all taxes (GST {product.gst_rate}%)</p>
                    </div>

                    {/* Variants Selector */}
                    <VariantSelector
                        variants={variants}
                        selectedVariantId={selectedVariant?.id}
                        onSelect={setSelectedVariant}
                    />

                    {/* Quantity & Buttons */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                                <button className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700">
                                    <span className="material-symbols-outlined text-lg">remove</span>
                                </button>
                                <span className="px-4 py-2 font-bold text-sm">1</span>
                                <button className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                                {selectedVariant?.stock > 0 ? 'Limited stock available for today' : 'Out of Stock'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <AddToCartLarge
                                productId={product.id}
                                variantId={selectedVariant?.id}
                                disabled={selectedVariant?.stock === 0}
                            />
                            <WhatsAppButton productName={product.name} />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col items-center text-center p-2">
                            <span className="material-symbols-outlined text-primary mb-1">eco</span>
                            <span className="text-[10px] font-bold uppercase text-slate-500">100% Pure</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2">
                            <span className="material-symbols-outlined text-primary mb-1">local_shipping</span>
                            <span className="text-[10px] font-bold uppercase text-slate-500">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2">
                            <span className="material-symbols-outlined text-primary mb-1">workspace_premium</span>
                            <span className="text-[10px] font-bold uppercase text-slate-500">Gift Box</span>
                        </div>
                    </div>
                </div>
            </div>

            <ProductTabs description={product.description} />
        </main>
    );
}
