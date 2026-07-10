import api from "./api";

export async function listarEntradas() {
  const { data } = await api.get("/entradas");

  return data;
}

export async function buscarEntrada(id) {
  const { data } = await api.get(`/entradas/${id}`);

  return data;
}

export async function criarEntrada(dados) {
  const { data } = await api.post("/entradas", dados);

  return data;
}

export async function atualizarEntrada(id, dados) {
  const { data } = await api.put(`/entradas/${id}`, dados);

  return data;
}

export async function excluirEntrada(id) {
  await api.delete(`/entradas/${id}`);
}
