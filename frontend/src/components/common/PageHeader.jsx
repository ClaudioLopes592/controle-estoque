export default function PageHeader({ titulo, textoBotao, onNovo }) {
  return (
    <div className="mb-4">
      <div
        className="
          d-flex
          flex-column
          flex-md-row
          justify-content-between
          align-items-md-center
          gap-3
        "
      >
        <h2 className="mb-0">{titulo}</h2>

        {textoBotao && (
          <button className="btn btn-primary" onClick={onNovo}>
            {textoBotao}
          </button>
        )}
      </div>

      <hr />
    </div>
  );
}
