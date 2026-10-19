export const PRODUCT_CATEGORIES = [
  "cakes",
  "bread",
  "cookies",
  "bagels",
  "pastries",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface CategoryMeta {
  slug: ProductCategory;
  label: string;
  tagline: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  /** Price modifier in MAD (dirhams) applied to the base price. */
  priceDelta: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  /** Base price in MAD (dirhams). */
  price: number;
  shortDescription: string;
  description: string;
  dietaryLabels: string[];
  image: string;
  gallery: string[];
  variants?: ProductVariant[];
  badge?: string;
  featured?: boolean;
  bestSeller?: boolean;
  /** ISO date, used for the "nouveautés" sort order. */
  releasedAt: string;
}

export interface CartLine {
  /** Stable key: productId + optional variant id. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
}

export interface OrderItemSnapshot {
  name: string;
  quantity: number;
  unitPrice: number;
  variantLabel?: string;
}

export type FulfillmentMode = "delivery" | "pickup";

export interface DemoOrder {
  reference: string;
  createdAt: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  shippingFee: number;
  total: number;
  fulfillment: FulfillmentMode;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
    note?: string;
  };
  isDemo: true;
}
