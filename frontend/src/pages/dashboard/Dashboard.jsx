import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";

import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardSection from "../../components/dashboard/DashboardSection";

import { obterDashboard } from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(false);

  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDashboard();
  }, []);

  async function carregarDashboard() {
    setLoading(true);

    try {
      const dados = await obterDashboard();

      setDashboard(dados);
    } catch (error) {
      console.error(error);

      setErro("Erro ao carregar o Dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <Loading loading texto="Carregando Dashboard..." />
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <AlertMessage
          tipo="danger"
          mensagem={erro}
          onClose={() => setErro("")}
        />
      </Layout>
    );
  }

  const columns = [
    {
      key: "produto",
      label: "Produto",
      render: (item) => item.produto?.nome,
    },
    {
      key: "tipo",
      label: "Tipo",
      render: (item) => (
        <span
          className={`badge ${item.tipo === "E" ? "bg-success" : "bg-danger"}`}
        >
          {item.tipo === "E" ? "Entrada" : "Saída"}
        </span>
      ),
    },
    {
      key: "origem",
      label: "Origem",
    },
    {
      key: "quantidade",
      label: "Quantidade",
    },
    {
      key: "preco_unitario",
      label: "Preço",
      render: (item) =>
        Number(item.preco_unitario).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
  ];

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <DashboardCard
          titulo="Produtos"
          valor={dashboard.total_produtos}
          icone="📦"
        />

        <DashboardCard
          titulo="Categorias"
          valor={dashboard.total_categorias}
          icone="🗂️"
          cor="success"
        />

        <DashboardCard
          titulo="Clientes"
          valor={dashboard.total_clientes}
          icone="👤"
          cor="warning"
        />

        <DashboardCard
          titulo="Fornecedores"
          valor={dashboard.total_fornecedores}
          icone="🏢"
          cor="info"
        />
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            {/* <div className="card-header">
              <strong>Valor Total do Estoque</strong>
            </div> */}

            <DashboardSection titulo="Valor Total do Estoque">
              <h3 className="text-success">
                {Number(dashboard.valor_total_estoque).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </DashboardSection>

            {/* <div className="card-body">
              <h3 className="text-success">
                {Number(dashboard.valor_total_estoque).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div> */}
          </div>
        </div>
        <DashboardSection titulo="Produtos com Estoque Baixo">
          <h3 className="text-danger">{dashboard.produtos_estoque_baixo}</h3>
        </DashboardSection>

        {/* <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <strong>Produtos com Estoque Baixo</strong>
            </div>

            <div className="card-body">
              <h3 className="text-danger">
                {dashboard.produtos_estoque_baixo}
              </h3>
            </div>
          </div>
        </div> */}
      </div>
      <DashboardSection titulo="Últimas Movimentações">
        <DataTable
          columns={columns}
          data={dashboard.ultimas_movimentacoes}
          emptyMessage="Nenhuma movimentação encontrada."
        />
      </DashboardSection>

      {/* <div className="card shadow-sm">
        <div className="card-header">
          <strong>Últimas Movimentações</strong>
        </div>

        <div className="card-body">
          <DataTable
            columns={columns}
            data={dashboard.ultimas_movimentacoes}
            emptyMessage="Nenhuma movimentação encontrada."
          />
        </div>
      </div> */}
    </Layout>
  );
}
