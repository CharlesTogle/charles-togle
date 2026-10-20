export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.NODE_ENV === "production" ? "https://6digits.dev" : "http://localhost:3000");
