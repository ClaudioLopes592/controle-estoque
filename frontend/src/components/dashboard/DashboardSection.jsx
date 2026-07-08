export default function DashboardSection({
  titulo,
  children,
  footer = null,
  className = "",
  headerActions = null,
}) {
  return (
    <div className={`card shadow-sm mb-4 ${className}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{titulo}</h5>

        {headerActions}
      </div>

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}