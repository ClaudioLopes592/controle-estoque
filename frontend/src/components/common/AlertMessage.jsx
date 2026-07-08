import { useEffect } from "react";

export default function AlertMessage({
  tipo = "success",
  mensagem,
  onClose,
  tempo = 4000,
}) {
  useEffect(() => {
    if (!mensagem) return;

    const timer = setTimeout(() => {
      onClose();
    }, tempo);

    return () => clearTimeout(timer);
  }, [mensagem, tempo, onClose]);

  if (!mensagem) return null;

  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show`}
      role="alert"
    >
      {mensagem}

      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
}
