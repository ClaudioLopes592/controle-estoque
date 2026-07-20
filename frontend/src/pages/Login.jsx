import { useState } from "react";
import { Eye, EyeSlash, BoxSeam } from "react-bootstrap-icons";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { salvarLogin } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const resposta = await login(usuario, senha);

      salvarLogin(resposta);

      window.location.href = "/";
    } catch (err) {
      setErro(err.response?.data?.detail ?? "Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <div
          className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center text-white"
          style={{
            background: "linear-gradient(135deg,#0d6efd,#4f8cff,#6ea8fe)",
          }}
        >
          <div className="text-center px-5">
            <img
              src="/images/login-illustration.png"
              alt="Controle de Estoque"
              className="img-fluid mb-4"
              style={{ maxHeight: 380 }}
            />

            <h1 className="fw-bold">Controle de Estoque</h1>

            <p className="lead">
              Gerencie produtos, fornecedores, clientes e movimentações de
              maneira simples, rápida e segura.
            </p>
          </div>
        </div>

        <div className="col-lg-5 d-flex align-items-center justify-content-center bg-light">
          <div
            className="card shadow-lg border-0 p-4"
            style={{
              width: "100%",
              maxWidth: 430,
              borderRadius: 20,
            }}
          >
            <div className="text-center mb-4">
              <BoxSeam size={58} className="text-primary mb-3" />

              <h3 className="fw-bold">Bem-vindo</h3>

              <p className="text-muted">Faça login para continuar</p>
            </div>

            {erro && <div className="alert alert-danger">{erro}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuário</label>

                <input
                  className="form-control form-control-lg"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Senha</label>

                <div className="input-group">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    className="form-control form-control-lg"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? <EyeSlash /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
              <hr />
              <p className="text-center">
                <span className="text-muted">
                  Não possui acesso? Procure o administrador do sistema.
                </span>
              </p>
            </form>

            <hr />

            <div className="text-center text-muted small">
              © 2026 Controle de Estoque
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
