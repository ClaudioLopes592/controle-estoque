import DashboardCard from "./DashboardCard";

export default function DashboardResumo({ dashboard }) {
  return (
    <>
      <div className="row g-3 mb-4">
        <DashboardCard
          titulo="Produtos"
          valor={dashboard.total_produtos}
          icone="📦"
          subtitulo="Produtos cadastrados"
        />

        <DashboardCard
          titulo="Categorias"
          valor={dashboard.total_categorias}
          icone="🗂️"
          cor="success"
          subtitulo="Categorias ativas"
        />

        <DashboardCard
          titulo="Clientes"
          valor={dashboard.total_clientes}
          icone="👥"
          cor="warning"
          subtitulo="Clientes cadastrados"
        />

        <DashboardCard
          titulo="Fornecedores"
          valor={dashboard.total_fornecedores}
          icone="🏢"
          cor="info"
          subtitulo="Fornecedores ativos"
        />
      </div>

      <div className="row g-3">
        <DashboardCard
          titulo="Estoque Total"
          valor={Number(dashboard.estoque_total).toLocaleString("pt-BR")}
          icone="📚"
          cor="secondary"
        />

        <DashboardCard
          titulo="Entradas Hoje"
          valor={dashboard.entradas_hoje}
          icone="📥"
          cor="success"
          subtitulo="Movimentações de entrada"
        />

        <DashboardCard
          titulo="Saídas Hoje"
          valor={dashboard.saidas_hoje}
          icone="📤"
          cor="danger"
          subtitulo="Movimentações de saída"
        />

        <DashboardCard
          titulo="Estoque Baixo"
          valor={dashboard.produtos_estoque_baixo}
          icone="⚠️"
          cor="warning"
        />
      </div>
    </>
  );
}
