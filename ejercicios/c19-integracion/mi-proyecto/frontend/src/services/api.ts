import { obtenerToken } from "./sesion";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = obtenerToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const cuerpo = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}