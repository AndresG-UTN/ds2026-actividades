import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalogo",
    element: <Catalogo />,
  },
  {
    path: "/libros/:id", 
    element: <LibroDetalle />,
  },
  {
    path: "/nuevo", // <-- AGREGAMOS LA RUTA
    element: <LibroNuevo />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;