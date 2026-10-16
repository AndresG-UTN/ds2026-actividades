import { describe, it, expect, vi } from "vitest";
import { authorize } from "./auth.middleware";
import type { Request, Response, NextFunction } from "express";

function mocks(req: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req: req as Request, res, next };
}

describe("auth.middleware - authorize", () => {
  it("retorna 403 si el rol del usuario no está autorizado", () => {
    const middleware = authorize("ADMIN");
    const { req, res, next } = mocks({
      usuario: { id: 1, email: "cliente@test.com", rol: "CLIENTE" },
    } as any);

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("llama a next() si el rol está permitido", () => {
    const middleware = authorize("ADMIN");
    const { req, res, next } = mocks({
      usuario: { id: 2, email: "admin@test.com", rol: "ADMIN" },
    } as any);

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});