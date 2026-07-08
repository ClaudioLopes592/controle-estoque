export default function ModalForm({
  show,
  titulo,
  children,
  onClose,
  onSave,
  textoBotao = "Salvar",
  largura = "",
}) {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
      }}
      onClick={onClose}
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${largura}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="button" className="btn btn-primary" onClick={onSave}>
              {textoBotao}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function ModalForm({
//   show,

//   titulo,

//   children,

//   onClose,

//   onSave,

//   textoBotao = "Salvar",

//   largura = "",
// }) {
//   if (!show) return null;

//   return (
//     <div
//       className="modal d-block"
//       style={{ backgroundColor: "rgba(0,0,0,.5)" }}
//     >
//       <div className={`modal-dialog ${largura}`}>
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{titulo}</h5>

//             <button className="btn-close" onClick={onClose} />
//           </div>

//           <div className="modal-body">{children}</div>

//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Cancelar
//             </button>

//             <button className="btn btn-primary" type="submit" onClick={onSave}>
//               {textoBotao}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
