import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Autor } from "../types/libro.ts";

interface LibroCardProps {
  id: number;
  titulo: string;
  autor: Autor | string;
  imagen: string;
}

function LibroCard({ id, titulo, autor, imagen }: LibroCardProps) {
  const nombreAutor = typeof autor === "object" ? autor.nombre : autor;

  return (
    <Card style={{ width: "18rem" }} className="mb-4 h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
        style={{ height: "350px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{nombreAutor}</Card.Text>

        <Link
          to={`/libros/${id}`}
          className="btn btn-primary mt-auto w-100 fw-semibold"
        >
          Ver más
        </Link>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;