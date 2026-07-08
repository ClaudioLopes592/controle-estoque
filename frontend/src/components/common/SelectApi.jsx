import { useEffect, useState } from "react";

import api from "../../services/api";

export default function SelectApi({
  endpoint,
  value,
  onChange,
  labelField = "nome",
  valueField = "id",
  placeholder = "Selecione...",
  disabled = false,
}) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregar();
  }, [endpoint]);

  async function carregar() {
    setLoading(true);

    try {
      const response = await api.get(endpoint);
      setDados(response.data);
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{loading ? "Carregando..." : placeholder}</option>

      {dados.map((item) => (
        <option key={item[valueField]} value={item[valueField]}>
          {item[labelField]}
        </option>
      ))}
    </select>
  );
}
