import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import * as AuthContextModule from "../../context/AuthContext";
import type { Rol, Usuario } from "../../types/sesionType";

function renderPrivateRoute({
  usuario = null,
  cargando = false,
  rolRequerido,
  rutaInicial = "/admin/dashboard",
}: {
  usuario?: Usuario | null;
  cargando?: boolean;
  rolRequerido?: Rol;
  rutaInicial?: string;
}) {
  vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => {
      if (!usuario?.rol) return false;
      return usuario.rol.toUpperCase() === rol.toUpperCase();
    },
    login: vi.fn(),
    logout: vi.fn(),
  } as any);

  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <Routes>
        <Route path="/login" element={<h1>Iniciar Sesión</h1>} />
        <Route path="/sin-permiso" element={<h1>Acceso Denegado</h1>} />

        <Route element={<PrivateRoute rolRequerido={rolRequerido} />}>
          <Route path="/admin/dashboard" element={<h1>Panel de Administración Protegido</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("PrivateRoute — Pruebas de rutas protegidas", () => {
  it("muestra el indicador de carga mientras se verifica la sesión", () => {
    renderPrivateRoute({ cargando: true });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("redirige a /login cuando el visitante no tiene sesión activa", () => {
    renderPrivateRoute({ usuario: null, cargando: false });
    expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it("redirige a /sin-permiso cuando un CLIENTE intenta ingresar a una ruta de ADMIN", () => {
    const usuarioCliente: Usuario = {
      id: 2,
      nombre: "Martina",
      email: "martina@logistica.com",
      rol: "CLIENTE",
    };

    renderPrivateRoute({
      usuario: usuarioCliente,
      cargando: false,
      rolRequerido: "ADMIN",
    });
    expect(screen.getByRole("heading", { name: /acceso denegado/i })).toBeInTheDocument();
  });

  it("permite ver el contenido protegido cuando el usuario es ADMIN", () => {
    const usuarioAdmin: Usuario = {
      id: 1,
      nombre: "Administrador",
      email: "admin@latcomex.com",
      rol: "ADMIN",
    };

    renderPrivateRoute({
      usuario: usuarioAdmin,
      cargando: false,
      rolRequerido: "ADMIN",
    });
    expect(screen.getByRole("heading", { name: /panel de administración protegido/i })).toBeInTheDocument();
  });
});