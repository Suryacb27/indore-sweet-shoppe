import Link from "next/link";

interface BreadcrumbsProps {
    category?: {
        name: string;
        slug: string;
    };
    productName: string;
}

export default function Breadcrumbs({ category, productName }: BreadcrumbsProps) {
    return (
        <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
            <span className="mx-2">/</span>
            {category && (
                <>
                    <Link className="hover:text-primary transition-colors" href={`/products?category=${category.slug}`}>
                        {category.name}
                    </Link>
                    <span className="mx-2">/</span>
                </>
            )}
            <span className="text-slate-900 dark:text-slate-100">{productName}</span>
        </nav>
    );
}
