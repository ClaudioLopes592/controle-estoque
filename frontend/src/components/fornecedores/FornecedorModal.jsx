import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import MaskedInput from "../common/MaskedInput";

import {
  criarFornecedor,
  atualizarFornecedor,
} from "../../services/fornecedorService";

export default function FornecedorModal({
  show,
  fornecedor,
  onClose,
  onSalvou,
}) {
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (fornecedor) {
      setNome(fornecedor.nome);
      setCpfCnpj(fornecedor.cpfCnpj || "");
      setTelefone(fornecedor.telefone || "");
      setEmail(fornecedor.email || "");
      setContato(fornecedor.contato || "");
      setEndereco(fornecedor.endereco || "");
    } else {
      setNome("");
      setCpfCnpj("");
      setTelefone("");
      setEmail("");
      setContato("");
      setEndereco("");
    }

    setErro("");
  }, [fornecedor, show]);

  async function salvar() {
    if (!nome.trim()) {
      setErro("Informe o nome do fornecedor.");

      return;
    }

    setErro("");

    const dados = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email,
      contato,
      endereco,
    };

    try {
      if (fornecedor) await atualizarFornecedor(fornecedor.id, dados);
      else await criarFornecedor(dados);

      onSalvou();

      onClose();
    } catch (error) {
      setErro(error.response?.data?.detail || "Erro ao salvar fornecedor.");
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
      onClose={onClose}
      onSave={salvar}
      largura="modal-lg"
    >
      {erro && <div className="alert alert-danger">{erro}</div>}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nome</label>

          <input
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">CNPJ</label>

          <MaskedInput
            mascara="cpf_cnpj"
            value={cpfCnpj}
            onChange={setCpfCnpj}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Telefone</label>

          <MaskedInput
            mascara="telefone"
            value={telefone}
            onChange={setTelefone}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>

          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Contato</label>

          <input
            className="form-control"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Endereço</label>

          <input
            className="form-control"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
      </div>
    </ModalForm>
  );
}
