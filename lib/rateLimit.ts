type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterMs: number;
};

// Stockage en mémoire (suffisant pour un premier niveau anti-spam).
const globalStore = globalThis as typeof globalThis & {
  __rateLimitStore?: Map<string, number[]>;
};

const store = globalStore.__rateLimitStore ?? new Map<string, number[]>();
if (!globalStore.__rateLimitStore) {
  globalStore.__rateLimitStore = store;
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - options.windowMs;
  const entries = (store.get(key) || []).filter((ts) => ts > windowStart);
  const allowed = entries.length < options.limit;

  if (allowed) {
    entries.push(now);
    store.set(key, entries);
    return { allowed: true, retryAfterMs: 0 };
  }

  const oldest = entries[0] || now;
  const retryAfterMs = Math.max(0, options.windowMs - (now - oldest));
  store.set(key, entries);
  return { allowed: false, retryAfterMs };
}
