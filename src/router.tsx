import { createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Contato from "./components/Contato";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/contato',
    element: <Contato />
  }
];

const router = createBrowserRouter(routes);

export default router;
