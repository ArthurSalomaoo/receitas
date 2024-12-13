  import React, { useState } from "react";
  import "./BarraDeAcoes.css"
  function BarraDeAcoes({ filtro, setFiltro, filtrarReceitas, setNovaReceita, setMostraFormulario, setReceitaEditando }) {
    return (
      <div className="barraDeAcoes">
        <input
          type="text"
          placeholder="Buscar receita..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={filtrarReceitas}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Buscar
        </button>

        <button
          onClick={() => {
            setNovaReceita({
              titulo: "",
              descricao: "",
              ingredientes: "",
              imagem: "",
            });
            setMostraFormulario(true);
            setReceitaEditando(null);
          }}
          style={{
            padding: "10px 15px",
            backgroundColor: "#008CBA",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Adicionar Receita
        </button>
      </div>
    );
  }

  export default BarraDeAcoes;
