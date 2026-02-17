"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { FilterFacets } from "@/lib/queries/products";

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  facets: FilterFacets;
  totalResults: number;
}

export function ProductFilters({
  categories,
  facets,
  totalResults,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  // Parse current filters from URL
  const currentCategory = searchParams.get("category");
  const currentSizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order");
  const sortValue = currentSort
    ? `${currentSort}-${currentOrder || "desc"}`
    : "created_at-desc";

  const activeFilterCount =
    (currentCategory ? 1 : 0) +
    currentSizes.length +
    currentColors.length +
    (currentMinPrice ? 1 : 0) +
    (currentMaxPrice ? 1 : 0);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.delete("page"); // Reset pagination on filter change
      return params.toString();
    },
    [searchParams]
  );

  const applyFilter = (updates: Record<string, string | null>) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(updates)}`);
    });
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const current = searchParams.get(key)?.split(",").filter(Boolean) ?? [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    applyFilter({ [key]: updated.length > 0 ? updated.join(",") : null });
  };

  const clearAll = () => {
    setSearchInput("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter({ search: searchInput.trim() || null });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.name}
              active={currentCategory === cat.slug}
              onClick={() =>
                applyFilter({
                  category: currentCategory === cat.slug ? null : cat.slug,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Size */}
      {facets.sizes.length > 0 && (
        <>
          <FilterSection title="Size">
            <div className="flex flex-wrap gap-2">
              {facets.sizes.map((s) => (
                <FilterChip
                  key={s.value}
                  label={s.value}
                  count={s.count}
                  active={currentSizes.includes(s.value)}
                  onClick={() => toggleArrayFilter("sizes", s.value)}
                />
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Color */}
      {facets.colors.length > 0 && (
        <>
          <FilterSection title="Color">
            <div className="flex flex-wrap gap-2">
              {facets.colors.map((c) => (
                <FilterChip
                  key={c.value}
                  label={c.value}
                  count={c.count}
                  active={currentColors.includes(c.value)}
                  onClick={() => toggleArrayFilter("colors", c.value)}
                />
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Price Range */}
      {facets.price_range.max > 0 && (
        <FilterSection
          title={`Price (${formatPrice(facets.price_range.min)} — ${formatPrice(facets.price_range.max)})`}
        >
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={currentMinPrice ?? ""}
              onChange={(e) =>
                applyFilter({
                  minPrice: e.target.value
                    ? String(Number(e.target.value) * 100)
                    : null,
                })
              }
              className="h-9 w-24 text-sm"
              min={0}
            />
            <span className="text-muted-foreground">—</span>
            <Input
              type="number"
              placeholder="Max"
              value={currentMaxPrice ?? ""}
              onChange={(e) =>
                applyFilter({
                  maxPrice: e.target.value
                    ? String(Number(e.target.value) * 100)
                    : null,
                })
              }
              className="h-9 w-24 text-sm"
              min={0}
            />
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Top bar: Search + Sort + Mobile filter toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-9 w-48 pl-9 text-sm sm:w-64"
            />
          </form>

          {/* Mobile filter button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-[10px]"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetTitle className="text-sm font-medium tracking-wider uppercase">
                Filters
              </SheetTitle>
              <div className="mt-6">{filterContent}</div>
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  className="mt-6 w-full text-xs"
                  onClick={() => {
                    clearAll();
                    setMobileOpen(false);
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-3">
          {/* Results count */}
          <span className="text-sm text-muted-foreground">
            {totalResults} {totalResults === 1 ? "product" : "products"}
          </span>

          {/* Sort */}
          <Select
            value={sortValue}
            onValueChange={(val) => {
              const [sort, order] = val.split("-");
              applyFilter({ sort, order });
            }}
          >
            <SelectTrigger className="h-9 w-44 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">Newest</SelectItem>
              <SelectItem value="created_at-asc">Oldest</SelectItem>
              <SelectItem value="base_price-asc">Price: Low to High</SelectItem>
              <SelectItem value="base_price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active:</span>
          {currentCategory && (
            <ActivePill
              label={categories.find((c) => c.slug === currentCategory)?.name ?? currentCategory}
              onRemove={() => applyFilter({ category: null })}
            />
          )}
          {currentSizes.map((s) => (
            <ActivePill
              key={s}
              label={`Size: ${s}`}
              onRemove={() => toggleArrayFilter("sizes", s)}
            />
          ))}
          {currentColors.map((c) => (
            <ActivePill
              key={c}
              label={c}
              onRemove={() => toggleArrayFilter("colors", c)}
            />
          ))}
          {currentMinPrice && (
            <ActivePill
              label={`Min: $${currentMinPrice}`}
              onRemove={() => applyFilter({ minPrice: null })}
            />
          )}
          {currentMaxPrice && (
            <ActivePill
              label={`Max: $${currentMaxPrice}`}
              onRemove={() => applyFilter({ maxPrice: null })}
            />
          )}
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Loading state */}
      {isPending && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-foreground/20" />
        </div>
      )}
    </div>
  );
}

// Desktop sidebar wrapper
export function FilterSidebar({
  categories,
  facets,
}: {
  categories: { id: string; name: string; slug: string }[];
  facets: FilterFacets;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category");
  const currentSizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");

  const activeFilterCount =
    (currentCategory ? 1 : 0) +
    currentSizes.length +
    currentColors.length +
    (currentMinPrice ? 1 : 0) +
    (currentMaxPrice ? 1 : 0);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const applyFilter = (updates: Record<string, string | null>) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(updates)}`);
    });
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const current = searchParams.get(key)?.split(",").filter(Boolean) ?? [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    applyFilter({ [key]: updated.length > 0 ? updated.join(",") : null });
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wider uppercase">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={() =>
                startTransition(() => router.push(pathname))
              }
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>

        <Separator />

        {/* Category */}
        <FilterSection title="Category">
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  applyFilter({
                    category: currentCategory === cat.slug ? null : cat.slug,
                  })
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  currentCategory === cat.slug
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {cat.name}
                {currentCategory === cat.slug && (
                  <Check className="h-3.5 w-3.5" />
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Size */}
        {facets.sizes.length > 0 && (
          <>
            <FilterSection title="Size">
              <div className="flex flex-wrap gap-2">
                {facets.sizes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => toggleArrayFilter("sizes", s.value)}
                    className={cn(
                      "flex h-9 min-w-[2.5rem] items-center justify-center rounded-md border px-3 text-xs font-medium transition-all",
                      currentSizes.includes(s.value)
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    {s.value}
                  </button>
                ))}
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Color */}
        {facets.colors.length > 0 && (
          <>
            <FilterSection title="Color">
              <div className="space-y-1">
                {facets.colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => toggleArrayFilter("colors", c.value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                      currentColors.includes(c.value)
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <span>{c.value}</span>
                    <span className="text-xs opacity-60">{c.count}</span>
                  </button>
                ))}
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Price Range */}
        {facets.price_range.max > 0 && (
          <FilterSection title="Price Range">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder={String(facets.price_range.min / 100)}
                    value={currentMinPrice ? String(Number(currentMinPrice) / 100) : ""}
                    onChange={(e) =>
                      applyFilter({
                        minPrice: e.target.value
                          ? String(Math.round(Number(e.target.value) * 100))
                          : null,
                      })
                    }
                    className="h-9 pl-7 text-sm"
                    min={0}
                  />
                </div>
                <span className="text-xs text-muted-foreground">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder={String(facets.price_range.max / 100)}
                    value={currentMaxPrice ? String(Number(currentMaxPrice) / 100) : ""}
                    onChange={(e) =>
                      applyFilter({
                        maxPrice: e.target.value
                          ? String(Math.round(Number(e.target.value) * 100))
                          : null,
                      })
                    }
                    className="h-9 pl-7 text-sm"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
        )}
      </div>
    </aside>
  );
}

// Sub-components

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-medium tracking-wider uppercase text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      )}
    >
      {label}
      {count !== undefined && (
        <span className="opacity-60">({count})</span>
      )}
    </button>
  );
}

function ActivePill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background transition-opacity hover:opacity-80"
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}
