import Link from "next/link";
import Image from "next/image";
import { getCategoriesWithProductCount } from "@/lib/queries/categories";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse our curated collections by category.",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProductCount();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find exactly what you&apos;re looking for
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
          >
            {cat.image_url && (
              <Image
                src={cat.image_url}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors group-hover:from-black/80" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-medium text-white">
                    {cat.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    {cat.product_count}{" "}
                    {cat.product_count === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20">
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
