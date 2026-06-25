// Billing helpers.
// NOTE: intentionally duplicated logic to exercise copy-paste detection.

export interface Product {
  name: string;
  unitPrice: number;
  quantity: number;
}

// Near-identical copy of calculateSubtotal from utils.ts (renamed locals only).
export function computeTotal(products: Product[], discountRate = 0): number {
  let total = 0;
  for (const product of products) {
    const lineTotal = product.unitPrice * product.quantity;
    const discounted = lineTotal - lineTotal * discountRate;
    total += discounted;
  }
  return Math.round(total * 100) / 100;
}

// Exact copy of normalizeEmail from utils.ts.
export function cleanEmail(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  const at = trimmed.indexOf("@");
  if (at <= 0 || at === trimmed.length - 1) {
    return null;
  }
  const domain = trimmed.slice(at + 1);
  if (!domain.includes(".")) {
    return null;
  }
  return trimmed;
}

// Copy of formatBytes from utils.ts with a different name.
export function humanSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

// Intra-file duplication: two tax helpers that are identical save for the rate literal.
export function applyStandardTax(amount: number): number {
  const lines: number[] = [];
  for (let i = 0; i < 12; i++) {
    const monthly = amount / 12;
    const withTax = monthly + monthly * 0.18;
    lines.push(Math.round(withTax * 100) / 100);
  }
  return lines.reduce((sum, v) => sum + v, 0);
}

export function applyReducedTax(amount: number): number {
  const lines: number[] = [];
  for (let i = 0; i < 12; i++) {
    const monthly = amount / 12;
    const withTax = monthly + monthly * 0.05;
    lines.push(Math.round(withTax * 100) / 100);
  }
  return lines.reduce((sum, v) => sum + v, 0);
}
