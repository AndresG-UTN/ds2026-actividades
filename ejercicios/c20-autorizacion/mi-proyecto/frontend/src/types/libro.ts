export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

// Estructura que devuelve GET /api/libros (incluye autor)
export interface Libro {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autorId: number;
  autor: Autor;
}

// Estructura que devuelve GET /api/libros/:id (incluye autor y categorias)
export interface LibroDetalleData extends Libro {
  categorias?: Categoria[];
}