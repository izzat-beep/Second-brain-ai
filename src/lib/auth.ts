export const AUTH_KEY = "sba_user";

export function getAuthUser(): { name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signInMock() {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ name: "Izzatilla" }));
}

export function signOutMock() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
