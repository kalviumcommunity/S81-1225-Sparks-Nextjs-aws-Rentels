import type { ApiResponse } from "@/lib/responseHandler";

export const fetcher = async <T>(url: string): Promise<T> => {
  const delayMs = Number(process.env.NEXT_PUBLIC_FETCH_DELAY_MS ?? "0");
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  const doFetch = () =>
    fetch(url, {
      credentials: "include",
    });

  let res = await doFetch();

  // If access token expired, attempt a refresh once, then retry the request.
  if (res.status === 401) {
    const refresh = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refresh.ok) {
      res = await doFetch();
    }
  }

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
