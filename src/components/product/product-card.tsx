import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    base_price: number;
    compare_at_price: number | null;
    product_images: {
      url: string;
      alt_text: string | null;
      sort_order: number;
      is_primary: boolean;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.product_images?.find((img) => img.is_primary);
  const secondaryImage = product.product_images?.find((img) => !img.is_primary);
  const image = primaryImage || product.product_images?.[0];
  const onSale = product.compare_at_price && product.compare_at_price > product.base_price;
  const discount = onSale
    ? Math.round(
        ((product.compare_at_price! - product.base_price) /
          product.compare_at_price!) *
          100
      )
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary/50">
        {image && (
          <Image
            src={image.url}
            alt={image.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        )}
        {/* Secondary image on hover */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && (
            <Badge className="rounded-sm bg-foreground px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-background hover:bg-foreground">
              Save {discount}%
            </Badge>
          )}
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <div className="flex items-center justify-center rounded-md bg-background/90 py-2.5 text-xs font-medium tracking-wider uppercase backdrop-blur-sm">
            Quick View
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium leading-tight tracking-wide transition-colors group-hover:text-muted-foreground">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {formatPrice(product.base_price)}
          </span>
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
