const TOKEN_KEY = "token_libreria";

export const guardarToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const obtenerToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const borrarToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};