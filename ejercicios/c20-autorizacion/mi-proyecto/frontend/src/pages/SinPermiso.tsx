import { Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function SinPermiso() {
  return (
    <Layout>
      <Container className="py-5 text-center" style={{ maxWidth: "600px" }}>
        <Alert variant="warning" className="p-4 shadow-sm">
          <Alert.Heading className="display-6 mb-3">403 · Acceso Denegado</Alert.Heading>
          <p className="lead">
            No tenés los permisos necesarios para acceder a esta sección.
          </p>
          <hr />
          <Link to="/catalogo" className="btn btn-primary fw-semibold mt-2">
            Volver al Catálogo
          </Link>
        </Alert>
      </Container>
    </Layout>
  );
}

export default SinPermiso;