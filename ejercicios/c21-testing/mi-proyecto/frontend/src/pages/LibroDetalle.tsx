import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import type { LibroDetalleData } from "../types/libro";
import { apiFetch } from "../services/api";

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<LibroDetalleData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Añadido el prefijo /api en la ruta del detalle
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

  return (
    <Layout>
      <Container className="py-5">
        <Link to="/catalogo" className="btn btn-outline-secondary mb-4">
          &larr; Volver al catálogo
        </Link>

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

                  <div className="mt-auto pt-3 border-top">
                    <Button variant="primary" size="lg" disabled={!libro.disponible}>
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