import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import LibroCard from "../components/LCard";
import { Libro } from "../types/libro";
import { apiFetch } from "../services/api";

function Catalogo() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Libro[]>("/libros")
      .then((datos) => {
        setLibros(datos);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <Layout>
      <Container className="py-5">
        <h2 className="mb-4">Catálogo Completo</h2>

        {cargando && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Cargando libros...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            Error al cargar el catálogo: {error}
          </Alert>
        )}

        {!cargando && !error && (
          <Row className="g-4">
            {libros.map((libro) => (
              <Col key={libro.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                <LibroCard
                  id={libro.id}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  imagen={libro.imagen}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Layout>
  );
}

export default Catalogo;