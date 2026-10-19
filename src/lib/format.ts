/** Formats a MAD (dirham) amount, e.g. 45 -> "45 DH". */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const value = Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
  return `${value} DH`;
}

/** Formats a cart line total. */
export function formatLineTotal(unitPrice: number, quantity: number): string {
  return formatPrice(unitPrice * quantity);
}
