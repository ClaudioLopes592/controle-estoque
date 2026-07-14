import api from "./api";

const URL = "/movimentacoes";

export async function listarMovimentacoes() {
  const response = await api.get(URL);
  return response.data;
}

export async function buscarMovimentacao(id) {
  const response = await api.get(`${URL}/${id}`);
  return response.data;
}

// export async function criarMovimentacao(dados) {
//   const response = await api.post(URL, dados);
//   return response.data;
// }
