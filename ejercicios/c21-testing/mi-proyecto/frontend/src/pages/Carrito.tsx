import { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";

function Carrito() {
  const { items, totalItems, totalPrecio, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } = useCart();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const handleFinalizarCompra = () => {
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
            <Alert.Heading>¡Felicitaciones por tu compra!</Alert.Heading>
            <p className="mb-2">Tu pedido ha sido procesado con éxito. En breve recibirás los detalles en tu correo.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Link to="/catalogo" className="btn btn-outline-success btn-sm">
                Seguir explorando libros
              </Link>
            </div>
          </Alert>
        )}

        {items.length === 0 && !compraExitosa ? (
          <Card className="text-center p-5 shadow-sm border-0 my-4">
            <div className="display-1 text-muted mb-3">🛒</div>
            <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
            <p className="text-muted mb-4">Añadí libros desde el catálogo o desde el inicio para comenzar tu compra.</p>
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
                          <tr key={item.id}>
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
                  <div className="d-flex justify-content-between fs-4 fw-bold mb-4">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrecio.toLocaleString()}</span>
                  </div>

                  <Button
                    variant="success"
                    size="lg"
                    className="w-100 fw-bold shadow-sm"
                    onClick={handleFinalizarCompra}
                  >
                    Finalizar Compra
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </Layout>
  );
}

export default Carrito;
