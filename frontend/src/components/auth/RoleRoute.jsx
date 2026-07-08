import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RoleRoute({ children, roles = [] }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(usuario.perfil)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
