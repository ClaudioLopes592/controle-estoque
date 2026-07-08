import api from "./api";

const URL = "/dashboard";

export async function obterDashboard() {
  const response = await api.get(URL);

  return response.data;
}