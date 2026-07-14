import api from "./api";

const URL = "/dashboard";

export async function obterDashboard() {
  const response = await api.get(URL);
  return response.data;
}

export async function obterEntradasSaidas() {
  const response = await api.get(`${URL}/entradas-saidas`);
  return response.data;
}

export async function obterEstoqueCategorias() {
  const response = await api.get(`${URL}/estoque-categorias`);
  return response.data;
}