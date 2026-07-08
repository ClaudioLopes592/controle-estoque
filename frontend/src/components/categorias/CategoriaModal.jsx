import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";

import {
  criarCategoria,
  atualizarCategoria,
} from "../../services/categoriaService";

export default function CategoriaModal({ show, categoria, onClose, onSalvou }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
      setDescricao(categoria.descricao || "");
    } else {
      setNome("");
      setDescricao("");
    }
  }, [categoria, show]);

  async function salvar() {
    if (!nome.trim()) {
      setErro("Informe o nome da categoria.");

      return;
    }

    setErro("");

    const dados = {
      nome,
      descricao,
    };

    try {
      if (categoria) await atualizarCategoria(categoria.id, dados);
      else await criarCategoria(dados);

      onSalvou();

      onClose();
    } catch (error) {
      if (error.response?.status === 400) {
        setErro(error.response.data.detail);
      } else {
        setErro("Erro ao salvar categoria.");
      }
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={categoria ? "Editar Categoria" : "Nova Categoria"}
      onClose={onClose}
      onSave={salvar}
    >
      {erro && <div className="alert alert-danger">{erro}</div>}
      <div className="mb-3">
        <label className="form-label">Nome</label>

        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>

        <textarea
          className="form-control"
          rows="3"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
    </ModalForm>
  );
}
