// Reporting helpers.
// NOTE: intentionally duplicated logic to exercise copy-paste detection.

interface Row {
  category: string;
  unitPrice: number;
  quantity: number;
}

// Third copy of the subtotal logic (utils.calculateSubtotal / billing.computeTotal).
export function sumRows(rows: Row[], discountRate = 0): number {
  let subtotal = 0;
  for (const row of rows) {
    const lineTotal = row.unitPrice * row.quantity;
    const discounted = lineTotal - lineTotal * discountRate;
    subtotal += discounted;
  }
  return Math.round(subtotal * 100) / 100;
}

// Second copy of groupBy from utils.ts.
export function bucketBy<T>(rows: T[], keyFn: (row: T) => string): Record<string, T[]> {
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

export function summarize(rows: Row[]): Record<string, number> {
  const grouped = bucketBy(rows, (r) => r.category);
  const out: Record<string, number> = {};
  for (const category of Object.keys(grouped)) {
    out[category] = sumRows(grouped[category]);
  }
  return out;
}
