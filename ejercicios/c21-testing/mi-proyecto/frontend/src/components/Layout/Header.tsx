import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 

function Header() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <h3>Librería</h3>
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
            <NavLink to="/nuevo" className="nav-link">Agregar Libro</NavLink> {/* <-- NUEVO LINK */}
            
            {/* Botón para volver atrás */}
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-outline-secondary btn-sm text-light border-0"
            >
              ← Volver
            </button>

            {/* Botones integrados de Iniciar Sesión y Registrarse con navegación */}
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;