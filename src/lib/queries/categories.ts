import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getCategoriesWithProductCount() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*, product_categories(count)")
    .order("sort_order", { ascending: true });

  return (categories ?? []).map((cat) => ({
    ...cat,
    product_count:
      (cat.product_categories as unknown as { count: number }[])?.[0]?.count ??
      0,
  }));
}
