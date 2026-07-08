import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import SelectApi from "../common/SelectApi";
import AlertMessage from "../common/AlertMessage";

import { criarMovimentacao } from "../../services/movimentacaoService";

export default function MovimentacaoModal({ show, onClose, onSalvou }) {
  const [form, setForm] = useState({
    produto_id: "",
    tipo: "E",
    origem: "COMPRA",
    quantidade: "",
    preco_unitario: "",
    observacao: "",
  });

  const [erro, setErro] = useState("");

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (show) {
      setForm({
        produto_id: "",
        tipo: "E",
        origem: "COMPRA",
        quantidade: "",
        preco_unitario: "",
        observacao: "",
      });

      setErro("");
    }
  }, [show]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");

    setSalvando(true);

    try {
      await criarMovimentacao({
        ...form,
        produto_id: Number(form.produto_id),
        quantidade: Number(form.quantidade),
        preco_unitario: Number(form.preco_unitario),
      });

      onSalvou();
      onClose();
    } catch (error) {
      setErro(error.response?.data?.detail ?? "Erro ao salvar movimentação.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ModalForm
      show={show}
      titulo="Nova Movimentação"
      onClose={onClose}
      onSave={handleSubmit}
      textoBotao={salvando ? "Salvando..." : "Salvar"}
    >
      <AlertMessage tipo="danger" mensagem={erro} onClose={() => setErro("")} />

      <div className="mb-3">
        <label className="form-label">Produto</label>

        <SelectApi
          endpoint="/produtos"
          value={form.produto_id}
          onChange={(value) =>
            setForm((old) => ({
              ...old,
              produto_id: value,
            }))
          }
          labelField="nome"
          valueField="id"
          placeholder="Selecione um produto"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Tipo</label>

          <select
            className="form-select"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="E">Entrada</option>
            <option value="S">Saída</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Origem</label>

          <select
            className="form-select"
            name="origem"
            value={form.origem}
            onChange={handleChange}
          >
            <option value="COMPRA">Compra</option>
            <option value="VENDA">Venda</option>
            <option value="AJUSTE">Ajuste</option>
            <option value="DEVOLUCAO">Devolução</option>
            <option value="PERDA">Perda</option>
            <option value="INVENTARIO">Inventário</option>
            <option value="PRODUCAO">Produção</option>
            <option value="CONSUMO_INTERNO">Consumo Interno</option>
            <option value="OUTROS">Outros</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Quantidade</label>

          <input
            type="number"
            step="0.01"
            min="0.01"
            className="form-control"
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Preço Unitário</label>

          <input
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            name="preco_unitario"
            value={form.preco_unitario}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Observação</label>

        <textarea
          className="form-control"
          rows={3}
          name="observacao"
          value={form.observacao}
          onChange={handleChange}
        />
      </div>
    </ModalForm>
  );
}
