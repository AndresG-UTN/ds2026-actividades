import { Container } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';

function Catalogo() {
  return (
    <Layout>
      <Container className="py-5">
        <h2 className="mb-4">Catálogo Completo</h2>
        <p>Próximamente aquí estará la lista completa de nuestros libros...</p>
      </Container>
    </Layout>
  );
}

export default Catalogo;