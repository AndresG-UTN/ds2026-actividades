import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { apiFetch } from "../services/api";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [errorBackend, setErrorBackend] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBackend(null);
    setCargando(true);

    try {
      await apiFetch("/auth/registro", {
        method: "POST",
        body: JSON.stringify(form),
      });
      navigate("/login");
    } catch (err: any) {
      setErrorBackend(err.message || "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Layout>
      <Container className="py-5 d-flex justify-content-center">
        <Card style={{ maxWidth: "420px", width: "100%" }} className="shadow-sm border-0 p-3">
          <Card.Body>
            {/* Botón para volver atrás */}
            <Button
              variant="link"
              className="text-muted p-0 mb-3 text-decoration-none"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </Button>

            <h2 className="mb-4 text-center">Crear Cuenta</h2>

            {errorBackend && (
              <Alert variant="danger" className="py-2">
                {errorBackend}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="regNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="regEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ej: usuario@libreria.test"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="regPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-semibold mb-3" disabled={cargando}>
                {cargando ? <Spinner animation="border" size="sm" /> : "Registrarse"}
              </Button>

              <div className="text-center">
                <small className="text-muted">
                  ¿Ya tenés cuenta? <Link to="/login">Ingresá aquí</Link>
                </small>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}