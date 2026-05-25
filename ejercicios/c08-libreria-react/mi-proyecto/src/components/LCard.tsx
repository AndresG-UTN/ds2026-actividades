import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface LibroCardProps {
  titulo: string;
  autor: string;
  imagen: string;
}

export default function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
  const [esFavorito, setEsFavorito] = useState<boolean>(false);

  return (
    <Card 
      className="text-white h-100 shadow-sm border-0" 
      style={{ backgroundColor: 'rgb(45, 45, 45)' }}
    >
      <Card.Img 
        variant="top" 
        src={imagen} 
        alt={titulo} 
        style={{ height: '260px', objectFit: 'cover' }} 
      />
      
      <Card.Body className="d-flex flex-column p-3 text-center">
        <Card.Title className="h6 mb-2 text-truncate-2" style={{ minHeight: '2.5rem' }}>
          {titulo}
        </Card.Title>
        
        <Card.Text className="small text-light mb-3">
          Autor: {autor}
        </Card.Text>
        
        <div className="mt-auto d-flex flex-column gap-2">
          <Button 
            variant="outline-primary" 
            className="text-white btn-sm"
            href="libro.html"
          >
            Ver Mas
          </Button>
          
          <Button 
            variant={esFavorito ? "danger" : "outline-light"} 
            className="btn-sm"
            onClick={() => setEsFavorito(!esFavorito)}
          >
            {esFavorito ? 'Guardado' : 'Favorito'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}