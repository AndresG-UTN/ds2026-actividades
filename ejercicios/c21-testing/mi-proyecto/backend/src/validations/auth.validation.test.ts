import { describe, it, expect } from 'vitest';
import { loginSchema } from './auth.validation'; // Ajusta según tu exportación

describe('Auth Validation', () => {
  it('debería validar un email y contraseña correctos', () => {
    const data = { email: 'test@utn.frlp.edu.ar', password: 'password123' };
    const resultado = loginSchema.safeParse(data);
    expect(resultado.success).toBe(true);
  });

  it('debería fallar con un email inválido', () => {
    const data = { email: 'correo-inválido', password: '123' };
    const resultado = loginSchema.safeParse(data);
    expect(resultado.success).toBe(false);
  });
});