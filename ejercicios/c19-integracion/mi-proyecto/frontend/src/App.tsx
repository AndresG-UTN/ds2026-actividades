import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import Login from "./pages/Login";

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
    path: "/nuevo",
    element: <LibroNuevo />,
  },
  {
    path: "/login", // ← Ruta conectada para C19
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;