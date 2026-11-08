import { headers } from "next/headers";

const botUserAgent = /bot|crawler|spider|slurp|facebookexternalhit|preview/i;

export function VisitCountLoading() {
  return (
    <span className="animate-pulse">Counting visits…</span>
  );
}

async function incrementVisitCount(url: string, token: string) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["INCR", "portfolio:visit-count"]),
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();
    const result = typeof data === "object" && data !== null && "result" in data ? data.result : null;
    const count = typeof result === "number" ? result : Number(result);

    return Number.isSafeInteger(count) && count >= 0 ? count : null;
  } catch {
    return null;
  }
}

export default async function VisitCount() {
  const userAgent = (await headers()).get("user-agent") ?? "";
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (botUserAgent.test(userAgent) || !url || !token) return null;

  const count = await incrementVisitCount(url, token);

  if (count === null) return null;

  return (
    <span>{count.toLocaleString("en-US")} visits</span>
  );
}
