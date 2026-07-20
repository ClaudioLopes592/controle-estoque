import { List } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar({ sidebarOpen, setSidebarOpen, isDesktop }) {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        
        {!isDesktop && (
          <button
            className="btn btn-primary border-0 me-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <List size={28} />
          </button>
        )}

        <span className="navbar-brand mb-0">
          Sistema de Controle de Estoque
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-white">{usuario?.nome}</span>

          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}