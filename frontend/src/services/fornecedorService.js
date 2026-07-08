import api from "./api";

export async function listarFornecedores() {
  const response = await api.get("/fornecedores/");

  return response.data;
}

export async function buscarFornecedor(id) {
  const response = await api.get(`/fornecedores/${id}`);

  return response.data;
}

export async function criarFornecedor(dados) {
  const response = await api.post("/fornecedores/", dados);

  return response.data;
}

export async function atualizarFornecedor(id, dados) {
  const response = await api.put(`/fornecedores/${id}`, dados);

  return response.data;
}

export async function excluirFornecedor(id) {
  const response = await api.delete(`/fornecedores/${id}`);

  return response.data;
}
