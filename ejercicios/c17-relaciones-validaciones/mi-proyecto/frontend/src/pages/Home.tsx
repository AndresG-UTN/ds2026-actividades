import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LibroCard from '../components/LCard';
import type { Libro } from '../types/libro';

function Home() {

  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 


  useEffect(() => {
  
    const fetchLibros = async () => {
      try {
   
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/libros.json');
        
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`);
        }
        
        const data = await response.json();
        setLibros(data); 
        
      } catch (err: any) {
        setError(err.message || "Ocurrió un error desconocido");
      } finally {
        setLoading(false); 
      }
    };

    fetchLibros();
  }, []); 

  return (
    <Layout>
      <div className="text-black text-center py-5" style={{ backgroundColor: 'rgb(221, 230, 231)', minHeight: '100vh' }}>
        <Container>
          <h1 className="display-4 fw-normal">Bienvenidos a la web de la lectura</h1>
          <p className="lead text-muted">Aca tenemos de todo, somos la nueva alejandria</p>
          
          <h2 className="mt-5 mb-4 text-dark">Lecturas destacadas</h2>

          {loading && (
            <div className="my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Cargando catálogo desde el servidor...</p>
            </div>
          )}

          {error && !loading && (
            <Alert variant="danger" className="my-5 shadow-sm">
              <Alert.Heading>¡Ups! Algo salió mal</Alert.Heading>
              <p>{error}</p>
              <p className="mb-0 text-muted small">Verificá tu conexión a internet o que el servidor esté encendido.</p>
            </Alert>
          )}

          {!loading && !error && libros.length > 0 && (
            <Row xs={1} sm={2} md={3} lg={6} className="g-4 justify-content-center">
              {libros.map((libro) => (
                <Col key={libro.id} className="d-flex justify-content-center">
                  <LibroCard 
                    id={libro.id}
                    titulo={libro.titulo}
                    autor={libro.autor}
                    imagen={libro.imagen}
                  />
                </Col>
              ))}
            </Row>
          )}

          {!loading && !error && libros.length === 0 && (
            <p className="text-muted my-5">No hay libros disponibles en este momento.</p>
          )}

          <div className="text-center mt-5">
            <Link to="/catalogo" className="btn btn-primary btn-lg px-4 shadow-sm">
              Ver Catálogo Completo
            </Link>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default Home;