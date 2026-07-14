export default function DashboardCard({
  titulo,
  valor,
  icone,
  cor = "primary",
  subtitulo = "",
}) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          borderLeft: `5px solid var(--bs-${cor})`,
          transition: "all .25s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 .75rem 1.5rem rgba(0,0,0,.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <small className="text-muted text-uppercase fw-semibold">
                {titulo}
              </small>

              <h2 className="fw-bold mt-2 mb-1">{valor}</h2>

              {subtitulo && <small className="text-muted">{subtitulo}</small>}
            </div>

            <div
              className={`text-${cor}`}
              style={{
                fontSize: "2.8rem",
                lineHeight: 1,
              }}
            >
              {icone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
