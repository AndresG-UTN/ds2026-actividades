import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { apiFetch } from "../services/api";

interface FormCrearLibro {
  titulo: string;
  autorId: number;
  precio: number;
  imagen: string;
  disponible: boolean;
}

function LibroNuevo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormCrearLibro>({
    titulo: "",
    autorId: 1,
    precio: 0,
    imagen: "",
    disponible: true,
  });

  const [cargando, setCargando] = useState<boolean>(false);
  const [errorBackend, setErrorBackend] = useState<string | null>(null);

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
    setCargando(true);

    try {
      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      navigate("/catalogo");
    } catch (err: any) {
      setErrorBackend(err.message || "Error al crear el libro");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Layout>
      <Container className="py-5" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark mb-0">Agregar Nuevo Libro</h2>
          <Link to="/catalogo" className="btn btn-outline-secondary btn-sm">
            &larr; Volver
          </Link>
        </div>

        {errorBackend && (
          <Alert variant="danger" dismissible onClose={() => setErrorBackend(null)}>
            <Alert.Heading>Error en la operación</Alert.Heading>
            <p className="mb-0">{errorBackend}</p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded border">
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
            className="w-100 fw-bold"
            disabled={cargando}
          >
            {cargando ? (
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
      </Container>
    </Layout>
  );
}

export default LibroNuevo;