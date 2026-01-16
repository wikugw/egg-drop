type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
};

const store = new Map<string, number[]>();

export function rateLimit(
  ip: string,
  { limit = 5, windowMs = 60_000 }: RateLimitOptions = {}
): boolean {
  const now = Date.now();
  const timestamps = store.get(ip) ?? [];

  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    return false;
  }

  recent.push(now);
  store.set(ip, recent);
  return true;
}
