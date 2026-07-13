import api from "./api";

export async function listarSaidas() {
  const response = await api.get("/saidas/");
  return response.data;
}

export async function buscarSaida(id) {
  const response = await api.get(`/saidas/${id}`);
  return response.data;
}

export async function criarSaida(dados) {
  const response = await api.post("/saidas/", dados);
  return response.data;
}

export async function atualizarSaida(id, dados) {
  const response = await api.put(`/saidas/${id}`, dados);
  return response.data;
}

export async function excluirSaida(id) {
  await api.delete(`/saidas/${id}`);
}
