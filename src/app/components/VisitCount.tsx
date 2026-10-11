import { headers } from "next/headers";

const botUserAgent = /bot|crawler|spider|slurp|facebookexternalhit|preview/i;

export function VisitCountLoading() {
  return (
    <p className="w-52 animate-pulse whitespace-nowrap text-right font-mono text-[0.65rem] uppercase tracking-widest text-(--foreground-soft) sm:text-xs sm:tracking-[0.12em]">
      Loading visits...
    </p>
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

  if (botUserAgent.test(userAgent) || !url || !token) return <span className="block w-52" />;

  const count = await incrementVisitCount(url, token);

  if (count === null) return <span className="block w-52" />;

  return (
    <p className="w-52 whitespace-nowrap font-bold text-right font-mono text-[0.85rem]! uppercase tracking-widest text-(--foreground-soft) sm:text-xs sm:tracking-[0.12em]">
      Total Visits: {count.toLocaleString("en-US") || "X"}
    </p>
  );
}
