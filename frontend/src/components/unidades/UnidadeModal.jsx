import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import AlertMessage from "../common/AlertMessage";

import { criarUnidade, atualizarUnidade } from "../../services/unidadeService";

export default function UnidadeModal({ show, unidade, onClose, onSalvou }) {
  const [form, setForm] = useState({
    nome: "",
    sigla: "",
  });

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (unidade) {
      setForm({
        nome: unidade.nome ?? "",
        sigla: unidade.sigla ?? "",
      });
    } else {
      setForm({
        nome: "",
        sigla: "",
      });
    }

    setErro("");
  }, [unidade, show]);

  function alterarCampo(campo, valor) {
    setForm((old) => ({
      ...old,
      [campo]: valor,
    }));
  }

  async function salvar(e) {
    e.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      if (unidade) {
        await atualizarUnidade(unidade.id, form);
      } else {
        await criarUnidade(form);
      }

      onSalvou();
      onClose();
    } catch (err) {
      setErro(err.response?.data?.detail ?? "Erro ao salvar unidade.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={unidade ? "Editar Unidade" : "Nova Unidade"}
      onClose={onClose}
      onSave={salvar}
      textoBotao={salvando ? "Salvando..." : "Salvar"}
    >
      <AlertMessage tipo="danger" mensagem={erro} onClose={() => setErro("")} />

      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Nome</label>

          <input
            className="form-control"
            value={form.nome}
            onChange={(e) => alterarCampo("nome", e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Sigla</label>

          <input
            className="form-control text-uppercase"
            value={form.sigla}
            maxLength={10}
            onChange={(e) =>
              alterarCampo("sigla", e.target.value.toUpperCase())
            }
            required
          />
        </div>
      </div>
    </ModalForm>
  );
}
