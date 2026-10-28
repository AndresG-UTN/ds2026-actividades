import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Layout from '../components/Layout/Layout'; // Importamos el Layout general

function Perfil() {
  return (
    <Layout>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white text-center py-3">
                <h4 className="mb-0">Mi Perfil</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div 
                    className="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center mb-2" 
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    👤
                  </div>
                  <h5>Nombre del Usuario</h5>
                  <p className="text-muted small">usuario@ejemplo.com</p>
                </div>

                <Form>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control type="text" defaultValue="Nombre del Usuario" placeholder="Ingresa tu nombre" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" defaultValue="usuario@ejemplo.com" placeholder="Ingresa tu correo" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" defaultValue="+54 11 1234-5678" placeholder="Ingresa tu teléfono" />
                  </Form.Group>

                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" type="submit">
                      Guardar Cambios
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