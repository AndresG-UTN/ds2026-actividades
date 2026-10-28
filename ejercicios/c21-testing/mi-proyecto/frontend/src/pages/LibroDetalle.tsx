import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import type { LibroDetalleData } from "../types/libro";
import { apiFetch } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface FormEditarLibro {
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autorId: number;
}

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<LibroDetalleData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [agregadoAlCarrito, setAgregadoAlCarrito] = useState<boolean>(false);
  const [mensajeExitoEditar, setMensajeExitoEditar] = useState<string | null>(null);

  // Estados para modal de edición (solo ADMIN)
  const [mostrarModalEditar, setMostrarModalEditar] = useState<boolean>(false);
  const [formEditar, setFormEditar] = useState<FormEditarLibro>({
    titulo: "",
    precio: 0,
    imagen: "",
    disponible: true,
    autorId: 1,
  });
  const [guardandoEditar, setGuardandoEditar] = useState<boolean>(false);
  const [errorEditar, setErrorEditar] = useState<string | null>(null);

  const { agregarAlCarrito } = useCart();
  const { tieneRol } = useAuth();
  const esAdmin = tieneRol("ADMIN");

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
      disponible: libro.disponible,
    });
    setAgregadoAlCarrito(true);
  };

  const handleAbrirEditar = () => {
    if (!libro) return;
    setFormEditar({
      titulo: libro.titulo,
      precio: libro.precio,
      imagen: libro.imagen,
      disponible: libro.disponible,
      autorId: libro.autorId || libro.autor.id,
    });
    setErrorEditar(null);
    setMostrarModalEditar(true);
  };

  const handleGuardarEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoEditar(true);
    setErrorEditar(null);

    try {
      const libroActualizado = await apiFetch<LibroDetalleData>(`/api/libros/${id}`, {
        method: "PUT",
        body: JSON.stringify(formEditar),
      });

      setLibro(libroActualizado);
      setMostrarModalEditar(false);
      setMensajeExitoEditar("¡Los datos del libro se actualizaron correctamente!");
    } catch (err: any) {
      setErrorEditar(err.message || "Error al actualizar los datos del libro");
    } finally {
      setGuardandoEditar(false);
    }
  };

  return (
    <Layout>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/catalogo" className="btn btn-outline-secondary">
            &larr; Volver al catálogo
          </Link>
          <Link to="/carrito" className="btn btn-outline-primary">
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

        {mensajeExitoEditar && (
          <Alert variant="success" dismissible onClose={() => setMensajeExitoEditar(null)} className="shadow-sm mb-4">
            {mensajeExitoEditar}
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

                  <div className="mt-auto pt-3 border-top d-flex flex-wrap gap-3 align-items-center">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      disabled={!libro.disponible}
                      onClick={handleComprar}
                      className="px-4 fw-semibold"
                    >
                      {libro.disponible ? "Comprar libro" : "No disponible"}
                    </Button>

                    {/* Opción de Modificar Datos exclusiva para ADMIN */}
                    {esAdmin && (
                      <Button
                        variant="outline-primary"
                        size="lg"
                        onClick={handleAbrirEditar}
                        className="fw-semibold d-flex align-items-center gap-2"
                      >
                        <span>✏️</span>
                        <span>Modificar Datos</span>
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}

        {/* Modal de Modificar Datos (Exclusivo ADMIN) */}
        <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="fs-5">✏️ Modificar Datos del Libro</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleGuardarEditar}>
            <Modal.Body className="p-4">
              {errorEditar && (
                <Alert variant="danger" dismissible onClose={() => setErrorEditar(null)}>
                  {errorEditar}
                </Alert>
              )}

              <Form.Group className="mb-3" controlId="editTitulo">
                <Form.Label>Título del Libro</Form.Label>
                <Form.Control
                  type="text"
                  value={formEditar.titulo}
                  onChange={(e) => setFormEditar((prev) => ({ ...prev, titulo: e.target.value }))}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="editPrecio">
                    <Form.Label>Precio ($)</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={formEditar.precio}
                      onChange={(e) => setFormEditar((prev) => ({ ...prev, precio: Number(e.target.value) }))}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="editAutorId">
                    <Form.Label>ID de Autor</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={formEditar.autorId}
                      onChange={(e) => setFormEditar((prev) => ({ ...prev, autorId: Number(e.target.value) }))}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="editImagen">
                <Form.Label>URL de la Portada</Form.Label>
                <Form.Control
                  type="url"
                  value={formEditar.imagen}
                  onChange={(e) => setFormEditar((prev) => ({ ...prev, imagen: e.target.value }))}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="editDisponible">
                <Form.Check
                  type="checkbox"
                  label="Disponible para la venta (con stock)"
                  checked={formEditar.disponible}
                  onChange={(e) => setFormEditar((prev) => ({ ...prev, disponible: e.target.checked }))}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMostrarModalEditar(false)} disabled={guardandoEditar}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={guardandoEditar}>
                {guardandoEditar ? <Spinner animation="border" size="sm" /> : "Guardar Cambios"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </Layout>
  );
}

export default LibroDetalle;
