import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button
        variant="outline"
        className="group mt-8 h-11 rounded-none px-8 text-xs tracking-[0.15em] uppercase"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
