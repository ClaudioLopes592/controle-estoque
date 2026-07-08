import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import AlertMessage from "../common/AlertMessage";

import { criarUsuario, atualizarUsuario } from "../../services/usuarioService";

export default function UsuarioModal({ show, onClose, onSalvou, usuario }) {
  const [form, setForm] = useState({
    nome: "",
    usuario: "",
    email: "",
    perfil: "OPERADOR",
    ativo: true,
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email,
        perfil: usuario.perfil,
        ativo: usuario.ativo,
        senha: "",
        confirmarSenha: "",
      });
    } else {
      setForm({
        nome: "",
        usuario: "",
        email: "",
        perfil: "OPERADOR",
        ativo: true,
        senha: "",
        confirmarSenha: "",
      });
    }

    setErro("");
  }, [usuario, show]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function salvar() {
    setErro("");

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    setSalvando(true);

    try {
      const dados = {
        nome: form.nome,
        usuario: form.usuario,
        email: form.email,
        perfil: form.perfil,
        ativo: form.ativo,
      };

      if (usuario) {
        await atualizarUsuario(usuario.id, {
          ...dados,
          senha: form.senha || null,
        });
      } else {
        await criarUsuario({
          ...dados,
          senha: form.senha,
        });
      }

      onSalvou();
      onClose();
    } catch (error) {
      setErro(error.response?.data?.detail ?? "Erro ao salvar usuário.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={usuario ? "Editar Usuário" : "Novo Usuário"}
      onClose={onClose}
      onSave={salvar}
      textoBotao={salvando ? "Salvando..." : "Salvar"}
    >
      <AlertMessage tipo="danger" mensagem={erro} onClose={() => setErro("")} />

      <div className="mb-3">
        <label className="form-label">Nome</label>

        <input
          className="form-control"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Usuário</label>

        <input
          className="form-control"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">E-mail</label>

        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Perfil</label>

          <select
            className="form-select"
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
          >
            <option value="ADMIN">Administrador</option>
            <option value="GERENTE">Gerente</option>
            <option value="OPERADOR">Operador</option>
          </select>
        </div>

        <div className="col-md-6 d-flex align-items-end mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="ativo"
              name="ativo"
              checked={form.ativo}
              onChange={handleChange}
            />

            <label className="form-check-label" htmlFor="ativo">
              Usuário ativo
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          {usuario ? "Nova senha (opcional)" : "Senha"}
        </label>

        <input
          type="password"
          className="form-control"
          name="senha"
          value={form.senha}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirmar senha</label>

        <input
          type="password"
          className="form-control"
          name="confirmarSenha"
          value={form.confirmarSenha}
          onChange={handleChange}
        />
      </div>
    </ModalForm>
  );
}
