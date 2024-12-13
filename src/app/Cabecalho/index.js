import React from "react";
import "./Cabecalho.css"
function Cabecalho() {
  return (
    <div className="cabecalho">
      <img src="./imgs/ratatuille.png" alt="Logo" width={75} />
      <h1 style={{ marginLeft: "20px" }}>Receitas do Rosemberg</h1>
    </div>
  );
}

export default Cabecalho;
