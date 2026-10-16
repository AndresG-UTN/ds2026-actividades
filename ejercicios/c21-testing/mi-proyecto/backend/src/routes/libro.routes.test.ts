import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

const libroNuevo = {
  titulo: "Libro de Prueba",
  precio: 1500,
  autorId: 1,
  categoriaId: 1,
  stock: 10
};

describe("Matriz de permisos - Rutas de Libros (sin DB)", () => {
  it("con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido → 400, no 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...libroNuevo, precio: -5 });
    
    expect(res.status).toBe(400);
  });
});