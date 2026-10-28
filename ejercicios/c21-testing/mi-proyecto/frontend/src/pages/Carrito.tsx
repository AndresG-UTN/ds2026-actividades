import { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert, Badge, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Carrito() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrecio, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } = useCart();
  const { estaAutenticado, usuario } = useAuth();
  
  const [compraExitosa, setCompraExitosa] = useState<boolean>(false);
  const [mostrarModalAuth, setMostrarModalAuth] = useState<boolean>(false);

  // Verificar si hay algún libro sin stock en el carrito
  const hayItemsSinStock = items.some((item) => item.disponible === false);

  const handleFinalizarCompra = () => {
    if (hayItemsSinStock) {
      return;
    }

    // Si no ha iniciado sesión ni está registrado, solicitar registro o login
    if (!estaAutenticado) {
      setMostrarModalAuth(true);
      return;
    }

    // Si ya está autenticado, procesar la compra
    setCompraExitosa(true);
    vaciarCarrito();
  };

  return (
    <Layout>
      <Container className="py-5">
        <h2 className="mb-4 d-flex align-items-center gap-2">
          <span>🛒</span>
          <span>Carrito de Compras</span>
        </h2>

        {compraExitosa && (
          <Alert variant="success" dismissible onClose={() => setCompraExitosa(false)} className="shadow-sm mb-4">
            <Alert.Heading>¡Felicitaciones {usuario?.nombre ? usuario.nombre : ""}!</Alert.Heading>
            <p className="mb-2">Tu pedido ha sido procesado con éxito. En breve recibirás los detalles en tu correo ({usuario?.email || "registrado"}).</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Link to="/catalogo" className="btn btn-outline-success btn-sm">
                Seguir explorando libros
              </Link>
            </div>
          </Alert>
        )}

        {hayItemsSinStock && (
          <Alert variant="danger" className="shadow-sm mb-4">
            <Alert.Heading className="fs-5">⚠️ Atención: Productos sin stock en el carrito</Alert.Heading>
            <p className="mb-0">
              Uno o más libros en tu carrito no tienen stock disponible actualmente. Por favor, eliminalos de la lista para poder finalizar la compra.
            </p>
          </Alert>
        )}

        {items.length === 0 && !compraExitosa ? (
          <Card className="text-center p-5 shadow-sm border-0 my-4">
            <div className="display-1 text-muted mb-3">🛒</div>
            <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
            <p className="text-muted mb-4">Añadí libros disponibles desde el catálogo o desde el inicio para comenzar tu compra.</p>
            <div>
              <Link to="/catalogo" className="btn btn-primary px-4 py-2">
                Explorar Catálogo
              </Link>
            </div>
          </Card>
        ) : items.length > 0 ? (
          <Row className="g-4">
            {/* Lista de productos */}
            <Col lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table hover className="align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Libro</th>
                          <th>Precio</th>
                          <th style={{ width: "140px" }} className="text-center">Cantidad</th>
                          <th>Subtotal</th>
                          <th style={{ width: "50px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className={item.disponible === false ? "table-danger" : ""}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={item.imagen}
                                  alt={item.titulo}
                                  style={{ width: "50px", height: "70px", objectFit: "cover" }}
                                  className="rounded shadow-sm"
                                />
                                <div>
                                  <Link to={`/libros/${item.id}`} className="text-decoration-none fw-semibold text-dark">
                                    {item.titulo}
                                  </Link>
                                  {item.disponible === false && (
                                    <Badge bg="danger" className="ms-2">
                                      Sin stock
                                    </Badge>
                                  )}
                                  {item.autor && <div className="text-muted small">{item.autor}</div>}
                                </div>
                              </div>
                            </td>
                            <td>${item.precio.toLocaleString()}</td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                  className="px-2 py-0"
                                >
                                  -
                                </Button>
                                <span className="fw-semibold px-2">{item.cantidad}</span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                  className="px-2 py-0"
                                  disabled={item.disponible === false}
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            <td className="fw-semibold text-primary">
                              ${(item.precio * item.cantidad).toLocaleString()}
                            </td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => eliminarDelCarrito(item.id)}
                                title="Quitar del carrito"
                                className="border-0"
                              >
                                ✕
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white d-flex justify-content-between py-3">
                  <Button variant="outline-danger" size="sm" onClick={vaciarCarrito}>
                    Vaciar Carrito
                  </Button>
                  <Link to="/catalogo" className="btn btn-outline-primary btn-sm">
                    ← Seguir Comprando
                  </Link>
                </Card.Footer>
              </Card>
            </Col>

            {/* Resumen del pedido */}
            <Col lg={4}>
              <Card className="shadow-sm border-0 sticky-top" style={{ top: "100px" }}>
                <Card.Header className="bg-dark text-white py-3">
                  <h5 className="mb-0">Resumen del Pedido</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Total de ejemplares:</span>
                    <span className="fw-semibold">{totalItems}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Envío:</span>
                    <span className="text-success fw-semibold">Gratis</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fs-4 fw-bold mb-3">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrecio.toLocaleString()}</span>
                  </div>

                  {!estaAutenticado ? (
                    <div className="alert alert-warning py-2 px-3 small mb-3">
                      🔒 <strong>Atención:</strong> Para confirmar tu compra debés estar registrado o iniciar sesión.
                    </div>
                  ) : (
                    <div className="alert alert-light border py-2 px-3 small mb-3 text-muted">
                      👤 Comprando como: <strong>{usuario?.nombre || usuario?.email}</strong>
                    </div>
                  )}

                  <Button
                    variant={hayItemsSinStock ? "secondary" : "success"}
                    size="lg"
                    className="w-100 fw-bold shadow-sm"
                    onClick={handleFinalizarCompra}
                    disabled={hayItemsSinStock || items.length === 0}
                  >
                    {hayItemsSinStock
                      ? "No disponible (quitar sin stock)"
                      : !estaAutenticado
                      ? "Continuar Compra (Registrarse)"
                      : "Confirmar Compra"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}

        {/* Modal para solicitar Registro o Inicio de Sesión antes de comprar */}
        <Modal show={mostrarModalAuth} onHide={() => setMostrarModalAuth(false)} centered>
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="fs-5">🔒 Identificación Requerida</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 text-center">
            <div className="fs-1 mb-2">🛒</div>
            <h5 className="fw-bold mb-2">¡Casi terminamos tu pedido!</h5>
            <p className="text-muted mb-3">
              Para completar tu compra de <strong>{totalItems} ejemplar(es)</strong> por un total de{" "}
              <strong className="text-primary">${totalPrecio.toLocaleString()}</strong>, necesitás tener una cuenta.
            </p>
            <p className="small text-muted bg-light p-2 rounded mb-4">
              ✨ No te preocupes: los libros seleccionados quedarán guardados en tu carrito.
            </p>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                className="fw-bold"
                onClick={() => {
                  setMostrarModalAuth(false);
                  navigate("/registro");
                }}
              >
                Crear Cuenta / Registrarse
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                className="fw-semibold"
                onClick={() => {
                  setMostrarModalAuth(false);
                  navigate("/login");
                }}
              >
                Ya tengo cuenta / Iniciar Sesión
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center border-0 pt-0">
            <Button variant="link" className="text-muted btn-sm" onClick={() => setMostrarModalAuth(false)}>
              Volver al Carrito
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}

export default Carrito;
