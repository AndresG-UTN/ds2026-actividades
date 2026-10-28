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
  const [tabActiva, setTabActiva] = useState<"agregar" | "stock" | "eliminar">("agregar");

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

  // Estado para la lista de libros (usado en sumar stock y eliminar)
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargandoLibros, setCargandoLibros] = useState<boolean>(false);
  const [errorOperacion, setErrorOperacion] = useState<string | null>(null);
  const [mensajeOperacion, setMensajeOperacion] = useState<string | null>(null);

  // Estado para modificar stock
  const [actualizandoStockId, setActualizandoStockId] = useState<number | null>(null);

  // Modal de confirmación para eliminar
  const [libroAEliminar, setLibroAEliminar] = useState<Libro | null>(null);
  const [eliminando, setEliminando] = useState<boolean>(false);

  // Cargar lista de libros cuando se selecciona 'stock' o 'eliminar'
  const cargarLibros = async () => {
    setCargandoLibros(true);
    setErrorOperacion(null);
    try {
      const data = await apiFetch<Libro[]>("/api/libros");
      setLibros(data);
    } catch (err: any) {
      setErrorOperacion(err.message || "Error al cargar los libros");
    } finally {
      setCargandoLibros(false);
    }
  };

  useEffect(() => {
    if (tabActiva === "stock" || tabActiva === "eliminar") {
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

  // Función para sumar / cambiar stock de un libro preexistente
  const handleCambiarStock = async (libro: Libro, nuevoEstado: boolean) => {
    setActualizandoStockId(libro.id);
    setErrorOperacion(null);
    setMensajeOperacion(null);

    try {
      await apiFetch(`/api/libros/${libro.id}`, {
        method: "PUT",
        body: JSON.stringify({ disponible: nuevoEstado }),
      });

      setLibros((prev) =>
        prev.map((l) => (l.id === libro.id ? { ...l, disponible: nuevoEstado } : l))
      );

      setMensajeOperacion(
        nuevoEstado
          ? `¡Stock sumado con éxito! "${libro.titulo}" ahora está disponible para la compra.`
          : `"${libro.titulo}" marcado como sin stock (no disponible para la compra).`
      );
    } catch (err: any) {
      setErrorOperacion(err.message || "Error al actualizar el stock del libro");
    } finally {
      setActualizandoStockId(null);
    }
  };

  const handleConfirmarEliminar = async () => {
    if (!libroAEliminar) return;

    setEliminando(true);
    setErrorOperacion(null);
    setMensajeOperacion(null);

    try {
      await apiFetch(`/api/libros/${libroAEliminar.id}`, {
        method: "DELETE",
      });

      setLibros((prev) => prev.filter((l) => l.id !== libroAEliminar.id));
      setMensajeOperacion(`El libro "${libroAEliminar.titulo}" ha sido eliminado exitosamente.`);
      setLibroAEliminar(null);
    } catch (err: any) {
      setErrorOperacion(err.message || "Error al eliminar el libro");
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

        {/* Selector de pestañas: Agregar Libro vs Sumar Stock vs Eliminar Libro */}
        <Nav variant="pills" className="nav-fill mb-4 p-1 bg-white rounded border shadow-sm">
          <Nav.Item>
            <Nav.Link
              active={tabActiva === "agregar"}
              onClick={() => {
                setTabActiva("agregar");
                setMensajeExito(null);
                setErrorBackend(null);
                setMensajeOperacion(null);
              }}
              style={{ cursor: "pointer" }}
              className="fw-semibold"
            >
              ➕ Agregar Nuevo Libro
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={tabActiva === "stock"}
              onClick={() => {
                setTabActiva("stock");
                setMensajeOperacion(null);
                setErrorOperacion(null);
              }}
              style={{ cursor: "pointer" }}
              className="fw-semibold text-primary"
            >
              📦 Sumar Stock
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={tabActiva === "eliminar"}
              onClick={() => {
                setTabActiva("eliminar");
                setMensajeOperacion(null);
                setErrorOperacion(null);
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
                  label="Disponible para la venta (con stock)"
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

        {/* PESTAÑA: SUMAR STOCK */}
        {tabActiva === "stock" && (
          <Card className="p-4 shadow-sm bg-white rounded border">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-1 text-primary">Sumar y Gestionar Stock</h4>
                <p className="text-muted small mb-0">
                  Activá o reponé el stock de libros preexistentes para permitir que los usuarios puedan comprarlos.
                </p>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={cargarLibros}
                disabled={cargandoLibros}
              >
                🔄 Actualizar
              </Button>
            </div>

            {mensajeOperacion && (
              <Alert variant="success" dismissible onClose={() => setMensajeOperacion(null)}>
                {mensajeOperacion}
              </Alert>
            )}

            {errorOperacion && (
              <Alert variant="danger" dismissible onClose={() => setErrorOperacion(null)}>
                {errorOperacion}
              </Alert>
            )}

            {cargandoLibros ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Cargando catálogo...</p>
              </div>
            ) : libros.length === 0 ? (
              <p className="text-muted text-center py-4">No hay libros registrados.</p>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Portada</th>
                      <th>Título</th>
                      <th>Precio</th>
                      <th>Estado de Stock</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {libros.map((libro) => {
                      const actualizando = actualizandoStockId === libro.id;
                      return (
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
                            <small className="text-muted">
                              {typeof libro.autor === "object" ? libro.autor.nombre : libro.autor}
                            </small>
                          </td>
                          <td className="fw-semibold">${libro.precio.toLocaleString()}</td>
                          <td>
                            {libro.disponible ? (
                              <Badge bg="success" className="px-2 py-1">
                                ✓ Disponible (Con stock)
                              </Badge>
                            ) : (
                              <Badge bg="danger" className="px-2 py-1">
                                ✕ Agotado (Sin stock)
                              </Badge>
                            )}
                          </td>
                          <td className="text-end">
                            {libro.disponible ? (
                              <Button
                                variant="outline-warning"
                                size="sm"
                                disabled={actualizando}
                                onClick={() => handleCambiarStock(libro, false)}
                                title="Marcar como agotado"
                              >
                                {actualizando ? <Spinner animation="border" size="sm" /> : "Agotar Stock"}
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                size="sm"
                                disabled={actualizando}
                                onClick={() => handleCambiarStock(libro, true)}
                                className="fw-semibold"
                                title="Habilitar stock para la venta"
                              >
                                {actualizando ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  "➕ Sumar Stock"
                                )}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
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

            {mensajeOperacion && (
              <Alert variant="success" dismissible onClose={() => setMensajeOperacion(null)}>
                {mensajeOperacion}
              </Alert>
            )}

            {errorOperacion && (
              <Alert variant="danger" dismissible onClose={() => setErrorOperacion(null)}>
                {errorOperacion}
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
