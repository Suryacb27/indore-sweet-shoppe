"use client";

import { useState } from "react";

interface ProductTabsProps {
    description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description");

    const tabs = [
        { id: "description", label: "Description" },
        { id: "ingredients", label: "Ingredients" },
        { id: "reviews", label: "Reviews (1.2k)" },
        { id: "shipping", label: "Shipping Info" }
    ];

    return (
        <div className="mt-20">
            <div className="border-b border-slate-200 dark:border-slate-800">
                <nav className="flex gap-12 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === tab.id
                                    ? "border-primary text-slate-900 dark:text-slate-100"
                                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="py-10 lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8 space-y-6">
                    {activeTab === "description" && (
                        <div className="prose dark:prose-invert max-w-none">
                            <h4 className="text-xl font-bold mb-4">A Taste of Tradition</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                {description}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Following a secret family recipe passed down through generations, we ensure that the sweetness is
                                perfectly balanced, never overpowering the rich, buttery flavor of the ingredients.
                                Adorned with delicate edible silver leaf (vark) where appropriate, it is the quintessential gift
                                for celebrations or a luxurious treat for yourself.
                            </p>
                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-8">
                                <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    Shelf Life & Storage
                                </h5>
                                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
                                    <li>Store in a cool, dry place away from direct sunlight.</li>
                                    <li>Shelf life: 20 days from the date of manufacturing.</li>
                                    <li>Refrigeration is recommended for prolonged freshness.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab !== "description" && (
                        <p className="text-slate-500 italic">Information about {activeTab} will be available soon.</p>
                    )}
                </div>

                {/* Recommendation Widget (Static for now to match design) */}
                <div className="hidden lg:block lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h5 className="font-bold mb-4">You might also like</h5>
                        <div className="space-y-4">
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARIth3o7nIPfqn0RUwP3NGJWNbNUjtuLK2Uuigddb7mucvjRsOwm6PQb6HwZie09fLlJ-zLG_0ouOrWVsTDaK2uf8A2n7oo_PXGF9ZLf0v_Qq7dgCQLUSnc-jqg8qrEYsm7imWWKeToZkI4BVo35Sk0l-eh4SiN2OP31VgMeAWovmnkUpfPBwT96TmLPBB1DYhsd5Y26ppqJXcB5JDT0Dra-gyssFGXWJUuWz90FtcGNK_BA435VdeRMLUsG540_rhx-_3ILHbjg" alt="Besan Ladoo" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Ghee Besan Ladoo</p>
                                    <p className="text-sm text-primary font-bold">₹350</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC18CfQUYUmO_-FYp-FnzqSMGNMGyQ3vJA82h2vcMeBGlTsYghRZVqIPRycth4-LIWiU81lEDrbivum1nPFD-5FnFYuSmmHHjePLoomCtaxMFnSYyaGkDlP3fO6RTBeo7wd6U10YHjEkF63XJzTaMlyP1xLQ0nfHorOZ3dnmBfINsXiUWh3tkrHCsVI2_gLxbADFMPtYOy7hASZz7S1JU82Zqbu3LEbOGU-_UJuaxRUSAQNMkNkZNDguIJ-WDQ9L8TPDGYIRkoAbQ" alt="Indori Sev" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Special Indori Sev</p>
                                    <p className="text-sm text-primary font-bold">₹180</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
