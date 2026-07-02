import { Container } from 'react-bootstrap';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3" data-bs-theme="dark">
      <Container fluid>
        <span className="navbar-brand"><h3>Libreria</h3></span>
      </Container>
    </nav>
  );
}

export default Header;