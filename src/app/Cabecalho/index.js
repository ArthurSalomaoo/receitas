import React from "react";
import "./Cabecalho.css"
function Cabecalho() {
  return (
    <div className="cabecalho">
      <img src="./imgs/ratatuille.png" alt="Logo" width={75} />
      <h1 style={{ margin: "0 20px"}}>Receitas do Rosemberg</h1>
      <img src="./imgs/bandeiraMexico.png" width={180} ></img>
    </div>
  );
}

export default Cabecalho;
