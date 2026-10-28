import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { loginSchema } from "../schemas/loginSchema";
import type { LoginInput } from "../schemas/loginSchema";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorBackend, setErrorBackend] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBackend(null);

    const resultado = loginSchema.safeParse(form);

    if (!resultado.success) {
      const errMap: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!errMap[campo]) errMap[campo] = issue.message;
      }
      setErrores(errMap);
      return;
    }

    setErrores({});
    setCargando(true);

    try {
      await login(resultado.data);
      navigate("/catalogo");
    } catch (err: any) {
      setErrorBackend(err.message || "Error al iniciar sesión");
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

            <h2 className="mb-4 text-center">Iniciar Sesión</h2>

            {errorBackend && (
              <Alert variant="danger" className="py-2">
                {errorBackend}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ej: admin@libreria.test"
                  value={form.email}
                  onChange={handleChange}
                  isInvalid={!!errores.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  isInvalid={!!errores.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-semibold"
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
                    Ingresando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default Login;
