import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Aguarda o AuthContext carregar os dados do localStorage
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, volta para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Usuário autenticado
  return children;
}
