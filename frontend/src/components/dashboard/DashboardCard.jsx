export default function DashboardCard({
  titulo,
  valor,
  icone,
  cor = "primary",
}) {
  return (
    <div className="col-12 col-sm-6 col-xl-3 mb-4">
      <div
        className={`card border-${cor} shadow-sm h-100`}
        style={{
          transition: "all .2s ease",
        }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-grow-1">
              <h6 className="text-muted mb-2">{titulo}</h6>

              <h3 className="fw-bold mb-0">{valor}</h3>
            </div>

            {icone && (
              <div
                className={`text-${cor} ms-3 d-flex align-items-center justify-content-center`}
                style={{
                  fontSize: "2rem",
                  minWidth: "48px",
                }}
              >
                {icone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function DashboardCard({
//   titulo,
//   valor,
//   icone,
//   cor = "primary",
// }) {
//   return (
//     <div className="col-md-6 col-lg-3 mb-4">
//       <div className={`card border-${cor} shadow-sm h-100`}>
//         <div className="card-body">
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h6 className="text-muted mb-2">{titulo}</h6>

//               <h3 className="fw-bold mb-0">{valor}</h3>
//             </div>

//             {icone && (
//               <div
//                 className={`text-${cor}`}
//                 style={{
//                   fontSize: "2.2rem",
//                 }}
//               >
//                 {icone}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
