import DashboardSection from "./DashboardSection";

export default function DashboardFinanceiro({ dashboard }) {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <DashboardSection titulo="Valor Total do Estoque">
          <div className="text-center py-3">
            <h2 className="text-success fw-bold mb-0">
              {Number(dashboard.valor_total_estoque).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>

            <small className="text-muted">
              Valor calculado pelo custo de aquisição dos produtos em estoque
            </small>
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}
