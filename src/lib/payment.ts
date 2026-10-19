import type { DemoOrder, FulfillmentMode, OrderItemSnapshot } from "@/types/product";

/**
 * Payment adapter interface.
 *
 * The demo provider simulates an order confirmation without contacting any
 * payment provider. To integrate Stripe (or another PSP) later, implement
 * `PaymentProvider` and swap the export below — no UI changes required.
 * Raw card details are never collected by this application.
 */
export interface PaymentProvider {
  id: string;
  label: string;
  processOrder(input: DemoOrderInput): Promise<PaymentResult>;
}

export interface DemoOrderInput {
  items: OrderItemSnapshot[];
  subtotal: number;
  fulfillment: FulfillmentMode;
  customer: DemoOrder["customer"];
}

export interface PaymentResult {
  success: boolean;
  order: DemoOrder;
  message: string;
}

const DELIVERY_FEE = 25;
const FREE_DELIVERY_THRESHOLD = 150;

export function computeShippingFee(subtotal: number, fulfillment: FulfillmentMode): number {
  if (fulfillment === "pickup") return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export const demoPaymentProvider: PaymentProvider = {
  id: "demo",
  label: "Commande de démonstration",
  async processOrder(input) {
    // Simulated processing latency for the demo checkout flow.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const shippingFee = computeShippingFee(input.subtotal, input.fulfillment);
    const order: DemoOrder = {
      reference: createReference(),
      createdAt: new Date().toISOString(),
      items: input.items,
      subtotal: input.subtotal,
      shippingFee,
      total: input.subtotal + shippingFee,
      fulfillment: input.fulfillment,
      customer: input.customer,
      isDemo: true,
    };
    return {
      success: true,
      order,
      message:
        "Commande de démonstration confirmée. Aucun paiement réel n'a été effectué et aucune donnée n'a été transmise.",
    };
  },
};

export const paymentProvider: PaymentProvider = demoPaymentProvider;

export const LAST_ORDER_STORAGE_KEY = "rollin-last-order-v1";

export function createReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 46656)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `ROLLIN-${stamp}-${random}`;
}

export function saveLastOrder(order: DemoOrder): void {
  try {
    window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function readLastOrder(): DemoOrder | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoOrder;
    return parsed?.isDemo && Array.isArray(parsed.items) ? parsed : null;
  } catch {
    return null;
  }
}
