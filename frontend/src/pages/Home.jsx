import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container-fluid">

        <div className="card shadow-sm border-0 mb-4">
          <div className="row g-0 align-items-center">

            <div className="col-lg-7 p-5">

              <h1 className="display-5 fw-bold text-primary">
                Sistema de Controle de Estoque
              </h1>

              <p className="lead mt-3">
                Gerencie produtos, fornecedores, clientes,
                movimentações de estoque e acompanhe indicadores
                importantes através do Dashboard.
              </p>

              <hr />

              <p className="text-muted">
                Bem-vindo ao sistema.
                Utilize o menu lateral para acessar os módulos.
              </p>

            </div>

            <div className="col-lg-5 text-center">

              <img
                src="/images/home-banner.png"
                alt="Controle de Estoque"
                className="img-fluid p-4"
                style={{
                  maxHeight: "350px",
                  objectFit: "contain",
                }}
              />

            </div>

          </div>
        </div>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-start border-primary border-4">

              <div className="card-body">

                <h4>📦 Produtos</h4>

                <p className="text-muted">
                  Cadastro completo de produtos,
                  categorias e unidades de medida.
                </p>

              </div>

            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-start border-success border-4">

              <div className="card-body">

                <h4>📈 Movimentações</h4>

                <p className="text-muted">
                  Controle de entradas,
                  saídas e histórico do estoque.
                </p>

              </div>

            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-start border-warning border-4">

              <div className="card-body">

                <h4>📊 Dashboard</h4>

                <p className="text-muted">
                  Indicadores, estoque atual,
                  alertas e últimas movimentações.
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}