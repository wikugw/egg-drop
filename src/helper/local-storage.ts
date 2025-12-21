export const saveToLocalStorage = <T>(fieldKey: string, value: T) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(fieldKey, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(fieldKey: string): T | null => {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(fieldKey);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};
