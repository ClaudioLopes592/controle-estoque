import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import SearchBox from "../../components/common/SearchBox";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";

import SaidaModal from "../../components/saidas/SaidaModal";

import {
  listarSaidas,
  buscarSaida,
  excluirSaida,
} from "../../services/saidaEstoqueService";

export default function ListaSaidas({ usuarioId=1 }) {
  const [saidas, setSaidas] = useState([]);

  const [loading, setLoading] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);

  const [saidaSelecionada, setSaidaSelecionada] = useState(null);

  useEffect(() => {
    carregarSaidas();
  }, []);

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  async function carregarSaidas() {
    setLoading(true);

    try {
      const dados = await listarSaidas();

      setSaidas(dados);
    } finally {
      setLoading(false);
    }
  }

  async function editar(id) {
    const dados = await buscarSaida(id);

    setSaidaSelecionada(dados);

    setMostrarModal(true);
  }

  async function excluir(id) {
    if (!window.confirm("Deseja realmente excluir esta saída?")) return;

    await excluirSaida(id);

    await carregarSaidas();

    setMensagem("Saída excluída com sucesso.");
  }

  const saidasFiltradas = saidas.filter((item) => {
    const texto = pesquisa.toLowerCase();

    return (
      item.produto?.nome?.toLowerCase().includes(texto) ||
      item.cliente?.nome?.toLowerCase().includes(texto) ||
      item.origem?.toLowerCase().includes(texto) ||
      item.numero_documento?.toLowerCase().includes(texto)
    );
  });

  const columns = [
    {
      key: "data_saida",
      label: "Data",
      render: (item) => new Date(item.data_saida).toLocaleString("pt-BR"),
    },

    {
      key: "produto",
      label: "Produto",
      render: (item) => item.produto?.nome,
    },

    {
      key: "cliente",
      label: "Cliente",
      render: (item) => item.cliente?.nome ?? "-",
    },

    {
      key: "origem",
      label: "Origem",
      render: (item) => {
        const cores = {
          VENDA: "success",
          DEVOLUCAO: "warning",
          CONSUMO_INTERNO: "secondary",
          PERDA: "danger",
          TRANSFERENCIA: "info",
          AJUSTE: "primary",
        };

        return (
          <span className={`badge bg-${cores[item.origem] || "dark"}`}>
            {item.origem}
          </span>
        );
      },
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
      key: "valor_total",
      label: "Valor Total",
      render: (item) =>
        Number(item.valor_total).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "numero_documento",
      label: "Documento",
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Saídas de Estoque"
        textoBotao="Nova Saída"
        onNovo={() => {
          setSaidaSelecionada(null);
          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando saídas..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar saída..."
      />

      <DataTable
        columns={columns}
        data={saidasFiltradas}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhuma saída encontrada."
      />

      <SaidaModal
        show={mostrarModal}
        saida={saidaSelecionada}
        usuarioId={usuarioId}
        onClose={() => {
          setMostrarModal(false);
          setSaidaSelecionada(null);
        }}
        onSalvou={async () => {
          await carregarSaidas();

          setMensagem(
            saidaSelecionada
              ? "Saída atualizada com sucesso!"
              : "Saída cadastrada com sucesso!",
          );
        }}
      />
    </Layout>
  );
}
