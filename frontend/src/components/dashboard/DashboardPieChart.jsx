import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CORES = [
  "#198754", // verde
  "#dc3545", // vermelho
  "#0d6efd", // azul
  "#ffc107", // amarelo
  "#6f42c1", // roxo
  "#fd7e14", // laranja
  "#20c997", // verde água
  "#0dcaf0", // ciano
];

export default function DashboardPieChart({ titulo, dados, dataKey, nameKey }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const total = dados.reduce(
    (soma, item) => soma + Number(item[dataKey] || 0),
    0,
  );

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-white">
        <h5 className="mb-0">{titulo}</h5>
      </div>

      <div className="card-body">
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={dados}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={3}
              animationDuration={1000}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {dados.map((_, index) => (
                <Cell key={index} fill={CORES[index % CORES.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => Number(value).toLocaleString("pt-BR")}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <hr />

        <div className="text-center">
          <h3 className="text-primary mb-0">{total.toLocaleString("pt-BR")}</h3>

          <small className="text-muted">Total</small>
        </div>
      </div>
    </div>
  );
}
