import DataTable from "../common/DataTable";
import DashboardSection from "./DashboardSection";

export default function DashboardMovimentacoes({ movimentacoes }) {
  const columns = [
    {
      key: "produto",
      label: "Produto",
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
      key: "quantidade",
      label: "Quantidade",
    },

    {
      key: "data_movimento",
      label: "Data",

      render: (item) => new Date(item.data_movimento).toLocaleString("pt-BR"),
    },
  ];

  return (
    <DashboardSection titulo="Últimas Movimentações">
      <DataTable
        columns={columns}
        data={movimentacoes}
        emptyMessage="Nenhuma movimentação encontrada."
      />
    </DashboardSection>
  );
}
