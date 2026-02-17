"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

interface CategoryGridProps {
  categories: Category[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* First category — large, spans 2 rows on lg */}
      {categories[0] && (
        <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
          <CategoryCard category={categories[0]} className="h-full min-h-[400px] lg:min-h-0" />
        </motion.div>
      )}

      {/* Remaining categories */}
      {categories.slice(1, 5).map((cat) => (
        <motion.div key={cat.id} variants={itemVariants}>
          <CategoryCard category={cat} className="min-h-[240px]" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CategoryCard({
  category,
  className = "",
}: {
  category: Category;
  className?: string;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group relative block overflow-hidden rounded-lg ${className}`}
    >
      {category.image_url && (
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors group-hover:from-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-xl font-medium tracking-wide text-white sm:text-2xl">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-1 text-sm text-white/60 line-clamp-1">
                {category.description}
              </p>
            )}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20">
            <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
