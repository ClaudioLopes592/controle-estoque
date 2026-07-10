import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import SelectApi from "../common/SelectApi";
import AlertMessage from "../common/AlertMessage";

import {
  criarEntrada,
  atualizarEntrada,
} from "../../services/entradaEstoqueService";

export default function EntradaModal({
  show,
  entrada,
  usuarioId,
  onClose,
  onSalvou,
}) {
  const [form, setForm] = useState({
    produto_id: "",
    fornecedor_id: "",
    origem: "COMPRA",
    numero_documento: "",
    quantidade: 1,
    custo_unitario: 0,
    valor_total: 0,
    observacao: "",
    // data_entrada: "",
  });

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (entrada) {
      setForm({
        produto_id: entrada.produto_id ?? "",
        fornecedor_id: entrada.fornecedor_id ?? "",
        origem: entrada.origem ?? "COMPRA",
        numero_documento: entrada.numero_documento ?? "",
        quantidade: entrada.quantidade ?? 1,
        custo_unitario: entrada.custo_unitario ?? 0,
        valor_total: entrada.valor_total ?? 0,
        observacao: entrada.observacao ?? "",
        // data_entrada: entrada.data_entrada
        //   ? entrada.data_entrada.substring(0, 16)
        //   : "",
      });
    } else {
      setForm({
        produto_id: "",
        fornecedor_id: "",
        origem: "COMPRA",
        numero_documento: "",
        quantidade: 1,
        custo_unitario: 0,
        valor_total: 0,
        observacao: "",
        // data_entrada: "",
      });
    }

    setErro("");
  }, [entrada, show]);

  useEffect(() => {
    const quantidade = Number(form.quantidade) || 0;
    const custo = Number(form.custo_unitario) || 0;

    setForm((old) => ({
      ...old,
      valor_total: (quantidade * custo).toFixed(2),
    }));
  }, [form.quantidade, form.custo_unitario]);

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
        fornecedor_id: form.fornecedor_id ? Number(form.fornecedor_id) : null,
        usuario_id: usuarioId,
        quantidade: Number(form.quantidade),
        custo_unitario: Number(form.custo_unitario),
        valor_total: Number(form.valor_total),
        data_entrada: form.data_entrada || null,
      };

      if (entrada) {
        await atualizarEntrada(entrada.id, dados);
      } else {
        await criarEntrada(dados);
      }

      onSalvou();
      onClose();
    } catch (err) {
      const detalhe = err.response?.data?.detail;
      if (Array.isArray(detalhe)) {
        setErro(detalhe[0].msg);
      } else {
        setErro(detalhe ?? "Erro ao salvar entrada de estoque.");
      }
      // setErro(
      //   err.response?.data?.detail ?? "Erro ao salvar entrada de estoque.",
      // );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={entrada ? "Editar Entrada" : "Nova Entrada de Estoque"}
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
          <label className="form-label">Fornecedor</label>

          <SelectApi
            endpoint="/fornecedores"
            value={form.fornecedor_id}
            onChange={(v) => alterarCampo("fornecedor_id", v)}
            placeholder="Selecione o fornecedor"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Origem</label>

          <select
            className="form-select"
            value={form.origem}
            onChange={(e) => alterarCampo("origem", e.target.value)}
          >
            <option value="COMPRA">Compra</option>
            <option value="DEVOLUCAO">Devolução</option>
            <option value="AJUSTE">Ajuste</option>
            <option value="TRANSFERENCIA">Transferência</option>
          </select>
        </div>

        <div className="col-md-8">
          <label className="form-label">Número do Documento</label>

          <input
            className="form-control"
            value={form.numero_documento}
            onChange={(e) => alterarCampo("numero_documento", e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Quantidade</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.quantidade}
            onChange={(e) => alterarCampo("quantidade", e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Custo Unitário</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.custo_unitario}
            onChange={(e) => alterarCampo("custo_unitario", e.target.value)}
          />
        </div>

        <div className="col-md-4">
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
