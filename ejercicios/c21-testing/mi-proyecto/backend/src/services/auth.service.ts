import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import { LoginInput, RegistroInput } from "../validations/auth.validation";

export async function registrar(datos: RegistroInput) {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash,
    },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
      creadoEn: true,
    },
  });
}

export async function login(datos: LoginInput) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });

  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const payload = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
  };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({
    where: { id },
  });
}