export default function DashboardEstoqueBaixo({ produtos }) {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="card shadow-sm border-warning">
          <div className="card-header bg-warning">
            <h5 className="mb-0">⚠ Produtos com Estoque Baixo</h5>
          </div>

          <div className="card-body">
            {!produtos || produtos.length === 0 ? (
              <div className="alert alert-success mb-0">
                <strong>Parabéns!</strong> Nenhum produto está abaixo do estoque
                mínimo.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Produto</th>
                      <th className="text-center">Estoque Atual</th>
                      <th className="text-center">Estoque Mínimo</th>
                      <th className="text-center">Unidade</th>
                      <th className="text-center">Situação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {produtos.map((produto) => {
                      const percentual =
                        produto.estoque_minimo > 0
                          ? (produto.estoque_atual / produto.estoque_minimo) *
                            100
                          : 100;

                      return (
                        <tr key={produto.id}>
                          <td>
                            <strong>{produto.nome}</strong>
                          </td>

                          <td className="text-center">
                            {produto.estoque_atual}
                          </td>

                          <td className="text-center">
                            {produto.estoque_minimo}
                          </td>

                          <td className="text-center">{produto.unidade}</td>

                          <td className="text-center">
                            <div
                              className="progress"
                              style={{ height: "22px" }}
                            >
                              <div
                                className={`progress-bar ${
                                  percentual < 50
                                    ? "bg-danger"
                                    : percentual < 100
                                      ? "bg-warning text-dark"
                                      : "bg-success"
                                }`}
                                role="progressbar"
                                style={{
                                  width: `${Math.min(percentual, 100)}%`,
                                }}
                              >
                                {Math.round(percentual)}%
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
