import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';

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
    path: "/libros/:id", // <-- Ruta dinámica que espera un ID
    element: <LibroDetalle />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;