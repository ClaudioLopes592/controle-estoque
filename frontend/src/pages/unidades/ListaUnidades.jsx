import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import SearchBox from "../../components/common/SearchBox";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";

import UnidadeModal from "../../components/unidades/UnidadeModal";

import {
  listarUnidades,
  buscarUnidade,
  excluirUnidade,
} from "../../services/unidadeService";

export default function ListaUnidades() {
  const [unidades, setUnidades] = useState([]);

  const [loading, setLoading] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);

  useEffect(() => {
    carregarUnidades();
  }, []);

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  async function carregarUnidades() {
    setLoading(true);

    try {
      const dados = await listarUnidades();

      setUnidades(dados);
    } finally {
      setLoading(false);
    }
  }

  async function editar(id) {
    const dados = await buscarUnidade(id);

    setUnidadeSelecionada(dados);

    setMostrarModal(true);
  }

  async function excluir(id) {
    const confirma = window.confirm("Deseja realmente excluir esta unidade?");

    if (!confirma) return;

    await excluirUnidade(id);

    await carregarUnidades();

    setMensagem("Unidade excluída com sucesso.");
  }

  const unidadesFiltradas = unidades.filter((unidade) => {
    const texto = pesquisa.toLowerCase();

    return (
      unidade.nome.toLowerCase().includes(texto) ||
      unidade.sigla.toLowerCase().includes(texto)
    );
  });

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "80px",
    },

    {
      key: "nome",
      label: "Nome",
    },

    {
      key: "sigla",
      label: "Sigla",
      width: "120px",
      render: (item) => <span className="badge bg-primary">{item.sigla}</span>,
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Unidades de Medida"
        textoBotao="Nova Unidade"
        onNovo={() => {
          setUnidadeSelecionada(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando unidades..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar unidade..."
      />

      <DataTable
        columns={columns}
        data={unidadesFiltradas}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhuma unidade encontrada."
      />

      <UnidadeModal
        show={mostrarModal}
        unidade={unidadeSelecionada}
        onClose={() => {
          setMostrarModal(false);

          setUnidadeSelecionada(null);
        }}
        onSalvou={async () => {
          await carregarUnidades();

          if (unidadeSelecionada)
            setMensagem("Unidade atualizada com sucesso!");
          else setMensagem("Unidade cadastrada com sucesso!");
        }}
      />
    </Layout>
  );
}
