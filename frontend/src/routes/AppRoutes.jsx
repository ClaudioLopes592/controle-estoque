import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/dashboard/Dashboard";

import ListaUsuarios from "../pages/usuarios/ListaUsuarios";
import ListaCategorias from "../pages/categorias/ListaCategorias";
import ListaFornecedores from "../pages/fornecedores/ListaFornecedores";
import ListaClientes from "../pages/clientes/ListaClientes";
import ListaProdutos from "../pages/produtos/ListaProdutos";
import ListaMovimentacoes from "../pages/movimentacoes/ListaMovimentacoes";
import ListaEntradas from "../pages/entradas/ListaEntradas";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN"]}>
                <ListaUsuarios />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE"]}>
                <ListaCategorias />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/fornecedores"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE"]}>
                <ListaFornecedores />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE", "OPERADOR"]}>
                <ListaClientes />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE", "OPERADOR"]}>
                <ListaProdutos />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/entradas"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE", "OPERADOR"]}>
                <ListaEntradas />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movimentacoes"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "GERENTE", "OPERADOR"]}>
                <ListaMovimentacoes />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
