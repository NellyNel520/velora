"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SplitFeature() {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[600px]"
      >
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
          alt="Premium craftsmanship"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center bg-secondary/30 px-8 py-16 sm:px-12 lg:px-20"
      >
        <div className="max-w-lg">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
            Our Philosophy
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl">
            Designed to last,
            <br />
            <span className="italic">crafted with care</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Every piece in our collection is thoughtfully selected for its quality,
            craftsmanship, and timeless appeal. We partner with artisans and
            manufacturers who share our commitment to sustainable practices and
            exceptional materials.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            From premium fabrics to hand-finished details, we believe that the
            things you surround yourself with should be as intentional as the
            life you lead.
          </p>
          <Button
            variant="outline"
            className="group mt-8 h-11 rounded-none px-8 text-xs tracking-[0.15em] uppercase"
            asChild
          >
            <Link href="/products">
              Discover More
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
