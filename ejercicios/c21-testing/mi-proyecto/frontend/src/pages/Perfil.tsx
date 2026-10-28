import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/AuthContext';

function Perfil() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-dark text-white text-center py-3">
                <h4 className="mb-0">Mi Perfil</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div 
                    className="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" 
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    👤
                  </div>
                  <h5 className="mb-1">{usuario?.nombre || 'Nombre del Usuario'}</h5>
                  <p className="text-muted small mb-2">{usuario?.email || 'usuario@ejemplo.com'}</p>
                  <span className="badge bg-secondary">
                    {usuario?.rol ? `Rol: ${usuario.rol}` : 'Usuario'}
                  </span>
                </div>

                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control 
                      type="text" 
                      defaultValue={usuario?.nombre || ''} 
                      placeholder="Ingresa tu nombre" 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                      type="email" 
                      defaultValue={usuario?.email || ''} 
                      placeholder="Ingresa tu correo" 
                      disabled
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" type="submit">
                      Guardar Cambios
                    </Button>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Cerrar Sesión
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Perfil;
