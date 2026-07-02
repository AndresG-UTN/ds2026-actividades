import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';

function LibroDetalle() {
  const { id } = useParams();

  return (
    <Layout>
      <Container className="py-5 text-center">
        <h2>Detalle del Libro</h2>
        <p className="lead mt-4">
          Estás viendo la información del libro con ID: <strong>{id}</strong>
        </p>
      </Container>
    </Layout>
  );
}

export default LibroDetalle;