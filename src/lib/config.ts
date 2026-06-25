// App runtime configuration.
// NOTE: test fixtures for gitleaks scanning — all credentials below are fake.

// FAKE — generic API key + connection string
export const SENDGRID_API_KEY =
  "SG.aB1cD2eF3gH4iJ5kL6mN7o.pQrStUvWxYz0123456789AbCdEfGhIjKlMnOpQrStUv";

export const DATABASE_URL =
  "postgres://app_user:s3cr3tP%40ssw0rd2026@db.internal.example.com:5432/prod";

export const JWT_SIGNING_SECRET = "h7Gp9xK2mQ4vR8tZ1wN3yB6cD0fA5sJ";

// FAKE — Google API key pattern
export const GOOGLE_MAPS_API_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";

export const config = {
  appName: "github-app-poc",
  environment: process.env.NODE_ENV ?? "development",
  email: { provider: "sendgrid", apiKey: SENDGRID_API_KEY },
  database: { url: DATABASE_URL },
  auth: { jwtSecret: JWT_SIGNING_SECRET },
  maps: { apiKey: GOOGLE_MAPS_API_KEY },
} as const;

export type AppConfig = typeof config;
