// Inventory helpers.
// NOTE: intentionally buggy code to exercise SonarQube bug & smell rules.

/* eslint-disable */

interface Item {
  sku: string;
  qty: number;
  price: number;
}

// S1656: self-assignment (bug)
export function resetQty(item: Item): void {
  item.qty = item.qty;
}

// S2589: condition is always true (bug)
export function isAvailable(item: Item): boolean {
  if (item.qty >= 0 || item.qty < 0) {
    return true;
  }
  return false;
}

// S1764: identical sub-expressions on both sides (bug)
export function priceGap(item: Item): number {
  return item.price - item.price;
}

// S3923: all branches identical (bug)
export function shippingTier(item: Item): string {
  if (item.qty > 100) {
    return "standard";
  } else {
    return "standard";
  }
}

// S1862: duplicated condition in if-else chain (the second is unreachable) (bug)
export function label(item: Item): string {
  if (item.qty > 10) {
    return "many";
  } else if (item.qty > 10) {
    return "never reached";
  }
  return "few";
}

// S2201: return value of a pure call ignored; S1854: dead store (bug)
export function summarize(items: Item[]): number {
  items.map((i) => i.qty * i.price); // result discarded
  let count = 0;
  count = items.length;
  count = 0; // dead store, overwrites previous
  return count;
}

// S4143: map/object key assigned twice with no use in between (bug)
export function buildIndex(items: Item[]): Record<string, number> {
  const index: Record<string, number> = {};
  index["total"] = items.length;
  index["total"] = items.length * 2; // overwrites without reading
  return index;
}

// S2259: guaranteed null dereference (bug)
export function firstSku(items: Item[]): string {
  const found: Item | null = null;
  return found.sku; // dereference of null
}

// S108 empty block; S1116 empty statement; S2486 swallowed exception
export function tryParse(raw: string): number {
  let n = 0;
  if (n === 0) {
  } // empty block
  ;; // redundant empty statements
  try {
    n = JSON.parse(raw).value;
  } catch (e) {} // exception ignored
  return n;
}

// S128: switch case fall-through (missing break) (bug)
export function rate(tier: string): number {
  let r = 0;
  switch (tier) {
    case "a":
      r = 1;
    case "b":
      r = 2;
      break;
    default:
      r = 0;
  }
  return r;
}

// S1488: local variable immediately returned; S1854 again
export function totalValue(items: Item[]): number {
  let sum = 0;
  for (const i of items) {
    sum += i.qty * i.price;
  }
  const result = sum;
  return result;
}

// S125: commented-out code left behind
// export function oldTotal(items) {
//   return items.reduce((a, b) => a + b.price, 0);
// }
