"use client";

import { useState } from "react";

interface ImageGalleryProps {
    mainImage: string;
    productName: string;
}

export default function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
    // In a real app, we might have multiple images. For now, we'll use the main one 
    // and some placeholders to match the design fidelity.
    const images = [
        mainImage,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuByp5JOhgKq4z85YY82KmQFxJtYrumBJwfcho1IymqmTMxnBC0QWS6YVYUIyBCkKAuEbQRO1Wa23-nNAUhEcumNPg7wRUAnTgOg-LmF3_rHwYnnIpEsxn1Wp8q9at66HuD3mz3raJ1sdZz9x2qphp8s9__OdRJaCr-9I2NH8H5ud1SblWbkoZJCMe-AXBCMLV8NV-PV9Fr-n3WHqS0zv0vH-V5kiQOn-BUikBxIyh1tzaNI3c4sa8rNSArWpMx_xwM_RfOfcoBdoQ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCny4VWmVt7RPyYMkJV68EZDGGO_8b_G30fMssP-dbjKjqsvuWhC7B4St9YGa0bgSy5F3Lv0El70bD82y21TVxp2N7ilEacABCkZNJYIvSF2_HD2IgzKhwen1pnobGtPDhkWhpoE5b6yukc-h3f5Xpg6t7t2U3wGtenUsFyoEOPFTZWzzNRsVlQg4Z0ghIyRDjowb99tvu1_qsBwBmyjxViXoOkLMP4P70tKwFMk_qyfn5wCC59RaBFe64SjrBgSXlITjGFT9nH4A",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDJHvJVPYwZLrISbqbAsbJ-wDjh1NS95ZTZdnVxu5ZWpUrY-FxHezjUQGe26Oag7apjWZP7sTnukQOd2tn1twX6Q7HSIYYoWwScHjvcP2zoH8UKhigLIvB3Nwv0OB7NqFRXG2dOGVU3fgdYCyy_JA0XDNxMFJhOmPyIhgZeUwbxm5Z8NzOn18x8OGw-c103PZurVLrADfo9T17ytNyCffi4YmulyaeAdnIsjtHPU2fFmaqQLnanGb7OViir8jJP35MyOKvDs4wlYw"
    ];

    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm relative group">
                <img
                    src={images[activeImage]}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`aspect-square bg-white dark:bg-slate-800 rounded-lg overflow-hidden border-2 transition-all shadow-sm ${activeImage === idx ? "border-primary" : "border-transparent hover:border-primary/50"
                            }`}
                    >
                        <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
