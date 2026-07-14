import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import SearchBox from "../../components/common/SearchBox";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";

import { listarMovimentacoes } from "../../services/movimentacaoService";

export default function ListaMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregarMovimentacoes();
  }, []);

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  async function carregarMovimentacoes() {
    setLoading(true);

    try {
      const dados = await listarMovimentacoes();

      setMovimentacoes(dados);
    } finally {
      setLoading(false);
    }
  }

  const movimentacoesFiltradas = movimentacoes.filter((mov) => {
    const texto = pesquisa.toLowerCase();

    return (
      mov.produto?.nome?.toLowerCase().includes(texto) ||
      mov.tipo?.toLowerCase().includes(texto) ||
      mov.origem?.toLowerCase().includes(texto)
    );
  });

  const columns = [
    {
      key: "data_movimento",
      label: "Data",
      render: (item) =>
        new Date(item.data_movimento).toLocaleString("pt-BR"),
    },

    {
      key: "produto",
      label: "Produto",
      render: (item) => item.produto?.nome,
    },

    {
      key: "tipo",
      label: "Tipo",
      render: (item) => (
        <span
          className={`badge ${
            item.tipo === "E"
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {item.tipo === "E"
            ? "Entrada"
            : "Saída"}
        </span>
      ),
    },

    {
      key: "origem",
      label: "Origem",
    },

    {
      key: "quantidade",
      label: "Quantidade",
    },

    {
      key: "preco_unitario",
      label: "Preço Unitário",
      render: (item) =>
        Number(item.preco_unitario).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "observacao",
      label: "Observação",
    },
  ];

  return (
    <Layout>
      <PageHeader titulo="Histórico de Movimentações" />

      <Loading
        loading={loading}
        texto="Carregando movimentações..."
      />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar movimentação..."
      />

      <DataTable
        columns={columns}
        data={movimentacoesFiltradas}
        emptyMessage="Nenhuma movimentação encontrada."
      />
    </Layout>
  );
}