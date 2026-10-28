import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing on default route", async () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it("handles navigation to protected route /nuevo without throwing AuthProvider error", async () => {
    window.history.pushState({}, "Nuevo", "/nuevo");
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it("handles navigation to protected route /perfil without throwing AuthProvider error", async () => {
    window.history.pushState({}, "Perfil", "/perfil");
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
