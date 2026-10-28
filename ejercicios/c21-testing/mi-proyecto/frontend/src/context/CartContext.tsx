import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  autor?: string;
  cantidad: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrecio: number;
  agregarAlCarrito: (libro: { id: number; titulo: string; precio: number; imagen: string; autor?: string }, cantidad?: number) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  vaciarCarrito: () => void;
}

const CART_STORAGE_KEY = "libreria_carrito";

const defaultCartContext: CartContextType = {
  items: [],
  totalItems: 0,
  totalPrecio: 0,
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
  actualizarCantidad: () => {},
  vaciarCarrito: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const guardado = localStorage.getItem(CART_STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorar error si el almacenamiento está restringido
    }
  }, [items]);

  const agregarAlCarrito = (
    libro: { id: number; titulo: string; precio: number; imagen: string; autor?: string },
    cantidad: number = 1
  ) => {
    setItems((prev) => {
      const existe = prev.find((item) => item.id === libro.id);
      if (existe) {
        return prev.map((item) =>
          item.id === libro.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [
        ...prev,
        {
          id: libro.id,
          titulo: libro.titulo,
          precio: libro.precio,
          imagen: libro.imagen,
          autor: libro.autor,
          cantidad,
        },
      ];
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrecio,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  return context || defaultCartContext;
}

