import { createClient } from "@/lib/supabase/server";

export async function getFeaturedProducts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("status", "active")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(8);
  return data ?? [];
}

export interface FilterParams {
  page?: number;
  perPage?: number;
  category?: string;
  sizes?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  order?: string;
  search?: string;
}

export async function getFilteredProducts(params: FilterParams = {}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("filter_products", {
    p_category: params.category || null,
    p_sizes: params.sizes?.length ? params.sizes : null,
    p_colors: params.colors?.length ? params.colors : null,
    p_min_price: params.minPrice || null,
    p_max_price: params.maxPrice || null,
    p_search: params.search || null,
    p_sort: params.sort || "created_at",
    p_sort_order: params.order || "desc",
    p_page: params.page || 1,
    p_per_page: params.perPage || 12,
  });

  if (error) {
    console.error("filter_products error:", error);
    return { products: [], total: 0, page: 1, per_page: 12, total_pages: 0 };
  }

  return data as {
    products: {
      id: string;
      name: string;
      slug: string;
      base_price: number;
      compare_at_price: number | null;
      status: string;
      featured: boolean;
      created_at: string;
      product_images: {
        id: string;
        url: string;
        alt_text: string | null;
        sort_order: number;
        is_primary: boolean;
      }[];
    }[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface FilterFacets {
  sizes: { value: string; count: number }[];
  colors: { value: string; count: number }[];
  price_range: { min: number; max: number };
}

export async function getFilterFacets(
  category?: string
): Promise<FilterFacets> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_filter_facets", {
    p_category: category || null,
  });

  if (error) {
    console.error("get_filter_facets error:", error);
    return { sizes: [], colors: [], price_range: { min: 0, max: 0 } };
  }

  return data as FilterFacets;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(
      "*, product_images(*), product_variants(*), product_categories(category_id, categories(*))"
    )
    .eq("slug", slug)
    .single();
  return data;
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string
) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*), product_categories!inner(category_id)")
    .eq("status", "active")
    .eq("product_categories.category_id", categoryId)
    .neq("id", productId)
    .limit(4);
  return data ?? [];
}
