import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import SearchBox from "../../components/common/SearchBox";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";

import ProdutoModal from "../../components/produtos/ProdutoModal";
import DataTable from "../../components/common/DataTable";

import {
  listarProdutos,
  buscarProduto,
  excluirProduto,
} from "../../services/produtoService";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  async function carregarProdutos() {
    setLoading(true);

    try {
      const dados = await listarProdutos();

      setProdutos(dados);
    } finally {
      setLoading(false);
    }
  }

  async function editar(id) {
    const produto = await buscarProduto(id);

    setProdutoSelecionado(produto);

    setMostrarModal(true);
  }

  async function excluir(id) {
    const confirma = window.confirm("Deseja realmente excluir este produto?");

    if (!confirma) return;

    await excluirProduto(id);

    await carregarProdutos();

    setMensagem("Produto excluído com sucesso!");
  }

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const columns = [
    {
      key: "codigo",
      label: "Código",
    },

    {
      key: "nome",
      label: "Produto",
    },

    {
      key: "categoria",
      label: "Categoria",
      render: (produto) => produto.categoria?.nome ?? "",
    },

    {
      key: "fornecedor",
      label: "Fornecedor",
      render: (produto) => produto.fornecedor?.nome ?? "",
    },

    {
      key: "unidade",
      label: "Unidade",
      render: (produto) => produto.unidade?.sigla ?? "",
    },

    {
      key: "preco_venda",
      label: "Preço Venda",
      render: (produto) =>
        Number(produto.preco_venda).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "estoque_atual",
      label: "Estoque",
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Produtos"
        textoBotao="Novo Produto"
        onNovo={() => {
          setProdutoSelecionado(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando produtos..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar produto..."
      />

      <DataTable
        columns={columns}
        data={produtosFiltrados}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhum produto encontrado."
      />

      <ProdutoModal
        show={mostrarModal}
        produto={produtoSelecionado}
        onClose={() => {
          setMostrarModal(false);

          setProdutoSelecionado(null);
        }}
        onSalvou={() => {
          carregarProdutos();

          setMensagem(
            produtoSelecionado
              ? "Produto atualizado com sucesso!"
              : "Produto cadastrado com sucesso!",
          );
        }}
      />
    </Layout>
  );
}
