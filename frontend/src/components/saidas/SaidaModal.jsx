import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import SelectApi from "../common/SelectApi";
import AlertMessage from "../common/AlertMessage";

import { criarSaida, atualizarSaida } from "../../services/saidaEstoqueService";

export default function SaidaModal({
  show,
  saida,
  usuarioId,
  onClose,
  onSalvou,
}) {
  const [form, setForm] = useState({
    produto_id: "",
    destino: "VENDA",
    numero_documento: "",
    quantidade: 1,
    preco_unitario: 0,
    valor_total: 0,
    observacao: "",
  });

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (saida) {
      setForm({
        produto_id: saida.produto_id ?? "",
        destino: saida.destino ?? "VENDA",
        numero_documento: saida.numero_documento ?? "",
        quantidade: saida.quantidade ?? 1,
        preco_unitario: saida.preco_unitario ?? 0,
        valor_total: saida.valor_total ?? 0,
        observacao: saida.observacao ?? "",
      });
    } else {
      setForm({
        produto_id: "",
        destino: "VENDA",
        numero_documento: "",
        quantidade: 1,
        preco_unitario: 0,
        valor_total: 0,
        observacao: "",
      });
    }

    setErro("");
  }, [saida, show]);

  useEffect(() => {
    const quantidade = Number(form.quantidade) || 0;
    const preco = Number(form.preco_unitario) || 0;

    setForm((old) => ({
      ...old,
      valor_total: (quantidade * preco).toFixed(2),
    }));
  }, [form.quantidade, form.preco_unitario]);

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
      const dados = {
        ...form,
        produto_id: Number(form.produto_id),
        usuario_id: usuarioId,
        quantidade: Number(form.quantidade),
        preco_unitario: Number(form.preco_unitario),
        valor_total: Number(form.valor_total),
      };

      if (saida) {
        await atualizarSaida(saida.id, dados);
      } else {
        await criarSaida(dados);
      }

      onSalvou();
      onClose();
    } catch (err) {
      const detalhe = err.response?.data?.detail;

      if (Array.isArray(detalhe)) {
        setErro(detalhe[0].msg);
      } else {
        setErro(detalhe ?? "Erro ao salvar saída de estoque.");
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={saida ? "Editar Saída" : "Nova Saída de Estoque"}
      onClose={onClose}
      onSave={salvar}
      textoBotao={salvando ? "Salvando..." : "Salvar"}
      largura="modal-lg"
    >
      <AlertMessage tipo="danger" mensagem={erro} onClose={() => setErro("")} />

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Produto</label>

          <SelectApi
            endpoint="/produtos"
            value={form.produto_id}
            onChange={(v) => alterarCampo("produto_id", v)}
            placeholder="Selecione o produto"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Destino</label>

          <select
            className="form-select"
            value={form.destino}
            onChange={(e) => alterarCampo("destino", e.target.value)}
          >
            <option value="VENDA">Venda</option>
            <option value="DEVOLUCAO">Devolução</option>
            <option value="CONSUMO_INTERNO">Consumo Interno</option>
            <option value="PERDA">Perda</option>
            <option value="TRANSFERENCIA">Transferência</option>
            <option value="AJUSTE">Ajuste</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Número do Documento</label>

          <input
            className="form-control"
            value={form.numero_documento}
            onChange={(e) => alterarCampo("numero_documento", e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Quantidade</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.quantidade}
            onChange={(e) => alterarCampo("quantidade", e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Preço Unitário</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.preco_unitario}
            onChange={(e) => alterarCampo("preco_unitario", e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Valor Total</label>

          <input className="form-control" value={form.valor_total} readOnly />
        </div>

        <div className="col-12">
          <label className="form-label">Observação</label>

          <textarea
            className="form-control"
            rows={3}
            value={form.observacao}
            onChange={(e) => alterarCampo("observacao", e.target.value)}
          />
        </div>
      </div>
    </ModalForm>
  );
}
