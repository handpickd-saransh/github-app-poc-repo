// Payment provider integration helpers.
// NOTE: test fixtures for gitleaks scanning — all credentials below are fake.

export interface ChargeRequest {
  amountCents: number;
  currency: string;
  customerId: string;
}

// FAKE — Stripe live secret key pattern
const STRIPE_SECRET_KEY = "sk_live_51HxQp2Ka8nVbZ4tRmWcLpXyZ9dQ7fGhJ3kLmN0pQrStUvWxYz";

const STRIPE_API_BASE = "https://api.stripe.com/v1";

function authHeader(): Record<string, string> {
  const token = Buffer.from(`${STRIPE_SECRET_KEY}:`).toString("base64");
  return { Authorization: `Basic ${token}` };
}

export async function createCharge(req: ChargeRequest): Promise<Response> {
  const body = new URLSearchParams({
    amount: String(req.amountCents),
    currency: req.currency,
    customer: req.customerId,
  });

  return fetch(`${STRIPE_API_BASE}/charges`, {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

export function formatAmount(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
