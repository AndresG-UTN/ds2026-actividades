import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <small>&copy; {new Date().getFullYear()} Librería - Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
}

export default Footer;