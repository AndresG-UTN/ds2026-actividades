import { prisma } from "../src/config/prisma/prisma";

const autores = [
  { nombre: "George R. Martin", nacionalidad: "Estados Unidos" },
  { nombre: "Miguel de Cervantes", nacionalidad: "España" },
  { nombre: "Suzanne Collins", nacionalidad: "Estados Unidos" },
];

const categorias = [
  { nombre: "Fantasía" },
  { nombre: "Clásico" },
  { nombre: "Ciencia Ficción" },
  { nombre: "Aventura" },
];

const libros = [
  {
    titulo: "Juego De Tronos 1",
    precio: 25000,
    imagen:
      "https://www.penguinlibros.com/ar/2384912/juego-de-tronos-cancion-de-hielo-y-fuego-1.jpg",
    disponible: true,
    autor: "George R. Martin",
    cats: ["Fantasía", "Aventura"],
  },
  {
    titulo: "Don Quijote De La Mancha",
    precio: 18000,
    imagen:
      "https://cdn-ilegjjh.nitrocdn.com/ejqufJyIisinuMyfLHCbacgYVWkoIaNa/assets/images/optimized/rev-4ea96de/plutonediciones.com/wp-content/uploads/2025/12/Don-Quijote-de-la-Mancha-Miguel-de-Cervantes-min-1.jpg",
    disponible: true,
    autor: "Miguel de Cervantes",
    cats: ["Clásico", "Aventura"],
  },
  {
    titulo: "Los Juegos Del Hambre 1",
    precio: 22000,
    imagen:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/cb/a6/cba6a75b6f50491ef576a4e39f820727.jpg",
    disponible: false,
    autor: "Suzanne Collins",
    cats: ["Ciencia Ficción", "Aventura"],
  },
];

async function main() {
  // 1) Autores y categorías primero
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  // 2) Libros conectando sus relaciones existentes sin id manual
  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: {
          connect: cats.map((nombre) => ({ nombre })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });