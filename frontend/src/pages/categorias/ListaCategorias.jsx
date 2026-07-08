import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";

import DataTable from "../../components/common/DataTable";
import CategoriaModal from "../../components/categorias/CategoriaModal";
import { buscarCategoria } from "../../services/categoriaService";
import PageHeader from "../../components/common/PageHeader";

import {
  listarCategorias,
  excluirCategoria,
} from "../../services/categoriaService";

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  async function carregarCategorias() {
    setLoading(true);

    try {
      const dados = await listarCategorias();

      setCategorias(dados);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function editar(id) {
    const categoria = await buscarCategoria(id);

    setCategoriaSelecionada(categoria);

    setMostrarModal(true);
  }

  async function excluir(id) {
    if (!window.confirm("Deseja excluir esta categoria?")) return;

    await excluirCategoria(id);

    await carregarCategorias();

    setMensagem("Categoria excluída com sucesso!");
  }

  const categoriasFiltradas = categorias.filter(
    (categoria) =>
      categoria.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      (categoria.descricao || "")
        .toLowerCase()
        .includes(pesquisa.toLowerCase()),
  );

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
      key: "descricao",
      label: "Descrição",
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Categorias"
        textoBotao="Nova Categoria"
        onNovo={() => {
          setCategoriaSelecionada(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando categorias..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar categoria..."
      />

      <DataTable
        columns={columns}
        data={categoriasFiltradas}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhuma categoria encontrada."
      />

      <CategoriaModal
        show={mostrarModal}
        categoria={categoriaSelecionada}
        onClose={() => {
          setMostrarModal(false);

          setCategoriaSelecionada(null);
        }}
        onSalvou={async () => {
          await carregarCategorias();

          if (categoriaSelecionada)
            setMensagem("Categoria atualizada com sucesso!");
          else setMensagem("Categoria cadastrada com sucesso!");
        }}
      />
    </Layout>
  );
}
