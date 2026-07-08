import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";

import DataTable from "../../components/common/DataTable";
import FornecedorModal from "../../components/fornecedores/FornecedorModal";
import PageHeader from "../../components/common/PageHeader";

import {
  listarFornecedores,
  buscarFornecedor,
  excluirFornecedor,
} from "../../services/fornecedorService";

export default function ListaFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  async function carregarFornecedores() {
    setLoading(true);

    try {
      const dados = await listarFornecedores();

      setFornecedores(dados);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  async function editar(id) {
    const fornecedor = await buscarFornecedor(id);

    setFornecedorSelecionado(fornecedor);

    setMostrarModal(true);
  }

  async function excluir(id) {
    if (!window.confirm("Deseja excluir este fornecedor?")) return;

    await excluirFornecedor(id);

    await carregarFornecedores();

    setMensagem("Fornecedor excluído com sucesso!");
  }

  const fornecedoresFiltrados = fornecedores.filter(
    (fornecedor) =>
      fornecedor.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      (fornecedor.cpf_cnpj || "")
        .toLowerCase()
        .includes(pesquisa.toLowerCase()) ||
      (fornecedor.email || "").toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "70px",
    },

    {
      key: "nome",
      label: "Fornecedor",
    },

    {
      key: "cpf_cnpj",
      label: "CPF/CNPJ",
    },

    {
      key: "telefone",
      label: "Telefone",
    },

    {
      key: "email",
      label: "E-mail",
    },

    {
      key: "contato",
      label: "Contato",
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Fornecedores"
        textoBotao="Novo Fornecedor"
        onNovo={() => {
          setFornecedorSelecionado(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando fornecedores..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar fornecedor..."
      />

      <DataTable
        columns={columns}
        data={fornecedoresFiltrados}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhum fornecedor encontrado."
      />

      <FornecedorModal
        show={mostrarModal}
        fornecedor={fornecedorSelecionado}
        onClose={() => {
          setMostrarModal(false);

          setFornecedorSelecionado(null);
        }}
        onSalvou={async () => {
          await carregarFornecedores();

          if (fornecedorSelecionado)
            setMensagem("Fornecedor atualizado com sucesso!");
          else setMensagem("Fornecedor cadastrado com sucesso!");
        }}
      />
    </Layout>
  );
}
