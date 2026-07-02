import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'; 
import Layout from '../components/Layout/Layout';

function LibroNuevo() {

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    imagen: ''
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Datos guardados con éxito:", formData);
    
    setMostrarAlerta(true);

    setFormData({
      titulo: '',
      autor: '',
      imagen: ''
    });

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 4000);
  };

  return (
    <Layout>
      <Container className="py-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4 text-center text-dark">Agregar Nuevo Libro</h2>
        
        {mostrarAlerta && (
          <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
            <Alert.Heading>¡Excelente!</Alert.Heading>
            <p className="mb-0">El libro se ha guardado correctamente en el catálogo.</p>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded">
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título del Libro</Form.Label>
            <Form.Control 
              type="text" 
              name="titulo" 
              placeholder="Ej: El Señor de los Anillos" 
              value={formData.titulo}
              onChange={handleChange}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAutor">
            <Form.Label>Autor</Form.Label>
            <Form.Control 
              type="text" 
              name="autor" 
              placeholder="Ej: J.R.R. Tolkien" 
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formImagen">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control 
              type="url" 
              name="imagen" 
              placeholder="https://ejemplo.com/portada.jpg" 
              value={formData.imagen}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 fw-bold">
            Guardar Libro
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}

export default LibroNuevo;