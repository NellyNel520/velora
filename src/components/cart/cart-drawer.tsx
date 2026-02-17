"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./cart-item";

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, subtotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetTitle className="sr-only">Shopping cart</SheetTitle>

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Cart ({totalItems()})
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your cart is empty
            </p>
            <Button
              variant="outline"
              className="h-10 rounded-none text-xs tracking-[0.15em] uppercase"
              onClick={closeCart}
              asChild
            >
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} compact />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium">
                  {formatPrice(subtotal())}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2">
                <Button
                  className="h-12 w-full rounded-none text-xs font-medium tracking-[0.15em] uppercase"
                  asChild
                  onClick={closeCart}
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-full rounded-none text-xs tracking-[0.15em] uppercase"
                  onClick={closeCart}
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
