import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Usuario, Rol, Credenciales, Sesion } from "../types/sesionType";
import { guardarToken, obtenerToken, borrarToken } from "../services/sesion";
import { apiFetch, EVENTO_SESION_EXPIRADA } from "../services/api";

export interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  usuario: null,
  cargando: false,
  estaAutenticado: false,
  tieneRol: () => false,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Inicializamos en true solo si existe un token por verificar en localStorage
  const [cargando, setCargando] = useState<boolean>(() => obtenerToken() !== null);

  // Rehidratación al montar el Provider (F5)
  useEffect(() => {
    const token = obtenerToken();
    if (!token) return;

    apiFetch<Usuario>("/api/auth/yo")
      .then((user) => {
        setUsuario(user);
      })
      .catch(() => {
        borrarToken();
        setUsuario(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Listener por si un request devuelve 401 con token vencido en medio de la sesión
  useEffect(() => {
    const manejarExpiracion = () => {
      borrarToken();
      setUsuario(null);
    };

    window.addEventListener(EVENTO_SESION_EXPIRADA, manejarExpiracion);
    return () => {
      window.removeEventListener(EVENTO_SESION_EXPIRADA, manejarExpiracion);
    };
  }, []);

  const login = async (credenciales: Credenciales): Promise<void> => {
    const sesion = await apiFetch<Sesion>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credenciales),
    });

    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  const logout = (): void => {
    borrarToken();
    setUsuario(null);
  };

  const estaAutenticado = usuario !== null;

  const tieneRol = (rol: Rol): boolean => {
    return usuario?.rol === rol;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
}
