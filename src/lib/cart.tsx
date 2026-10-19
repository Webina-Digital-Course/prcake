"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartLine, Product, ProductVariant } from "@/types/product";

const STORAGE_KEY = "rollin-cart-v1";
const QUANTITY_MIN = 1;
const QUANTITY_MAX = 99;

interface CartState {
  lines: CartLine[];
  /** True once the persisted cart has been read from localStorage. */
  hydrated: boolean;
  lastAddedKey: string | null;
  lastAddedAt: number;
}

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

const initialState: CartState = {
  lines: [],
  hydrated: false,
  lastAddedKey: null,
  lastAddedAt: 0,
};

function lineKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}__${variantId}` : productId;
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return QUANTITY_MIN;
  return Math.min(QUANTITY_MAX, Math.max(QUANTITY_MIN, Math.floor(quantity)));
}

function mergeLine(lines: CartLine[], incoming: CartLine): CartLine[] {
  const existing = lines.find((line) => line.key === incoming.key);
  if (!existing) {
    return [...lines, { ...incoming, quantity: clampQuantity(incoming.quantity) }];
  }
  return lines.map((line) =>
    line.key === incoming.key
      ? { ...line, quantity: clampQuantity(line.quantity + incoming.quantity) }
      : line,
  );
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, lines: action.lines, hydrated: true };
    case "add":
      return {
        ...state,
        lines: mergeLine(state.lines, action.line),
        lastAddedKey: action.line.key,
        lastAddedAt: Date.now(),
      };
    case "setQuantity": {
      if (action.quantity <= 0) {
        return { ...state, lines: state.lines.filter((line) => line.key !== action.key) };
      }
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.key === action.key
            ? { ...line, quantity: clampQuantity(action.quantity) }
            : line,
        ),
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((line) => line.key !== action.key) };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is CartLine => {
      if (typeof item !== "object" || item === null) return false;
      const candidate = item as Partial<CartLine>;
      return (
        typeof candidate.key === "string" &&
        typeof candidate.productId === "string" &&
        typeof candidate.slug === "string" &&
        typeof candidate.name === "string" &&
        typeof candidate.image === "string" &&
        typeof candidate.unitPrice === "number" &&
        typeof candidate.quantity === "number"
      );
    })
    .map((line) => ({
      ...line,
      quantity: clampQuantity(line.quantity),
      unitPrice: Math.max(0, line.unitPrice),
    }));
}

interface CartContextValue extends CartState {
  addProduct: (product: Product, options?: { variant?: ProductVariant; quantity?: number }) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "hydrate", lines: sanitizeLines(JSON.parse(raw)) });
      } else {
        dispatch({ type: "hydrate", lines: [] });
      }
    } catch {
      dispatch({ type: "hydrate", lines: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable (private mode) — cart stays in memory */
    }
  }, [state.lines, state.hydrated]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        dispatch({ type: "hydrate", lines: sanitizeLines(safeParse(event.newValue)) });
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addProduct = useCallback(
    (product: Product, options?: { variant?: ProductVariant; quantity?: number }) => {
      const variant = options?.variant;
      const unitPrice = product.price + (variant?.priceDelta ?? 0);
      dispatch({
        type: "add",
        line: {
          key: lineKey(product.id, variant?.id),
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          unitPrice,
          quantity: options?.quantity ?? 1,
          variantId: variant?.id,
          variantLabel: variant?.label,
        },
      });
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    dispatch({ type: "setQuantity", key, quantity });
  }, []);

  const removeLine = useCallback((key: string) => {
    dispatch({ type: "remove", key });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const itemCount = useMemo(
    () => state.lines.reduce((sum, line) => sum + line.quantity, 0),
    [state.lines],
  );

  const subtotal = useMemo(
    () => state.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    [state.lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      addProduct,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
      subtotal,
    }),
    [state, addProduct, setQuantity, removeLine, clearCart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function safeParse(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
