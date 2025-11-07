interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache: Record<string, CacheEntry<any>> = {};

export const setCache = <T>(key: string, data: T, ttlInSeconds: number): void => {
  cache[key] = { data, expiry: Date.now() + ttlInSeconds * 1000 };
};

export const getCache = <T>(key: string): T | null => {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    delete cache[key];
    return null;
  }
  return entry.data as T;
};
