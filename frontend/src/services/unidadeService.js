import api from "./api";

const URL = "/unidades";

export async function listarUnidades() {
  const response = await api.get(URL);
  return response.data;
}

export async function buscarUnidade(id) {
  const response = await api.get(`${URL}/${id}`);
  return response.data;
}

export async function criarUnidade(dados) {
  const response = await api.post(URL, dados);
  return response.data;
}

export async function atualizarUnidade(id, dados) {
  const response = await api.put(`${URL}/${id}`, dados);
  return response.data;
}

export async function excluirUnidade(id) {
  await api.delete(`${URL}/${id}`);
}