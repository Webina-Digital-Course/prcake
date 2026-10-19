import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  columns = 3,
}: {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const columnClasses =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={cn("grid grid-cols-1 gap-x-6 gap-y-12 sm:gap-y-14", columnClasses, className)}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
