export const BUSINESS_PROFILE_KEY = "businessProfile";

export function saveLocalStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readLocalStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}