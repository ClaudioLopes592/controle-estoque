import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";

import DataTable from "../../components/common/DataTable";
import EntradaModal from "../../components/entradas/EntradaModal";
import PageHeader from "../../components/common/PageHeader";

import { useAuth } from "../../contexts/AuthContext";

import {
  listarEntradas,
  buscarEntrada,
  excluirEntrada,
} from "../../services/entradaEstoqueService";

export default function ListaEntradas() {
  const { usuario } = useAuth();

  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [entradaSelecionada, setEntradaSelecionada] = useState(null);

  async function carregarEntradas() {
    setLoading(true);

    try {
      const dados = await listarEntradas();

      setEntradas(dados);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarEntradas();
  }, []);

  async function editar(id) {
    const dados = await buscarEntrada(id);

    setEntradaSelecionada(dados);

    setMostrarModal(true);
  }

  async function excluir(id) {
    const confirma = window.confirm("Deseja realmente excluir esta entrada?");

    if (!confirma) return;

    await excluirEntrada(id);

    await carregarEntradas();

    setMensagem("Entrada excluída com sucesso.");
  }

  const entradasFiltradas = entradas.filter((entrada) => {
    const texto = pesquisa.toLowerCase();

    return (
      entrada.numero_documento?.toLowerCase().includes(texto) ||
      entrada.origem?.toLowerCase().includes(texto)
    );
  });

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "70px",
    },

    {
      key: "produto_id",
      label: "Produto",
    },

    {
      key: "fornecedor_id",
      label: "Fornecedor",
    },

    {
      key: "origem",
      label: "Origem",
      render: (entrada) => (
        <span className="badge bg-primary">{entrada.origem}</span>
      ),
    },

    {
      key: "quantidade",
      label: "Qtd.",
    },

    {
      key: "custo_unitario",
      label: "Custo",
      render: (entrada) =>
        Number(entrada.custo_unitario).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "valor_total",
      label: "Total",
      render: (entrada) =>
        Number(entrada.valor_total).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "data_entrada",
      label: "Data",
      render: (entrada) =>
        new Date(entrada.data_entrada).toLocaleDateString("pt-BR"),
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Entradas de Estoque"
        textoBotao="Nova Entrada"
        onNovo={() => {
          setEntradaSelecionada(null);
          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando entradas..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar entrada..."
      />

      <DataTable
        columns={columns}
        data={entradasFiltradas}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhuma entrada encontrada."
      />

      <EntradaModal
        show={mostrarModal}
        entrada={entradaSelecionada}
        usuarioId={usuario?.id}
        onClose={() => {
          setMostrarModal(false);
          setEntradaSelecionada(null);
        }}
        onSalvou={async () => {
          await carregarEntradas();

          if (entradaSelecionada)
            setMensagem("Entrada atualizada com sucesso!");
          else setMensagem("Entrada cadastrada com sucesso!");
        }}
      />
    </Layout>
  );
}
