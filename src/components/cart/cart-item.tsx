"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart, type CartItemData } from "@/hooks/use-cart";

interface CartItemProps {
  item: CartItemData;
  compact?: boolean;
}

export function CartItem({ item, compact }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4">
      {/* Image */}
      <Link
        href={`/products/${item.slug}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden bg-secondary"
      >
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.product_name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="text-sm font-medium leading-tight hover:underline"
            >
              {item.product_name}
            </Link>
            {item.variant_name && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.variant_name}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={() => removeItem(item.id)}
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-0 rounded-md border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-secondary"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-7 w-8 items-center justify-center border-x text-xs font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  Math.min(item.quantity + 1, item.stock_quantity)
                )
              }
              className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-secondary"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <p className="text-sm font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
