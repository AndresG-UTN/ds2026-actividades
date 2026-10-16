import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("muestra el título principal de la librería", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const brandElement = screen.getByText(/librería/i);
    expect(brandElement).toBeInTheDocument();
  });

  it("muestra los enlaces de navegación principales", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/agregar libro/i)).toBeInTheDocument();
  });
});