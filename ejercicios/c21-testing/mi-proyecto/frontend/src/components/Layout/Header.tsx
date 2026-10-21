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
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
            <NavLink to="/nuevo" className="nav-link">Agregar Libro</NavLink> {/* <-- NUEVO LINK */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;