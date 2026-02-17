"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const props = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $150",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy on all items",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Your payment information is encrypted and secure",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Dedicated team available to help with any questions",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function ValueProps() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-2 gap-8 lg:grid-cols-4"
    >
      {props.map((prop) => (
        <motion.div
          key={prop.title}
          variants={itemVariants}
          className="text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <prop.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 text-sm font-medium tracking-wide">
            {prop.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {prop.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
