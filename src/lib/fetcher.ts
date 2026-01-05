import type { ApiResponse } from "@/lib/responseHandler";

function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;

  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(prefix));
  if (!match) return null;

  return decodeURIComponent(match.slice(prefix.length));
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const token = getCookieValue("token");

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json: unknown = await res.json();

  // Our APIs generally respond with ApiResponse<T>.
  if (
    typeof json === "object" &&
    json !== null &&
    "success" in json &&
    typeof (json as { success: unknown }).success === "boolean"
  ) {
    const api = json as ApiResponse<T>;
    if (!api.success) {
      throw new Error(api.message || "Request failed");
    }
    return api.data;
  }

  return json as T;
};
