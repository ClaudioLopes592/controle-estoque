import { useEffect, useState, useRef } from "react";

import Layout from "../../components/layout/Layout";
import Loading from "../../components/common/Loading";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";

import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardSection from "../../components/dashboard/DashboardSection";
import DashboardResumo from "../../components/dashboard/DashboardResumo";
import DashboardFinanceiro from "../../components/dashboard/DashboardFinanceiro";
import DashboardMovimentacoes from "../../components/dashboard/DashboardMovimentacoes";
import DashboardPieChart from "../../components/dashboard/DashboardPieChart";

import {
  obterDashboard,
  obterEntradasSaidas,
  obterEstoqueCategorias,
} from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(false);

  const [erro, setErro] = useState("");

  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());

  const [graficoEntradasSaidas, setGraficoEntradasSaidas] = useState([]);

  const [graficoCategorias, setGraficoCategorias] = useState([]);

  const carregando = useRef(false);

  useEffect(() => {
    carregarDashboard();

    const interval = setInterval(() => {
      carregarDashboard();
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  async function carregarDashboard() {
    if (carregando.current) return;

    carregando.current = true;

    try {
      const [resumo, entradasSaidas, categorias] = await Promise.all([
        obterDashboard(),
        obterEntradasSaidas(),
        obterEstoqueCategorias(),
      ]);

      setDashboard(resumo);

      setGraficoEntradasSaidas([
        {
          tipo: "Entradas",
          quantidade: entradasSaidas.entradas,
        },
        {
          tipo: "Saídas",
          quantidade: entradasSaidas.saidas,
        },
      ]);

      setGraficoCategorias(categorias);
    } catch (error) {
      console.error(error);

      setErro("Erro ao carregar o Dashboard.");
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
    <>
      <Layout>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-4">Dashboard</h2>

          <small className="text-muted">
            Atualizado às {ultimaAtualizacao.toLocaleTimeString("pt-BR")}
          </small>
        </div>

        <DashboardResumo dashboard={dashboard} />

        <DashboardFinanceiro dashboard={dashboard} />

        <DashboardMovimentacoes
          movimentacoes={dashboard.ultimas_movimentacoes}
        />

        <div className="row mt-4">
          <div className="col-lg-6 mb-4">
            <DashboardPieChart
              titulo="Entradas x Saídas"
              dados={graficoEntradasSaidas}
              dataKey="quantidade"
              nameKey="tipo"
            />
          </div>

          <div className="col-lg-6 mb-4">
            <DashboardPieChart
              titulo="Estoque por Categoria"
              dados={graficoCategorias}
              dataKey="valor"
              nameKey="categoria"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
