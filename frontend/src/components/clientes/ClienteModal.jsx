import { useEffect, useState } from "react";

import ModalForm from "../common/ModalForm";
import MaskedInput from "../common/MaskedInput";

import { criarCliente, atualizarCliente } from "../../services/clienteService";

export default function ClienteModal({ show, cliente, onClose, onSalvou }) {
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCpfCnpj(cliente.cpf_cnpj || "");
      setTelefone(cliente.telefone || "");
      setEmail(cliente.email || "");
      setEndereco(cliente.endereco || "");
    } else {
      setNome("");
      setCpfCnpj("");
      setTelefone("");
      setEmail("");
      setEndereco("");
    }

    setErro("");
  }, [cliente, show]);

  async function salvar() {
    if (!nome.trim()) {
      setErro("Informe o nome do cliente.");

      return;
    }

    setErro("");

    const dados = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email,
      endereco,
    };

    try {
      if (cliente) await atualizarCliente(cliente.id, dados);
      else await criarCliente(dados);

      onSalvou();

      onClose();
    } catch (error) {
      setErro(error.response?.data?.detail || "Erro ao salvar cliente.");
    }
  }

  return (
    <ModalForm
      show={show}
      titulo={cliente ? "Editar Cliente" : "Novo Cliente"}
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
          <label className="form-label">CPF/CNPJ</label>

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
          <label className="form-label">E-mail</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
