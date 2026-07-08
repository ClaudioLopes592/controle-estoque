import api from "./api";

export async function login(usuario, senha) {
  const response = await api.post("/auth/login", { usuario, senha });

  return response.data;
}

export async function obterUsuarioLogado(token) {
  const response = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
