import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext — Carrito de compras", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia con el carrito vacío", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrecio).toBe(0);
  });

  it("permite agregar un libro al carrito e incrementa la cantidad", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const libro = {
      id: 1,
      titulo: "Juego de Tronos",
      precio: 15000,
      imagen: "https://ejemplo.com/juego.jpg",
      autor: "George R. R. Martin",
    };

    act(() => {
      const agregado = result.current.agregarAlCarrito(libro);
      expect(agregado).toBe(true);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrecio).toBe(15000);

    // Agregar el mismo libro incrementa cantidad
    act(() => {
      result.current.agregarAlCarrito(libro, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrecio).toBe(45000);
  });

  it("rechaza agregar libros sin stock (disponible === false)", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const libroSinStock = {
      id: 99,
      titulo: "Libro Agotado",
      precio: 10000,
      imagen: "https://ejemplo.com/agotado.jpg",
      disponible: false,
    };

    act(() => {
      const agregado = result.current.agregarAlCarrito(libroSinStock);
      expect(agregado).toBe(false);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("permite actualizar cantidad y eliminar libro del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.agregarAlCarrito({
        id: 2,
        titulo: "Dune",
        precio: 20000,
        imagen: "https://ejemplo.com/dune.jpg",
      });
    });

    act(() => {
      result.current.actualizarCantidad(2, 5);
    });

    expect(result.current.items[0].cantidad).toBe(5);
    expect(result.current.totalPrecio).toBe(100000);

    act(() => {
      result.current.eliminarDelCarrito(2);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("permite vaciar el carrito completamente", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.agregarAlCarrito({ id: 1, titulo: "L1", precio: 100, imagen: "" });
      result.current.agregarAlCarrito({ id: 2, titulo: "L2", precio: 200, imagen: "" });
    });

    expect(result.current.totalItems).toBe(2);

    act(() => {
      result.current.vaciarCarrito();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrecio).toBe(0);
  });
});
