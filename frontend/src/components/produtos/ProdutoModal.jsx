import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import SelectApi from "../common/SelectApi";

import { criarProduto, atualizarProduto } from "../../services/produtoService";

export default function ProdutoModal({ show, onClose, onSalvou, produto }) {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");

  const [categoriaId, setCategoriaId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [unidadeId, setUnidadeId] = useState("");

  const [precoCompra, setPrecoCompra] = useState(0);
  const [precoVenda, setPrecoVenda] = useState(0);

  const [estoqueAtual, setEstoqueAtual] = useState(0);
  const [estoqueMinimo, setEstoqueMinimo] = useState(0);

  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (produto) {
      setCodigo(produto.codigo);
      setNome(produto.nome);

      setCategoriaId(produto.categoria_id);
      setFornecedorId(produto.fornecedor_id);
      setUnidadeId(produto.unidade_id);

      setPrecoCompra(produto.preco_compra);
      setPrecoVenda(produto.preco_venda);

      setEstoqueAtual(produto.estoque_atual);
      setEstoqueMinimo(produto.estoque_minimo);

      setDescricao(produto.descricao || "");
    } else {
      limparFormulario();
    }
  }, [produto, show]);

  function limparFormulario() {
    setCodigo("");
    setNome("");

    setCategoriaId("");
    setFornecedorId("");
    setUnidadeId("");

    setPrecoCompra(0);
    setPrecoVenda(0);

    setEstoqueAtual(0);
    setEstoqueMinimo(0);

    setDescricao("");
  }

  async function salvar() {
    const dados = {
      codigo,
      nome,

      categoria_id: categoriaId,
      fornecedor_id: fornecedorId,
      unidade_id: unidadeId,

      preco_compra: Number(precoCompra),
      preco_venda: Number(precoVenda),

      estoque_atual: Number(estoqueAtual),
      estoque_minimo: Number(estoqueMinimo),

      descricao,
    };

    if (produto) {
      await atualizarProduto(produto.id, dados);
    } else {
      await criarProduto(dados);
    }

    onSalvou();

    onClose();
  }
  return (
    <ModalForm
      show={show}
      title={produto ? "Editar Produto" : "Novo Produto"}
      onClose={onClose}
      onSave={salvar}
    >
      <div className="mb-3">
        <label className="form-label">Código</label>

        <input
          className="form-control"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nome</label>

        <input
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoria</label>

        <SelectApi
          endpoint="/categorias/"
          value={categoriaId}
          onChange={setCategoriaId}
          placeholder="Selecione a categoria"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fornecedor</label>

        <SelectApi
          endpoint="/fornecedores/"
          value={fornecedorId}
          onChange={setFornecedorId}
          placeholder="Selecione o fornecedor"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Unidade</label>

        <SelectApi
          endpoint="/unidades/"
          value={unidadeId}
          onChange={setUnidadeId}
          placeholder="Selecione a unidade"
        />
      </div>

      <div className="row">
        <div className="col">
          <label className="form-label">Preço Compra</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={precoCompra}
            onChange={(e) => setPrecoCompra(e.target.value)}
          />
        </div>

        <div className="col">
          <label className="form-label">Preço Venda</label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
          />
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col">
          <label className="form-label">Estoque Atual</label>

          <input
            type="number"
            className="form-control"
            value={estoqueAtual}
            onChange={(e) => setEstoqueAtual(e.target.value)}
          />
        </div>

        <div className="col">
          <label className="form-label">Estoque Mínimo</label>

          <input
            type="number"
            className="form-control"
            value={estoqueMinimo}
            onChange={(e) => setEstoqueMinimo(e.target.value)}
          />
        </div>
      </div>

      <br />

      <div className="mb-3">
        <label className="form-label">Descrição</label>

        <textarea
          rows={3}
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
    </ModalForm>
  );
}
