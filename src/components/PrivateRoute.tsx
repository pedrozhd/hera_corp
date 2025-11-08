import { Navigate, Outlet } from "react-router-dom";

/**
 * Rota protegida — permite acesso apenas se houver usuário autenticado.
 * 
 * Verifica se existe `auth_user` ou `auth_token` no localStorage.
 * Caso contrário, redireciona para /login.
 */
export default function PrivateRoute() {
  const authUser = localStorage.getItem("auth_user");
  const authToken = localStorage.getItem("auth_token");
  const isAuthenticated = !!authUser || !!authToken;

  // Debug: Log do estado de autenticação
  console.log('🔐 PrivateRoute - Verificando autenticação:', {
    hasAuthUser: !!authUser,
    hasAuthToken: !!authToken,
    isAuthenticated
  });

  if (!isAuthenticated) {
    console.log('❌ Não autenticado - Redirecionando para /login');
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
