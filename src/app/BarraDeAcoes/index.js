import React, { useState } from "react";
import "./BarraDeAcoes.css";

function BarraDeAcoes({
  filtro,
  setFiltro,
  filtrarReceitas,
  setNovaReceita,
  setMostraFormulario,
  setReceitaEditando,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(null);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setIdiomaSelecionado(null); // Reseta la selección del idioma
  };

  const selecionarIdioma = (idioma) => {
    setIdiomaSelecionado(idioma);
  };

  return (
    <div className="barraDeAcoes">
      <input
        type="text"
        placeholder="Buscar receta..."
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
        Añadir receta
      </button>

      {/* Botón "Receta de la Casa" */}
      <button
        onClick={abrirModal}
        style={{
          padding: "10px 15px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Receta de la Casa
      </button>

      {/* El Modal con las opciones de idioma */}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h3>Elige el idioma</h3>
          <button
            onClick={() => selecionarIdioma("portugues")}
            style={{
              backgroundColor:
                idiomaSelecionado === "portugues" ? "#007bff" : "#ccc",
              color: idiomaSelecionado === "portugues" ? "#fff" : "#333",
              padding: "10px 15px",
              border: "none",
              margin: "15px 20px 15px 0",
              cursor: "pointer",
              borderRadius: "5px", // Bordes redondeados para suavizar el aspecto
            }}
          >
            Portugués
          </button>
          <button
            onClick={() => selecionarIdioma("espanhol")}
            style={{
              backgroundColor:
                idiomaSelecionado === "espanhol" ? "#007bff" : "#ccc",
              color: idiomaSelecionado === "espanhol" ? "#fff" : "#333",
              padding: "10px 15px",
              border: "none",
              cursor: "pointer",
              margin: "15px 20px 15px 0",
              borderRadius: "5px", // Bordes redondeados para suavizar el aspecto
            }}
          >
            Español
          </button>
          <button
            onClick={fecharModal}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f44336", // Color de fondo rojo
              color: "#fff", // Color del texto blanco
              border: "none",
              cursor: "pointer",
              margin: "15px 0 15px 0",
              borderRadius: "5px", // Bordes redondeados para suavizar el aspecto
              fontWeight: "bold", // Hacer que el texto sea más destacado
              transition: "background-color 0.3s ease", // Transición suave de color al pasar el ratón
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e53935")} // Color más oscuro al pasar el ratón
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")} // Vuelve al color original al salir
          >
            Cerrar
          </button>

          {idiomaSelecionado && (
            <div className="imagem">
              {idiomaSelecionado === "portugues" ? (
                <div>
                  <a
                    href="/arquivos/guacamole%20português.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{display:"block",margin:"0 0 17px 0"}}
                  >
                    Enlace de la receta
                  </a>
                  <img src="./arquivos/portugues1.png" alt="Imagen A" />
                  <img src="./arquivos/portugues2.png" alt="Imagen A" />
                </div>
              ) : (
                <div>
                  <a
                    href="/arquivos/guacamole%20espanhol.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{display:"block",margin:"0 0 17px 0"}}

                  >
                    Enlace de la receta
                  </a>
                  <img src="./arquivos/espanhol1.png" alt="Español 1" />
                  <img src="./arquivos/espanhol2.png" alt="Imagen A" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* La capa de fondo del modal */}
      {mostrarModal && (
        <div
          onClick={fecharModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );
}

export default BarraDeAcoes;
