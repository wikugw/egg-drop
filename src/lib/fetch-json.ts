export async function fetchJson<T>(
  input: RequestInfo | URL,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(input, options);

  if (!res.ok) {
    let message = "Terjadi kesalahan";

    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // kalau respons bukan JSON, biarkan pakai default message
    }

    throw new Error(message);
  }

  return (await res.json()) as T;
}

export async function postJson<TResponse, TBody>(
  url: string,
  body: TBody,
  options?: RequestInit
): Promise<TResponse> {
  return fetchJson<TResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify(body),
    ...options,
  });
}

export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    fetchJson<T>(url, { method: "GET", ...options }),

  post: <TResponse, TBody>(url: string, body: TBody, options?: RequestInit) =>
    postJson<TResponse, TBody>(url, body, options),

  put: <TResponse, TBody>(url: string, body: TBody, options?: RequestInit) =>
    fetchJson<TResponse>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(url: string, options?: RequestInit) =>
    fetchJson<T>(url, { method: "DELETE", ...options }),
};
