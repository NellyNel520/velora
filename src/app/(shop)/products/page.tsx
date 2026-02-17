import { Suspense } from "react";
import { getProducts } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductPagination } from "@/components/product/product-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our curated collection of premium goods.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    order?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [result, categories] = await Promise.all([
    getProducts({
      page,
      sort: params.sort,
      order: params.order,
      category: params.category,
      search: params.search,
    }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          {params.search ? `Results for "${params.search}"` : "All Products"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {result.total} {result.total === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <ProductFilters categories={categories} />
      </Suspense>

      {/* Product Grid */}
      {result.products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-light text-muted-foreground">
            No products found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="mt-12">
          <ProductPagination
            currentPage={result.page}
            totalPages={result.totalPages}
          />
        </div>
      )}
    </div>
  );
}
