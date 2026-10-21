import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'; 

function Header() {
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
            <NavLink to="/nuevo" className="nav-link">Agregar Libro</NavLink>
            
            {/* Botones de Iniciar Sesión y Registrarse */}
            <div className="d-flex gap-2 ms-lg-2">
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-primary btn-sm">
                Registrarse
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;