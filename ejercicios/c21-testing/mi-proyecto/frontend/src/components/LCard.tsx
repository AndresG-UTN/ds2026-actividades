import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Autor } from "../types/libro.ts";
import { useCart } from "../context/CartContext";

interface LibroCardProps {
  id: number;
  titulo: string;
  autor: Autor | string;
  imagen: string;
  precio?: number;
  disponible?: boolean;
}

function LibroCard({ id, titulo, autor, imagen, precio, disponible = true }: LibroCardProps) {
  const nombreAutor = typeof autor === "object" ? autor.nombre : autor;
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleComprar = () => {
    if (!disponible) return;

    const agregadoOk = agregarAlCarrito({
      id,
      titulo,
      precio: precio || 0,
      imagen,
      autor: nombreAutor,
      disponible,
    });

    if (agregadoOk) {
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: "18rem" }} className="mb-4 h-100 shadow-sm border-0">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={imagen}
          alt={titulo}
          style={{ height: "350px", objectFit: "cover" }}
        />
        {!disponible && (
          <div className="position-absolute top-0 start-0 m-2">
            <Badge bg="secondary" className="px-2 py-1 shadow-sm">
              Sin stock
            </Badge>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold mb-1">{titulo}</Card.Title>
        <Card.Text className="text-muted small mb-2">{nombreAutor}</Card.Text>

        {precio !== undefined && (
          <div className="fw-bold text-primary mb-3">
            ${precio.toLocaleString()}
          </div>
        )}

        <div className="mt-auto d-grid gap-2">
          {disponible ? (
            <Button
              variant={agregado ? "success" : "primary"}
              size="sm"
              onClick={handleComprar}
              className="fw-semibold"
            >
              {agregado ? "✓ ¡En el carrito!" : "Comprar libro"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="fw-semibold"
              title="Este libro no se encuentra disponible actualmente"
            >
              Sin stock
            </Button>
          )}

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
