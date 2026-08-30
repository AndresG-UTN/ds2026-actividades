import { prisma } from "../src/config/prisma/prisma";

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/61/d5/61d526e327a8ab5e7300c3b8ff2efea2.jpg",
    disponible: true,
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 5200,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/28/67/286782f059c03cebcbe32f7a9ca8b183.jpg",
    disponible: true,
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6800,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/b2/8a/b28a9b2b2b189b7eb9a80e1520119864.jpg",
    disponible: false,
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 5900,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/17/80/17804ee9d8fbf957df38df483b8b6bf1.jpg",
    disponible: true,
  },
  {
    titulo: "El túnel",
    autor: "Ernesto Sabato",
    precio: 4100,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/7b/25/7b25fe3871ee1b1c3c97db3717df3bc2.jpg",
    disponible: true,
  },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });