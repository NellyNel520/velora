"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      // Reset to page 1 on filter change
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = (updates: Record<string, string | null>) => {
    router.push(`${pathname}?${createQueryString(updates)}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter({
      search: searchInput.trim() || null,
    });
  };

  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order");
  const currentCategory = searchParams.get("category");
  const sortValue = currentSort
    ? `${currentSort}-${currentOrder || "desc"}`
    : "created_at-desc";

  const hasFilters = currentCategory || searchParams.get("search");

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-9 w-48 pl-9 text-sm sm:w-56"
          />
        </form>

        {/* Category filter */}
        <Select
          value={currentCategory || "all"}
          onValueChange={(val) =>
            handleFilter({ category: val === "all" ? null : val })
          }
        >
          <SelectTrigger className="h-9 w-40 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 text-xs text-muted-foreground"
            onClick={() => {
              setSearchInput("");
              router.push(pathname);
            }}
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Sort */}
      <Select
        value={sortValue}
        onValueChange={(val) => {
          const [sort, order] = val.split("-");
          handleFilter({ sort, order });
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
  );
}
