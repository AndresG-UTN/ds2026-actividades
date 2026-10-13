import { Navigate, Outlet } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types/sesionType";

interface PrivateRouteProps {
  rolRequerido?: Rol;
}

function PrivateRoute({ rolRequerido }: PrivateRouteProps) {
  const { estaAutenticado, cargando, tieneRol } = useAuth();

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </Spinner>
      </Container>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && !tieneRol(rolRequerido)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;