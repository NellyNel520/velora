"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/components/cart/cart-item";

export default function CartPage() {
  const { items, clearCart, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight">Your Cart</h1>

        <div className="mt-16 flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-lg font-light">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button
            className="group mt-8 h-11 rounded-none px-8 text-xs tracking-[0.15em] uppercase"
            asChild
          >
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const itemCount = totalItems();
  const sub = subtotal();
  const shipping = 0; // Free shipping for demo
  const tax = Math.round(sub * 0.08); // 8% estimated tax
  const total = sub + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-light tracking-tight">
          Your Cart{" "}
          <span className="text-lg text-muted-foreground">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-destructive"
          onClick={clearCart}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          Clear cart
        </Button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden border-b pb-3 sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-6">
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Product
            </span>
            <span className="w-28 text-center text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Quantity
            </span>
            <span className="w-20 text-right text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Total
            </span>
          </div>

          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="py-6">
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="h-10 rounded-none text-xs tracking-[0.15em] uppercase"
              asChild
            >
              <Link href="/products">
                <ArrowRight className="mr-2 h-3.5 w-3.5 rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-none border bg-secondary/20 p-6">
            <h2 className="text-sm font-medium tracking-wider uppercase">
              Order Summary
            </h2>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-medium">{formatPrice(total)}</span>
            </div>

            <Button
              className="mt-6 h-12 w-full rounded-none text-xs font-medium tracking-[0.15em] uppercase"
              disabled
            >
              Proceed to Checkout
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Checkout will be enabled with Stripe integration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
