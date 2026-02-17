"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-foreground text-background">
      <div className="overflow-hidden py-2.5">
        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-xs tracking-widest uppercase">
              <span>Free shipping on orders over $150</span>
              <span className="text-muted-foreground/40">&#9670;</span>
              <span>New arrivals every week</span>
              <span className="text-muted-foreground/40">&#9670;</span>
              <span>30-day hassle-free returns</span>
              <span className="text-muted-foreground/40">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
