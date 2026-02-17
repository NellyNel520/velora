import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/products?sort=created_at&order=desc" },
    { label: "All Products", href: "/products" },
    { label: "Clothing", href: "/categories/clothing" },
    { label: "Accessories", href: "/categories/accessories" },
    { label: "Footwear", href: "/categories/footwear" },
    { label: "Home & Living", href: "/categories/home-living" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <h3 className="text-2xl font-light tracking-wide sm:text-3xl">
            Stay in the loop
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Subscribe for early access to new collections, exclusive offers, and
            style guides delivered to your inbox.
          </p>
          <div className="mt-2 flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11 border-foreground/20 bg-background"
            />
            <Button className="h-11 px-6 tracking-wide">Subscribe</Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-[0.2em] uppercase"
            >
              Velora
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Thoughtfully curated goods for those who appreciate quality
              craftsmanship and timeless design.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium tracking-wider uppercase">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Velora. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
