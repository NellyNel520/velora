"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: {
    id: string;
    url: string;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
  }[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [selected, setSelected] = useState(0);

  if (sorted.length === 0) {
    return (
      <div className="aspect-square rounded-lg bg-secondary/50" />
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md transition-all sm:h-20 sm:w-20",
                selected === i
                  ? "ring-2 ring-foreground ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `${productName} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-lg bg-secondary/50">
        <Image
          src={sorted[selected].url}
          alt={sorted[selected].alt_text || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500"
        />
      </div>
    </div>
  );
}
