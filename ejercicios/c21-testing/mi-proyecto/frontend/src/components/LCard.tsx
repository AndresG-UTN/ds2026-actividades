import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Autor } from "../types/libro.ts";
import { useCart } from "../context/CartContext";

interface LibroCardProps {
  id: number;
  titulo: string;
  autor: Autor | string;
  imagen: string;
  precio?: number;
}

function LibroCard({ id, titulo, autor, imagen, precio }: LibroCardProps) {
  const nombreAutor = typeof autor === "object" ? autor.nombre : autor;
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleComprar = () => {
    agregarAlCarrito({
      id,
      titulo,
      precio: precio || 0,
      imagen,
      autor: nombreAutor,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <Card style={{ width: "100%", maxWidth: "18rem" }} className="mb-4 h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
        style={{ height: "350px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold mb-1">{titulo}</Card.Title>
        <Card.Text className="text-muted small mb-2">{nombreAutor}</Card.Text>

        {precio !== undefined && (
          <div className="fw-bold text-primary mb-3">
            ${precio.toLocaleString()}
          </div>
        )}

        <div className="mt-auto d-grid gap-2">
          <Button
            variant={agregado ? "success" : "primary"}
            size="sm"
            onClick={handleComprar}
            className="fw-semibold"
          >
            {agregado ? "✓ ¡En el carrito!" : "Comprar libro"}
          </Button>

          <Link
            to={`/libros/${id}`}
            className="btn btn-outline-secondary btn-sm"
          >
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;
