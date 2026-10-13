import { obtenerToken, borrarToken } from "./sesion";

const BASE_URL = import.meta.env.VITE_API_URL;

export const EVENTO_SESION_EXPIRADA = "auth:sesion-expirada";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
    // Si teníamos token y el back responde 401, el token venció o es inválido
    if (res.status === 401 && token) {
      borrarToken();
      window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
    }

    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}