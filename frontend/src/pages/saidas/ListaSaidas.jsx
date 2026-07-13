import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import SaidaModal from "../../components/saidas/SaidaModal";

import { useAuth } from "../../contexts/AuthContext";

import {
  listarSaidas,
  buscarSaida,
  excluirSaida,
} from "../../services/saidaEstoqueService";

export default function ListaSaidas() {
  const { usuario } = useAuth();

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
    const confirma = window.confirm("Deseja realmente excluir esta saída?");

    if (!confirma) return;

    await excluirSaida(id);

    await carregarSaidas();

    setMensagem("Saída excluída com sucesso.");
  }

  const saidasFiltradas = saidas.filter((saida) => {
    const texto = pesquisa.toLowerCase();

    return (
      saida.numero_documento?.toLowerCase().includes(texto) ||
      saida.destino?.toLowerCase().includes(texto)
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
      key: "destino",
      label: "Destino",
      render: (saida) => (
        <span className="badge bg-danger">{saida.destino}</span>
      ),
    },

    {
      key: "quantidade",
      label: "Quantidade",
    },

    {
      key: "preco_unitario",
      label: "Preço Unit.",
      render: (saida) =>
        Number(saida.preco_unitario).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "valor_total",
      label: "Valor Total",
      render: (saida) =>
        Number(saida.valor_total).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "data_saida",
      label: "Data",
      render: (saida) => new Date(saida.data_saida).toLocaleDateString("pt-BR"),
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

      {usuario && (
        <SaidaModal
          show={mostrarModal}
          saida={saidaSelecionada}
          usuarioId={usuario.id}
          onClose={() => {
            setMostrarModal(false);
            setSaidaSelecionada(null);
          }}
          onSalvou={async () => {
            await carregarSaidas();

            if (saidaSelecionada) setMensagem("Saída atualizada com sucesso!");
            else setMensagem("Saída cadastrada com sucesso!");
          }}
        />
      )}
    </Layout>
  );
}
