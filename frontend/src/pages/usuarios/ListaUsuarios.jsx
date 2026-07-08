import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import AlertMessage from "../../components/common/AlertMessage";
import Loading from "../../components/common/Loading";
import SearchBox from "../../components/common/SearchBox";

import DataTable from "../../components/common/DataTable";
import UsuarioModal from "../../components/usuarios/UsuarioModal";
import PageHeader from "../../components/common/PageHeader";

import {
  listarUsuarios,
  buscarUsuario,
  excluirUsuario,
} from "../../services/usuarioService";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      setMensagem("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensagem]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    console.log("Carregando usuários...");

    setLoading(true);

    try {
      const dados = await listarUsuarios();

      setUsuarios(dados);
    } finally {
      setLoading(false);
    }
  }

  async function editar(id) {
    const usuario = await buscarUsuario(id);

    setUsuarioSelecionado(usuario);

    setMostrarModal(true);
  }

  async function excluir(id) {
    const confirma = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirma) return;

    await excluirUsuario(id);

    await carregarUsuarios();

    setMensagem("Usuário excluído com sucesso!");
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = pesquisa.toLowerCase();

    return (
      usuario.nome.toLowerCase().includes(texto) ||
      usuario.usuario.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  });

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
      key: "usuario",
      label: "Usuário",
      width: "140px",
    },

    {
      key: "email",
      label: "E-mail",
    },

    {
      key: "perfil",
      label: "Perfil",
      width: "120px",
      render: (usuario) => {
        const cores = {
          ADMIN: "danger",
          GERENTE: "warning",
          OPERADOR: "primary",
        };

        return (
          <span className={`badge bg-${cores[usuario.perfil]}`}>
            {usuario.perfil}
          </span>
        );
      },
    },

    {
      key: "ativo",
      label: "Status",
      width: "100px",
      render: (usuario) =>
        usuario.ativo ? (
          <span className="badge bg-success">Ativo</span>
        ) : (
          <span className="badge bg-secondary">Inativo</span>
        ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        titulo="Usuários"
        textoBotao="Novo Usuário"
        onNovo={() => {
          setUsuarioSelecionado(null);

          setMostrarModal(true);
        }}
      />

      <Loading loading={loading} texto="Carregando usuários..." />

      <AlertMessage
        tipo="success"
        mensagem={mensagem}
        onClose={() => setMensagem("")}
      />

      <SearchBox
        value={pesquisa}
        onChange={setPesquisa}
        placeholder="Pesquisar usuário..."
      />

      <DataTable
        columns={columns}
        data={usuariosFiltrados}
        onEditar={editar}
        onExcluir={excluir}
        emptyMessage="Nenhum usuário encontrado."
      />

      <UsuarioModal
        show={mostrarModal}
        usuario={usuarioSelecionado}
        onClose={() => {
          setMostrarModal(false);
          setUsuarioSelecionado(null);
        }}
        onSalvou={() => {
          carregarUsuarios();

          if (usuarioSelecionado)
            setMensagem("Usuário atualizado com sucesso!");
          else setMensagem("Usuário cadastrado com sucesso!");
        }}
      />
    </Layout>
  );
}
