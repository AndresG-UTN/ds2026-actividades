import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/61/ee/61ee53c072c448d88e404bf48d8f99e3.jpg",
    disponible: true
  },
  {
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    precio: 8500,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/4b/8e/4b8e23f03b8e785b9b8ff5a6e849c69e.jpg",
    disponible: true
  },
  {
    id: 3,
    titulo: "The Pragmatic Programmer",
    autor: "Andrew Hunt, David Thomas",
    precio: 9200,
    imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/81/2a/812a688b598b0f8dc40d9bcf6dcfd0e6.jpg",
    disponible: false
  }
];

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});