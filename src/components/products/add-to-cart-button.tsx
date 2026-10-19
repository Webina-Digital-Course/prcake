"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product, ProductVariant } from "@/types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  size = "md",
  className,
  withIcon = true,
}: {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  withIcon?: boolean;
}) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    addProduct(product, { variant, quantity });
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Button
      onClick={handleClick}
      variant={added ? "brown" : "yellow"}
      size={size}
      aria-live="polite"
      className={cn(added && "min-w-40", className)}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Ajouté au panier
        </>
      ) : (
        <>
          {withIcon ? <ShoppingBag className="h-4 w-4" aria-hidden="true" /> : null}
          Ajouter au panier
        </>
      )}
    </Button>
  );
}
