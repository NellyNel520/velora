"use client";

import { useState } from "react";
import { ShoppingBag, Heart, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    base_price: number;
    compare_at_price: number | null;
    product_images: {
      url: string;
      is_primary: boolean;
      sort_order: number;
    }[];
    product_variants: {
      id: string;
      name: string;
      price_offset: number;
      stock_quantity: number;
      options: Record<string, string>;
    }[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.product_variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const hasVariants = product.product_variants?.length > 0;
  const currentPrice =
    product.base_price + (selectedVariant?.price_offset ?? 0);
  const onSale =
    product.compare_at_price && product.compare_at_price > product.base_price;
  const inStock = selectedVariant ? selectedVariant.stock_quantity > 0 : true;

  // Extract unique option types
  const optionTypes = hasVariants
    ? Object.keys(product.product_variants[0].options)
    : [];

  // Group variants by option type
  const optionValues: Record<string, string[]> = {};
  for (const type of optionTypes) {
    const values = new Set(
      product.product_variants.map((v) => v.options[type])
    );
    optionValues[type] = Array.from(values);
  }

  const primaryImage = product.product_images?.find((img) => img.is_primary);
  const firstImage = product.product_images?.[0];
  const imageUrl = primaryImage?.url ?? firstImage?.url ?? null;

  const handleAddToCart = () => {
    if (!inStock) return;

    const variantLabel = selectedVariant
      ? Object.values(selectedVariant.options).join(" / ")
      : "";

    addItem({
      id: `${product.id}-${selectedVariant?.id ?? "default"}`,
      product_id: product.id,
      variant_id: selectedVariant?.id ?? null,
      quantity,
      product_name: product.name,
      variant_name: variantLabel,
      price: currentPrice,
      image_url: imageUrl,
      slug: product.slug,
      stock_quantity: selectedVariant?.stock_quantity ?? 99,
    });

    toast.success("Added to cart", {
      description: `${product.name}${variantLabel ? ` — ${variantLabel}` : ""} × ${quantity}`,
    });

    openCart();
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-light tracking-tight sm:text-3xl">
          {formatPrice(currentPrice)}
        </span>
        {onSale && (
          <span className="text-base text-muted-foreground line-through">
            {formatPrice(product.compare_at_price!)}
          </span>
        )}
        {onSale && (
          <Badge
            variant="secondary"
            className="text-[10px] font-medium tracking-wider uppercase"
          >
            Sale
          </Badge>
        )}
      </div>

      <Separator />

      {/* Variant Options */}
      {optionTypes.map((type) => (
        <div key={type}>
          <label className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            {type}
            {selectedVariant && (
              <span className="ml-2 font-normal normal-case text-foreground">
                — {selectedVariant.options[type]}
              </span>
            )}
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {optionValues[type].map((value) => {
              const isSelected = selectedVariant?.options[type] === value;
              const matchingVariant = product.product_variants.find((v) => {
                if (!selectedVariant) return v.options[type] === value;
                return (
                  Object.entries(selectedVariant.options).every(
                    ([k, val]) =>
                      k === type ? true : v.options[k] === val
                  ) && v.options[type] === value
                );
              });
              const available = matchingVariant
                ? matchingVariant.stock_quantity > 0
                : true;

              return (
                <button
                  key={value}
                  onClick={() => {
                    if (matchingVariant) setSelectedVariant(matchingVariant);
                  }}
                  disabled={!available}
                  className={cn(
                    "relative flex h-10 min-w-[3rem] items-center justify-center rounded-md border px-4 text-sm transition-all",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : available
                        ? "border-border hover:border-foreground/50"
                        : "border-border/50 text-muted-foreground/40 line-through"
                  )}
                >
                  {value}
                  {isSelected && (
                    <Check className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-foreground text-background" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div>
        <label className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
          Quantity
        </label>
        <div className="mt-3 flex items-center gap-0 rounded-md border w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="flex h-10 w-12 items-center justify-center text-sm font-medium border-x">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Add to Cart / Wishlist */}
      <div className="flex gap-3 pt-2">
        <Button
          size="lg"
          className="h-12 flex-1 rounded-none text-xs font-medium tracking-[0.15em] uppercase"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 rounded-none p-0"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      {/* Description */}
      {product.description && (
        <>
          <Separator />
          <div>
            <h3 className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Description
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>
        </>
      )}

      {/* Stock indicator */}
      {selectedVariant && inStock && selectedVariant.stock_quantity <= 5 && (
        <p className="text-xs font-medium text-orange-600">
          Only {selectedVariant.stock_quantity} left in stock
        </p>
      )}
    </div>
  );
}
