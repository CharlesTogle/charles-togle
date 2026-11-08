"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "solar:visited";

// Visited planets are a per-viewer convenience, so browser storage is fine;
// every access is guarded because storage can be blocked or unavailable.
function readStored(validIds: string[]): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string" && validIds.includes(id)) : [];
  } catch {
    return [];
  }
}

export function useVisitedPlanets(validIds: string[]) {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    // Read after mount so server and first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisited(readStored(validIds));
    // validIds is static data; reading once on mount is intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markVisited = useCallback((id: string) => {
    setVisited((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable: the log still works for this visit.
      }
      return next;
    });
  }, []);

  return { visited, markVisited };
}
