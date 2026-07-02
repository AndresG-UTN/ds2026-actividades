import LibroCard from '../components/LCard'; 
import { Container, Row, Col } from 'react-bootstrap';
import type { Libro } from '../types/libro';

const LISTA_DE_LIBROS: Libro[] = [ 
  {
    id: 1,
    titulo: "Juego De Tronos 1",
    autor: "George R. Martin",
    imagen: "https://www.penguinlibros.com/ar/2384912/juego-de-tronos-cancion-de-hielo-y-fuego-1.jpg"
  },
  {
    id: 2,
    titulo: "Don Quijote De La Mancha",
    autor: "Miguel de Cervantes",
    imagen: "https://cdn-ilegjjh.nitrocdn.com/ejqufJyIisinuMyfLHCbacgYVWkoIaNa/assets/images/optimized/rev-4ea96de/plutonediciones.com/wp-content/uploads/2025/12/Don-Quijote-de-la-Mancha-Miguel-de-Cervantes-min-1.jpg"
  },
  {
    id: 3,
    titulo: "Los Juegos Del Hambre 1",
    autor: "Suzanne Collins",
    imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/cb/a6/cba6a75b6f50491ef576a4e39f820727.jpg"
  },
  {
    id: 4,
    titulo: "El Señor De Los Anillos",
    autor: "J.R.R. Tolkien",
    imagen: "https://www.planetadelibros.com/usuaris/libros/fotos/210/original/portada_el-senor-de-los-anillos_j-r-r-tolkien_201601252224.jpg"
  },
  {
    id: 5,
    titulo: "Batman Absolute Vol. 1",
    autor: "Scott Snyder - Nick Dragotta",
    imagen: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_batman_cov_-ebfab072bc8f36fd1d17526095371796-1024-1024.webp"
  },
  {
    id: 6,
    titulo: "One Piece Vol. 57",
    autor: "Eiichiro Oda",
    imagen: "https://pbs.twimg.com/media/F9CBclyWgAAzjo6.jpg"
  }
];

function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3" data-bs-theme="dark">
        <Container fluid>
          <span className="navbar-brand"><h3>Libreria</h3></span>
        </Container>
      </nav>

      <div className="text-black text-center py-5" style={{ backgroundColor: 'rgb(221, 230, 231)' }}>
        <Container>
          <h1 className="display-4 fw-normal">Bienvenidos a la web de la lectura</h1>
          <p className="lead text-muted">Aca tenemos de todo, somos la nueva alejandria</p>
          
          <h2 className="mt-5 mb-4 text-dark">Lecturas destacadas</h2>

          <Row xs={2} md={3} lg={6} className="g-4 justify-content-center">
            {LISTA_DE_LIBROS.map((libro) => (
              <Col key={libro.id} className="d-flex justify-content-center">
                <LibroCard 
                  titulo={libro.titulo}
                  autor={libro.autor}
                  imagen={libro.imagen}
                />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <a href="catalogo.html" className="btn btn-primary btn-lg px-4 shadow-sm">
              Ver Catálogo
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;