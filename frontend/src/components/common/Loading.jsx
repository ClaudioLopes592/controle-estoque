export default function Loading({
  loading,

  texto = "Carregando...",
}) {
  if (!loading) return null;

  return (
    <div className="d-flex align-items-center alert alert-info" role="alert">
      <div
        className="spinner-border spinner-border-sm me-3"
        role="status"
      ></div>

      <span>{texto}</span>
    </div>
  );
}
