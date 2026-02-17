import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { HeroSection } from "@/components/home/hero-section";
import { ProductCarousel } from "@/components/product/product-carousel";
import { CategoryGrid } from "@/components/home/category-grid";
import { SplitFeature } from "@/components/home/split-feature";
import { ValueProps } from "@/components/home/value-props";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Value Propositions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ValueProps />
      </section>

      {/* Featured Products Carousel */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
              Handpicked
            </p>
            <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/products"
            className="group hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductCarousel products={featuredProducts} />
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-sm font-medium underline underline-offset-4"
          >
            View all products
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
            Browse by
          </p>
          <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
            Shop Categories
          </h2>
        </div>
        <div className="mt-10">
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Split Feature */}
      <SplitFeature />

      {/* Spacer before footer */}
      <div className="h-20" />
    </>
  );
}
