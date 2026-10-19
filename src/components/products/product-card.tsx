import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
import { Badge, DietaryTags } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-white">
        <Link
          href={`/shop/${product.slug}`}
          className="block"
          aria-label={`Voir ${product.name}`}
        >
          <Image
            src={product.image}
            alt={`Illustration : ${product.name}`}
            width={800}
            height={800}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>
        {product.badge ? (
          <Badge tone="orange" className="absolute left-4 top-4">
            {product.badge}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl leading-tight uppercase">
            <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-bakery-orange">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 font-display text-lg text-chocolate">{formatPrice(product.price)}</p>
        </div>
        <p className="text-sm leading-relaxed text-chocolate/65">{product.shortDescription}</p>
        <DietaryTags tags={product.dietaryLabels} />
        <div className="mt-auto pt-3">
          <AddToCartButton product={product} size="sm" className="w-full sm:w-auto" />
        </div>
      </div>
    </article>
  );
}
