import { Suspense } from "react";
import { getFilteredProducts, getFilterFacets } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, FilterSidebar } from "@/components/product/product-filters";
import { ProductPagination } from "@/components/product/product-pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our curated collection of streetwear essentials.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    order?: string;
    category?: string;
    sizes?: string;
    colors?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sizes = params.sizes?.split(",").filter(Boolean);
  const colors = params.colors?.split(",").filter(Boolean);

  const [result, facets, categories] = await Promise.all([
    getFilteredProducts({
      page,
      sort: params.sort,
      order: params.order,
      category: params.category,
      sizes,
      colors,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      search: params.search,
    }),
    getFilterFacets(params.category),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          {params.search
            ? `Results for "${params.search}"`
            : params.category
              ? categories.find((c) => c.slug === params.category)?.name ?? "Products"
              : "All Products"}
        </h1>
      </div>

      {/* Filters top bar (search, sort, mobile filter toggle) */}
      <Suspense fallback={null}>
        <ProductFilters
          categories={categories}
          facets={facets}
          totalResults={result.total}
        />
      </Suspense>

      {/* Main content: sidebar + grid */}
      <div className="mt-8 flex gap-10">
        {/* Desktop filter sidebar */}
        <div className="w-56 shrink-0">
          <Suspense fallback={null}>
            <FilterSidebar categories={categories} facets={facets} />
          </Suspense>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {result.products.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
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
          {result.total_pages > 1 && (
            <div className="mt-12">
              <ProductPagination
                currentPage={result.page}
                totalPages={result.total_pages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
