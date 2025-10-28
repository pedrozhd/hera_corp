import { Navigate, Outlet } from "react-router-dom";

/**
 * Rota protegida — permite acesso apenas se houver usuário autenticado.
 * 
 * Verifica se existe `auth_user` ou `auth_token` no localStorage.
 * Caso contrário, redireciona para /login.
 */
export default function PrivateRoute() {
  const isAuthenticated =
    !!localStorage.getItem("auth_user") || !!localStorage.getItem("auth_token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
