import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Header() {
  const navigate = useNavigate();
  const { estaAutenticado, usuario, logout, tieneRol } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <h3 className="mb-0">Librería</h3>
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
            {tieneRol('ADMIN') && (
              <NavLink to="/nuevo" className="nav-link">Agregar Libro</NavLink>
            )}

            {/* Acceso al Carrito de Compras con indicador numérico */}
            <NavLink 
              to="/carrito" 
              className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1 text-warning me-lg-2"
              title="Ver Carrito de Compras"
            >
              <span>🛒</span>
              <span>Carrito</span>
              {totalItems > 0 && (
                <Badge bg="warning" text="dark" pill className="ms-1">
                  {totalItems}
                </Badge>
              )}
            </NavLink>
            
            {/* Botón para volver atrás */}
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-outline-secondary btn-sm text-light border-0"
              title="Volver atrás"
            >
              ← Volver
            </button>

            {/* Botones según el estado de sesión */}
            {estaAutenticado ? (
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                <button 
                  onClick={() => navigate('/perfil')} 
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                >
                  <span>👤</span>
                  <span>{usuario?.nombre ? `Ver Usuario (${usuario.nombre})` : 'Ver Usuario'}</span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger btn-sm text-white"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn btn-outline-light btn-sm ms-lg-2 text-light"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => navigate('/registro')} 
                  className="btn btn-primary btn-sm text-white"
                >
                  Registrarse
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
