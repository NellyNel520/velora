import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/queries/categories";
import { getFilteredProducts } from "@/lib/queries/products";
import { ProductCard } from "@/components/product/product-card";
import { ProductPagination } from "@/components/product/product-pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string; order?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description:
      category.description ??
      `Browse our ${category.name.toLowerCase()} collection.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const page = Number(sp.page) || 1;
  const result = await getFilteredProducts({
    page,
    category: slug,
    sort: sp.sort,
    order: sp.order,
  });

  return (
    <>
      {/* Category Hero */}
      <div className="relative h-64 overflow-hidden bg-neutral-950 sm:h-80">
        {category.image_url && (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-white/60 hover:text-white">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/categories"
                      className="text-white/60 hover:text-white"
                    >
                      Categories
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {category.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-2 text-sm text-white/60">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm text-muted-foreground">
          {result.total} {result.total === 1 ? "product" : "products"}
        </p>

        {result.products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {result.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-light text-muted-foreground">
              No products in this category yet
            </p>
          </div>
        )}

        {result.total_pages > 1 && (
          <div className="mt-12">
            <ProductPagination
              currentPage={result.page}
              totalPages={result.total_pages}
            />
          </div>
        )}
      </div>
    </>
  );
}
