import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";
import DataTable from "../../components/common/DataTable";

import {
  listarClientes,
  buscarCliente,
  excluirCliente,
} from "../../services/clienteService";

import ClienteModal from "../../components/clientes/ClienteModal";

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  async function carregarClientes() {
    setLoading(true);

    try {
      const dados = await listarClientes();

      setClientes(dados);
    } finally {
      setLoading(false);
    }
  }

  async function editar(id) {
    const cliente = await buscarCliente(id);

    setClienteSelecionado(cliente);

    setMostrarModal(true);
  }

  async function excluir(id) {
    if (!window.confirm("Deseja excluir este cliente?")) return;

    await excluirCliente(id);

    await carregarClientes();

    setMensagem("Cliente excluído com sucesso!");
  }

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      (cliente.email || "").toLowerCase().includes(pesquisa.toLowerCase()) ||
      (cliente.cpf_cnpj || "").toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "70px",
    },

    {
      key: "nome",
      label: "Nome",
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
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Clientes"
        textoBotao="Novo Cliente"
        onNovo={() => {
          setClienteSelecionado(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando clientes..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar cliente..."
      />

      <DataTable
        columns={columns}
        data={clientesFiltrados}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhum cliente encontrado."
      />

      <ClienteModal
        show={mostrarModal}
        cliente={clienteSelecionado}
        onClose={() => {
          setMostrarModal(false);

          setClienteSelecionado(null);
        }}
        onSalvou={async () => {
          await carregarClientes();

          if (clienteSelecionado)
            setMensagem("Cliente atualizado com sucesso!");
          else setMensagem("Cliente cadastrado com sucesso!");
        }}
      />
    </Layout>
  );
}
