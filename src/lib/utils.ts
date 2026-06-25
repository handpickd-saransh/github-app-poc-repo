// Shared utility helpers.

export interface LineItem {
  name: string;
  unitPrice: number;
  quantity: number;
}

/** Compute an order subtotal, applying a per-item discount rate (0–1). */
export function calculateSubtotal(items: LineItem[], discountRate = 0): number {
  let subtotal = 0;
  for (const item of items) {
    const lineTotal = item.unitPrice * item.quantity;
    const discounted = lineTotal - lineTotal * discountRate;
    subtotal += discounted;
  }
  return Math.round(subtotal * 100) / 100;
}

/** Validate a basic email address shape and return a normalized form. */
export function normalizeEmail(input: string): string | null {
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

/** Format a byte count as a human-readable string. */
export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

/** Group an array of records by a string key selector. */
export function groupBy<T>(rows: T[], keyFn: (row: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const row of rows) {
    const key = keyFn(row);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(row);
  }
  return groups;
}
