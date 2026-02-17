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

export async function getProducts({
  page = 1,
  perPage = 12,
  category,
  sort = "created_at",
  order = "desc",
  search,
}: {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
  order?: string;
  search?: string;
} = {}) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("products")
    .select(
      "*, product_images(*), product_categories!inner(category_id, categories(*))",
      { count: "exact" }
    )
    .eq("status", "active");

  if (category) {
    query = query.eq("product_categories.categories.slug", category);
  }

  if (search) {
    query = query.textSearch("fts", search, { type: "websearch" });
  }

  const validSortColumns = ["created_at", "base_price", "name"];
  const sortCol = validSortColumns.includes(sort) ? sort : "created_at";
  const ascending = order === "asc";

  const { data, count } = await query
    .order(sortCol, { ascending })
    .range(from, to);

  return {
    products: data ?? [],
    total: count ?? 0,
    page,
    perPage,
    totalPages: Math.ceil((count ?? 0) / perPage),
  };
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
