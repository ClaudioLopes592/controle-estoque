import { useEffect, useState } from "react";

export default function DataTable({
  columns,
  data,
  onEditar,
  onExcluir,
  emptyMessage = "Nenhum registro encontrado.",
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mostrarAcoes = Boolean(onEditar || onExcluir);

  if (data.length === 0) {
    return (
      <div className="alert alert-light border text-center">{emptyMessage}</div>
    );
  }

  if (isMobile) {
    return (
      <div className="d-flex flex-column gap-3">
        {data.map((item) => (
          <div key={item.id} className="card shadow-sm border-0">
            <div className="card-body">
              {columns.map((coluna) => (
                <div key={coluna.key} className="mb-3">
                  <div className="text-secondary small fw-semibold">
                    {coluna.label}
                  </div>

                  <div>
                    {coluna.render ? coluna.render(item) : item[coluna.key]}
                  </div>
                </div>
              ))}

              {mostrarAcoes && (
                <div className="d-grid gap-2 mt-4">
                  {onEditar && (
                    <button
                      className="btn btn-warning"
                      onClick={() => onEditar(item.id)}
                    >
                      Editar
                    </button>
                  )}

                  {onExcluir && (
                    <button
                      className="btn btn-danger"
                      onClick={() => onExcluir(item.id)}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            {columns.map((coluna) => (
              <th
                key={coluna.key}
                style={{
                  width: coluna.width || "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {coluna.label}
              </th>
            ))}

            {mostrarAcoes && (
              <th
                style={{
                  width: "150px",
                }}
              >
                Ações
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((coluna) => (
                <td key={coluna.key}>
                  {coluna.render ? coluna.render(item) : item[coluna.key]}
                </td>
              ))}

              {mostrarAcoes && (
                <td>
                  <div className="d-flex gap-2">
                    {onEditar && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => onEditar(item.id)}
                      >
                        Editar
                      </button>
                    )}

                    {onExcluir && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onExcluir(item.id)}
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}