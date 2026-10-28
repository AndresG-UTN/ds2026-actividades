import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Nav,
  Card,
  Table,
  Badge,
  Modal,
} from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { apiFetch } from "../services/api";
import type { Libro } from "../types/libro";

interface FormCrearLibro {
  titulo: string;
  autorId: number;
  precio: number;
  imagen: string;
  disponible: boolean;
}

function LibroNuevo() {
  const [tabActiva, setTabActiva] = useState<"agregar" | "eliminar">("agregar");

  // Estado para el formulario de agregar libro
  const [formData, setFormData] = useState<FormCrearLibro>({
    titulo: "",
    autorId: 1,
    precio: 0,
    imagen: "",
    disponible: true,
  });
  const [guardando, setGuardando] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [errorBackend, setErrorBackend] = useState<string | null>(null);

  // Estado para la lista de libros a eliminar
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargandoLibros, setCargandoLibros] = useState<boolean>(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);
  const [mensajeEliminado, setMensajeEliminado] = useState<string | null>(null);

  // Modal de confirmación para eliminar
  const [libroAEliminar, setLibroAEliminar] = useState<Libro | null>(null);
  const [eliminando, setEliminando] = useState<boolean>(false);

  // Cargar lista de libros cuando se selecciona la pestaña 'eliminar'
  const cargarLibros = async () => {
    setCargandoLibros(true);
    setErrorEliminar(null);
    try {
      const data = await apiFetch<Libro[]>("/api/libros");
      setLibros(data);
    } catch (err: any) {
      setErrorEliminar(err.message || "Error al cargar los libros");
    } finally {
      setCargandoLibros(false);
    }
  };

  useEffect(() => {
    if (tabActiva === "eliminar") {
      cargarLibros();
    }
  }, [tabActiva]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "precio" || name === "autorId") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBackend(null);
    setMensajeExito(null);
    setGuardando(true);

    try {
      await apiFetch("/api/libros", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setMensajeExito(`¡El libro "${formData.titulo}" fue agregado exitosamente!`);
      // Resetear el formulario
      setFormData({
        titulo: "",
        autorId: 1,
        precio: 0,
        imagen: "",
        disponible: true,
      });
    } catch (err: any) {
      setErrorBackend(err.message || "Error al crear el libro");
    } finally {
      setGuardando(false);
    }
  };

  const handleConfirmarEliminar = async () => {
    if (!libroAEliminar) return;

    setEliminando(true);
    setErrorEliminar(null);
    setMensajeEliminado(null);

    try {
      await apiFetch(`/api/libros/${libroAEliminar.id}`, {
        method: "DELETE",
      });

      setLibros((prev) => prev.filter((l) => l.id !== libroAEliminar.id));
      setMensajeEliminado(`El libro "${libroAEliminar.titulo}" ha sido eliminado exitosamente.`);
      setLibroAEliminar(null);
    } catch (err: any) {
      setErrorEliminar(err.message || "Error al eliminar el libro");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <Layout>
      <Container className="py-5" style={{ maxWidth: "850px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark mb-0 fw-bold">Administración de Libros</h2>
          <Link to="/catalogo" className="btn btn-outline-secondary btn-sm">
            &larr; Volver al catálogo
          </Link>
        </div>

        {/* Selector de pestañas: Agregar Libro vs Eliminar Libro */}
        <Nav variant="pills" className="nav-fill mb-4 p-1 bg-light rounded border shadow-sm">
          <Nav.Item>
            <Nav.Link
              active={tabActiva === "agregar"}
              onClick={() => {
                setTabActiva("agregar");
                setMensajeExito(null);
                setErrorBackend(null);
              }}
              style={{ cursor: "pointer" }}
              className="fw-semibold"
            >
              ➕ Agregar Nuevo Libro
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={tabActiva === "eliminar"}
              onClick={() => {
                setTabActiva("eliminar");
                setMensajeEliminado(null);
                setErrorEliminar(null);
              }}
              style={{ cursor: "pointer" }}
              className="fw-semibold text-danger"
            >
              🗑️ Eliminar Libro
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* PESTAÑA: AGREGAR LIBRO */}
        {tabActiva === "agregar" && (
          <Card className="p-4 shadow-sm bg-white rounded border">
            <h4 className="mb-3 text-primary">Crear Nuevo Libro</h4>
            <p className="text-muted small mb-4">
              Completá los datos del libro para incorporarlo al catálogo.
            </p>

            {mensajeExito && (
              <Alert variant="success" dismissible onClose={() => setMensajeExito(null)}>
                {mensajeExito}
              </Alert>
            )}

            {errorBackend && (
              <Alert variant="danger" dismissible onClose={() => setErrorBackend(null)}>
                <Alert.Heading>Error en la operación</Alert.Heading>
                <p className="mb-0">{errorBackend}</p>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitulo">
                <Form.Label>Título del Libro</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  placeholder="Ej: Choque de Reyes"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAutorId">
                <Form.Label>ID de Autor (autorId existente en BD)</Form.Label>
                <Form.Control
                  type="number"
                  name="autorId"
                  min={1}
                  value={formData.autorId}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Recordá que en el seed cargaste a George R. Martin como ID: 1.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrecio">
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min={1}
                  placeholder="Ej: 28000"
                  value={formData.precio === 0 ? "" : formData.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImagen">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="url"
                  name="imagen"
                  placeholder="https://ejemplo.com/portada.jpg"
                  value={formData.imagen}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formDisponible">
                <Form.Check
                  type="checkbox"
                  name="disponible"
                  label="Disponible para la venta"
                  checked={formData.disponible}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold py-2"
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Guardando en la API...
                  </>
                ) : (
                  "Guardar Libro"
                )}
              </Button>
            </Form>
          </Card>
        )}

        {/* PESTAÑA: ELIMINAR LIBRO */}
        {tabActiva === "eliminar" && (
          <Card className="p-4 shadow-sm bg-white rounded border">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-1 text-danger">Lista de Libros a Eliminar</h4>
                <p className="text-muted small mb-0">
                  Seleccioná el libro que deseás quitar permanentemente del catálogo.
                </p>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={cargarLibros}
                disabled={cargandoLibros}
              >
                🔄 Actualizar lista
              </Button>
            </div>

            {mensajeEliminado && (
              <Alert variant="success" dismissible onClose={() => setMensajeEliminado(null)}>
                {mensajeEliminado}
              </Alert>
            )}

            {errorEliminar && (
              <Alert variant="danger" dismissible onClose={() => setErrorEliminar(null)}>
                {errorEliminar}
              </Alert>
            )}

            {cargandoLibros ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-2 text-muted">Cargando libros desde el servidor...</p>
              </div>
            ) : libros.length === 0 ? (
              <p className="text-muted text-center py-4">No hay libros registrados en el catálogo.</p>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Portada</th>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {libros.map((libro) => (
                      <tr key={libro.id}>
                        <td style={{ width: "60px" }}>
                          <img
                            src={libro.imagen}
                            alt={libro.titulo}
                            style={{ width: "45px", height: "60px", objectFit: "cover" }}
                            className="rounded shadow-sm"
                          />
                        </td>
                        <td>
                          <div className="fw-semibold text-dark">{libro.titulo}</div>
                          <small className="text-muted">ID: {libro.id}</small>
                        </td>
                        <td>{typeof libro.autor === "object" ? libro.autor.nombre : libro.autor}</td>
                        <td className="fw-semibold">${libro.precio.toLocaleString()}</td>
                        <td>
                          <Badge bg={libro.disponible ? "success" : "secondary"}>
                            {libro.disponible ? "Disponible" : "Sin stock"}
                          </Badge>
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="fw-semibold"
                            onClick={() => setLibroAEliminar(libro)}
                          >
                            🗑️ Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card>
        )}

        {/* Modal de confirmación para eliminar libro */}
        <Modal show={libroAEliminar !== null} onHide={() => setLibroAEliminar(null)} centered>
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title className="fs-5">Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Estás seguro de que deseás eliminar el libro{" "}
              <strong>"{libroAEliminar?.titulo}"</strong>?
            </p>
            <p className="text-danger small mb-0">
              ⚠️ Esta acción no se puede deshacer y el libro se eliminará permanentemente de la base de datos.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setLibroAEliminar(null)}
              disabled={eliminando}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmarEliminar}
              disabled={eliminando}
            >
              {eliminando ? <Spinner animation="border" size="sm" /> : "Sí, Eliminar Libro"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}

export default LibroNuevo;
