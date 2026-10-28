import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import type { LibroDetalleData } from "../types/libro";
import { apiFetch } from "../services/api";
import { useCart } from "../context/CartContext";

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<LibroDetalleData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [agregadoAlCarrito, setAgregadoAlCarrito] = useState<boolean>(false);

  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    if (!id) return;

    apiFetch<LibroDetalleData>(`/api/libros/${id}`)
      .then((datos) => {
        setLibro(datos);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  const handleComprar = () => {
    if (!libro || !libro.disponible) return;
    agregarAlCarrito({
      id: libro.id,
      titulo: libro.titulo,
      precio: libro.precio,
      imagen: libro.imagen,
      autor: typeof libro.autor === "object" ? libro.autor.nombre : libro.autor,
    });
    setAgregadoAlCarrito(true);
  };

  return (
    <Layout>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/catalogo" className="btn btn-outline-secondary">
            &larr; Volver al catálogo
          </Link>
          <Link to="/carrito" className="btn btn-outline-warning">
            🛒 Ver Carrito
          </Link>
        </div>

        {cargando && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Cargando libro...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            Error al cargar el detalle: {error}
          </Alert>
        )}

        {agregadoAlCarrito && (
          <Alert variant="success" dismissible onClose={() => setAgregadoAlCarrito(false)} className="shadow-sm mb-4">
            <Alert.Heading className="fs-5">¡Libro agregado al carrito con éxito!</Alert.Heading>
            <p className="mb-2">"{libro?.titulo}" ya está listo en tu carrito de compras.</p>
            <div className="d-flex gap-2">
              <Link to="/carrito" className="btn btn-success btn-sm">
                Ir al Carrito y Pagar
              </Link>
              <Button variant="outline-secondary" size="sm" onClick={() => setAgregadoAlCarrito(false)}>
                Seguir explorando
              </Button>
            </div>
          </Alert>
        )}

        {!cargando && !error && libro && (
          <Card className="shadow-sm border-0 overflow-hidden">
            <Row className="g-0">
              <Col md={4}>
                <Card.Img
                  src={libro.imagen}
                  alt={libro.titulo}
                  style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "380px" }}
                />
              </Col>
              <Col md={8}>
                <Card.Body className="p-4 d-flex flex-column h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="display-6 mb-0">{libro.titulo}</Card.Title>
                    <Badge bg={libro.disponible ? "success" : "secondary"}>
                      {libro.disponible ? "Disponible" : "Sin stock"}
                    </Badge>
                  </div>

                  <p className="text-muted fs-5 mb-3">
                    Autor: <strong>{libro.autor.nombre}</strong> ({libro.autor.nacionalidad})
                  </p>

                  {libro.categorias && libro.categorias.length > 0 && (
                    <div className="mb-3">
                      {libro.categorias.map((cat) => (
                        <Badge key={cat.id} bg="info" className="me-1 text-dark">
                          {cat.nombre}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h3 className="text-primary my-3">${libro.precio.toLocaleString()}</h3>

                  <div className="mt-auto pt-3 border-top d-flex gap-3 align-items-center">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      disabled={!libro.disponible}
                      onClick={handleComprar}
                      className="px-4 fw-semibold"
                    >
                      {libro.disponible ? "Comprar libro" : "No disponible"}
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </Container>
    </Layout>
  );
}

export default LibroDetalle;
