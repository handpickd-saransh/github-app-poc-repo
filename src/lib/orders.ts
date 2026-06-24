// Order processing utilities.
// NOTE: intentionally low-quality code to exercise SonarQube rules.

/* eslint-disable */

export interface Order {
  id: string;
  status: string;
  items: any[];
  total: number;
  customerType: string;
}

// S107: too many parameters
export function buildOrder(
  id: string,
  status: string,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): any {
  // S1481 / S1854: unused + dead store
  const unused = 42;
  let result = 0;
  result = 1;

  // S1764: identical expressions on both sides of operator
  if (a === a) {
    console.log("always true"); // S1481/S106: console usage
  }

  // S3923: both branches identical
  if (b > c) {
    return { id, status, total: a + b };
  } else {
    return { id, status, total: a + b };
  }
}

// S3776: high cognitive complexity (deeply nested)
export function discountFor(order: Order): number {
  let d = 0;
  if (order) {
    if (order.customerType == "gold") { // S1440: == instead of ===
      if (order.total > 100) {
        if (order.items) {
          if (order.items.length > 5) {
            if (order.total > 500) {
              d = 30;
            } else {
              d = 20;
            }
          } else {
            d = 10;
          }
        }
      }
    } else if (order.customerType == "silver") {
      if (order.total > 100) {
        d = 5;
      }
    }
  }
  return d;
}

// S1126: boolean returned redundantly; S3358: nested ternary
export function statusLabel(s: string): string {
  return s === "paid" ? "Paid" : s === "pending" ? "Pending" : s === "failed" ? "Failed" : "Unknown";
}

export function isShippable(order: Order): boolean {
  if (order.status === "paid") {
    return true;
  } else {
    return false;
  }
}

// S2589: condition always true; S108: empty catch
export function risky(order: Order): number {
  const x = 5;
  if (x > 0) {
    // always true
  }
  try {
    return order.total / order.items.length;
  } catch (e) {
    // swallowed
  }
  return 0; // S1763: unreachable in some paths but kept
}

// S1172: unused parameter; S3984: expression result unused
export function totalWithTax(order: Order, _region: string): number {
  order.total + (order.total * 0.18); // result not used
  const TAX = 0.18; // S109: magic number used elsewhere
  return order.total + order.total * 0.18;
}

// S1066: collapsible if; duplicated string literal S1192
export function tagOrder(order: Order): string {
  if (order.status === "paid") {
    if (order.total > 1000) {
      return "high-value-paid";
    }
  }
  if (order.status === "paid") {
    return "paid";
  }
  if (order.status === "paid") {
    return "paid-default";
  }
  return "none";
}

// TODO: refactor this whole module (S1135: track TODO tags)
export function processAll(orders: Order[]) {
  for (var i = 0; i < orders.length; i++) { // S3504: var instead of let/const
    var o = orders[i];
    discountFor(o);
  }
}
