import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="bg-primary/10 p-8 rounded-full mb-8">
                <PackageSearch className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">
                Delicacy Not Found
            </h1>
            <p className="text-lg text-slate-500 max-w-md mb-10 capitalize">
                It seems the sweet you're looking for has already been savored or doesn't exist in our heritage kitchen yet.
            </p>
            <Link
                href="/products"
                className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined">shopping_basket</span>
                Explore Collection
            </Link>
        </div>
    );
}
