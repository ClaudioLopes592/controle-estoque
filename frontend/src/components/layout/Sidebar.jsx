import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar({ sidebarOpen, setSidebarOpen, isDesktop }) {
  const { usuario } = useAuth();

  const menus = [
    {
      titulo: "Home",
      rota: "/",
      roles: ["ADMIN", "GERENTE", "OPERADOR"],
    },
    {
      titulo: "Dashboard",
      rota: "/dashboard",
      roles: ["ADMIN", "GERENTE", "OPERADOR"],
    },
    {
      titulo: "Usuários",
      rota: "/usuarios",
      roles: ["ADMIN"],
    },
    {
      titulo: "Categorias",
      rota: "/categorias",
      roles: ["ADMIN", "GERENTE"],
    },
    {
      titulo: "Unidades",
      rota: "/unidades",
      icone: "bi-rulers",
      roles: ["ADMIN", "GERENTE"],
    },
    {
      titulo: "Fornecedores",
      rota: "/fornecedores",
      roles: ["ADMIN", "GERENTE"],
    },
    {
      titulo: "Clientes",
      rota: "/clientes",
      roles: ["ADMIN", "GERENTE", "OPERADOR"],
    },
    {
      titulo: "Produtos",
      rota: "/produtos",
      roles: ["ADMIN", "GERENTE", "OPERADOR"],
    },
    {
      titulo: "Entradas",
      rota: "/entradas",
      roles: ["ADMIN", "GERENTE"],
    },
    {
      titulo: "Saídas",
      rota: "/saidas",
      roles: ["ADMIN", "GERENTE"],
    },
    {
      titulo: "Movimentações",
      rota: "/movimentacoes",
      roles: ["ADMIN", "GERENTE", "OPERADOR"],
    },
  ];

  const menusPermitidos = menus.filter((menu) =>
    menu.roles.includes(usuario?.perfil),
  );

  const renderMenus = () => (
    <>
      <div className="p-3">
        <h4 className="mb-3">Estoque</h4>

        <hr />

        <ul className="nav flex-column">
          {menusPermitidos.map((menu) => (
            <li className="nav-item" key={menu.rota}>
              <NavLink
                to={menu.rota}
                onClick={() => {
                  if (!isDesktop) {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active fw-bold text-warning" : "text-white"
                  }`
                }
              >
                {menu.titulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <aside
        className="bg-dark text-white shadow"
        style={{
          width: 260,
          minHeight: "100vh",
          flexShrink: 0,
        }}
      >
        {renderMenus()}
      </aside>
    );
  }

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            zIndex: 1030,
          }}
        />
      )}

      <aside
        className="bg-dark text-white shadow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 260,
          height: "100vh",
          zIndex: 1040,
          transition: "transform .3s ease",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {renderMenus()}
      </aside>
    </>
  );
}
