import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import SinPermiso from "./pages/SinPermiso";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./components/PrivateRoute";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/sin-permiso",
    element: <SinPermiso />,
  },
  // Ruta protegida para usuarios autenticados
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/perfil",
        element: <Perfil />,
      },
    ],
  },
  // Ruta protegida por rol ADMIN utilizando Layout Route de React Router
  {
    element: <PrivateRoute rolRequerido="ADMIN" />,
    children: [
      {
        path: "/nuevo",
        element: <LibroNuevo />,
      },
      {
        path: "/libros/nuevo",
        element: <LibroNuevo />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;