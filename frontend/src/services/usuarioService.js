import api from "./api";

export async function listarUsuarios() {
  const { data } = await api.get("/usuarios");
  return data;
}

export async function buscarUsuario(id) {
  const { data } = await api.get(`/usuarios/${id}`);
  return data;
}

export async function criarUsuario(usuario) {
  const { data } = await api.post("/usuarios", usuario);
  return data;
}

export async function atualizarUsuario(id, usuario) {
  const { data } = await api.put(`/usuarios/${id}`, usuario);
  return data;
}

export async function excluirUsuario(id) {
  await api.delete(`/usuarios/${id}`);
}