// src/app/Formulario.js

import React from "react";

function Formulario({
  novaReceita,
  setNovaReceita,
  handleAddReceita,
  handleCancelar,
  receitaEditando
}) {
  return (
    <div className="formulario">
      <h3>{receitaEditando ? "Editar receita" : "Adicionar receita"}</h3>
      <input
        type="text"
        placeholder="Título da receita"
        value={novaReceita.titulo}
        onChange={(e) =>
          setNovaReceita({ ...novaReceita, titulo: e.target.value })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Descrição da receita"
        value={novaReceita.descricao}
        onChange={(e) =>
          setNovaReceita({ ...novaReceita, descricao: e.target.value })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Ingredientes (um por linha)"
        value={novaReceita.ingredientes}
        onChange={(e) =>
          setNovaReceita({ ...novaReceita, ingredientes: e.target.value })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Modo de preparo (um por linha)"
        value={novaReceita.modoDePreparo}
        onChange={(e) =>
          setNovaReceita({
            ...novaReceita,
            modoDePreparo: e.target.value,
          })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="URL da imagem (opcional)"
        value={novaReceita.imagem}
        onChange={(e) =>
          setNovaReceita({ ...novaReceita, imagem: e.target.value })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="URL do vídeo (opcional)"
        value={novaReceita.video}
        onChange={(e) =>
          setNovaReceita({ ...novaReceita, video: e.target.value })
        }
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleAddReceita}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {receitaEditando ? "Salvar" : "Adicionar"}
        </button>

        <button
          onClick={handleCancelar}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Formulario;
