import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import * as AuthContextModule from "../../context/AuthContext";
import type { Usuario, Rol } from "../../types/sesionType";

function renderHeader(usuario: Usuario | null = null) {
  vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => {
      if (!usuario?.rol) return false;
      return usuario.rol.toUpperCase() === rol.toUpperCase();
    },
    login: vi.fn(),
    logout: vi.fn(),
  } as any);

  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe("Header — Barra de navegación y autenticación", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra 'Iniciar Sesión' y 'Registrarse' cuando el usuario no está autenticado", () => {
    renderHeader(null);

    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ver usuario/i })).not.toBeInTheDocument();
  });

  it("muestra 'Ver Usuario' y 'Cerrar Sesión' y oculta los botones de login/registro cuando el usuario inicia sesión", () => {
    const usuarioMock: Usuario = {
      id: 1,
      nombre: "Andy",
      email: "andy@test.com",
      rol: "CLIENTE",
    };

    renderHeader(usuarioMock);

    expect(screen.getByRole("button", { name: /ver usuario/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /iniciar sesión/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /registrarse/i })).not.toBeInTheDocument();
  });

  it("muestra el link 'Agregar Libro' solo si el usuario tiene rol ADMIN", () => {
    const adminMock: Usuario = {
      id: 2,
      nombre: "Admin",
      email: "admin@test.com",
      rol: "ADMIN",
    };

    const { unmount } = renderHeader(adminMock);
    expect(screen.getByRole("link", { name: /agregar libro/i })).toBeInTheDocument();

    unmount();

    const clienteMock: Usuario = {
      id: 3,
      nombre: "Cliente",
      email: "cliente@test.com",
      rol: "CLIENTE",
    };

    renderHeader(clienteMock);
    expect(screen.queryByRole("link", { name: /agregar libro/i })).not.toBeInTheDocument();
  });
});
