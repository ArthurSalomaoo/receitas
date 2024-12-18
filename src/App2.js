import React, { useState, useEffect } from "react";
import BarraDeAcoes from "./app/BarraDeAcoes/index";
import Cabecalho from "./app/Cabecalho";
import RodaPe from "./app/Rodape";
import "./App.css";

function App() {
  const [modalEditandoAberto, setModalEditandoAberto] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [receitas, setReceitas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [receitaEditando, setReceitaEditando] = useState(null);
  const [novaReceita, setNovaReceita] = useState({
    titulo: "",
    descricao: "",
    ingredientes: "",
    imagem: "",
    video: "",
    modoDePreparo: "",
  });

  const modalStyle = {
    display: receitaSelecionada ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };
  const overlayStyle = {
    display: receitaSelecionada ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  useEffect(() => {
    // Importando receitas do arquivo JSON
    fetch("./arquivos/receitas.json")
      .then((response) => response.json())
      .then((data) => {
        const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
        const receitasUnicas = data.filter(
          (mock) => !receitasSalvas.some((salva) => salva.id === mock.id)
        );
        const receitasIniciais = [...receitasSalvas, ...receitasUnicas];
        setReceitas(receitasIniciais);
      })
      .catch((error) => {
        console.error("Erro ao carregar o arquivo JSON:", error);
      });
  }, []);

  useEffect(() => {
    if (receitas.length > 0) {
      const receitasCustom = receitas.filter(
        (receita) => !receitas.some((mock) => mock.id === receita.id)
      );
      localStorage.setItem("receitas", JSON.stringify(receitasCustom));
    }
  }, [receitas]);

  const filtrarReceitas = () => {
    return receitas.filter((receita) =>
      receita.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const handleAddReceita = () => {
    const novaReceitaFormatada = {
      ...novaReceita,
      id: receitaEditando ? receitaEditando.id : Date.now(),
      ingredientes: novaReceita.ingredientes
        ? novaReceita.ingredientes.split("\n")
        : [],
      modoDePreparo: novaReceita.modoDePreparo
        ? novaReceita.modoDePreparo.split("\n")
        : [],
    };

    if (receitaEditando) {
      setReceitas(
        receitas.map((receita) =>
          receita.id === receitaEditando.id ? novaReceitaFormatada : receita
        )
      );
    } else {
      setReceitas([...receitas, novaReceitaFormatada]);
    }

    setNovaReceita({
      titulo: "",
      descricao: "",
      ingredientes: "",
      imagem: "",
      video: "",
      modoDePreparo: "",
    });
    setReceitaEditando(null);
    setMostraFormulario(false);
  };

  const handleDeleteReceita = (id) => {
    setReceitas(receitas.filter((receita) => receita.id !== id));
  };

  const handleAbrirModal = (receita) => {
    setReceitaSelecionada(receita);
  };

  const handleFecharModal = () => {
    setReceitaSelecionada(null);
  };

  const handleEditReceita = (receita) => {
    setReceitaEditando(receita);
    setNovaReceita({
      titulo: receita.titulo,
      descricao: receita.descricao,
      ingredientes: receita.ingredientes.join("\n"),
      imagem: receita.imagem,
      video: receita.video,
      modoDePreparo: receita.modoDePreparo.join("\n"),
    });
    setMostraFormulario(true);
    setReceitaSelecionada(null);
  };

  const handleCancelar = () => {
    setNovaReceita({
      titulo: "",
      descricao: "",
      ingredientes: "",
      imagem: "",
      video: "",
      modoDePreparo: "",
    });
    setReceitaEditando(null);
    setMostraFormulario(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      <Cabecalho />
      <div style={{ padding: "20px" }}>
        <BarraDeAcoes
          filtro={filtro}
          setFiltro={setFiltro}
          filtrarReceitas={filtrarReceitas}
          setNovaReceita={setNovaReceita}
          setMostraFormulario={setMostraFormulario}
          setReceitaEditando={setReceitaEditando}
        />
        <div>
          <h2 style={{ textAlign: "center", margin: "25px 0 0 0 " }}>
            {filtro ? "Recetas Filtradas" : "Todas las Recetas"}
          </h2>
          <div className="receitas">
            {filtrarReceitas().map((receita) => (
              <div>
                <div
                  key={receita.id}
                  onClick={() => handleAbrirModal(receita)}
                  style={{ cursor: "pointer" }}
                >
                  <h2>{receita.titulo}</h2>
                  <img
                    src={receita.imagem}
                    alt={`Imagem da receita ${receita.titulo}`}
                    style={{
                      maxWidth: "100%",
                      height: "250px",
                      marginTop: "15px",
                    }}
                  />
                  <p style={{ marginTop: "15px" }}>{receita.descricao}</p>
                  <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
                    Ingredientes:
                  </h3>
                  <ul>
                    {receita.ingredientes.map((ingrediente, index) => (
                      <li key={index}>{ingrediente}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={() => handleEditReceita(receita)}
                    style={{
                      padding: "10px 15px",
                      width: "80px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteReceita(receita.id)}
                    style={{
                      padding: "10px 15px",
                      width: "80px",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={overlayStyle} onClick={handleFecharModal}></div>
        <div className={receitaSelecionada ? "receitaSelecionada" : "none"}>
          {receitaSelecionada && (
            <div>
              <h2>{receitaSelecionada.titulo}</h2>
              <img
                src={receitaSelecionada.imagem}
                alt={`Imagem da receita ${receitaSelecionada.titulo}`}
              />
              <p>{receitaSelecionada.descricao}</p>
              <h3 style={{ padding: "10px 0 5px 0" }}>Ingredientes:</h3>
              <ul>
                {receitaSelecionada.ingredientes.map((ingrediente, index) => (
                  <li key={index}>{ingrediente}</li>
                ))}
              </ul>
              <h3 style={{ padding: "10px 0 5px 0" }}>Modo de Preparación:</h3>
              <ul>
                {receitaSelecionada.modoDePreparo.map((passo, index) => (
                  <li key={index}>{passo}</li>
                ))}
              </ul>
              <a
                href={receitaSelecionada.video}
                target="_blank"
                rel="noopener noreferrer"
                style={{ paddingTop: "5px" }}
              >
                Ver el video
              </a>
              <button
                onClick={handleFecharModal}
                style={{
                  display: "block",
                  marginTop: "20px",
                  padding: "10px 15px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {mostraFormulario && (
          <div className="formulario">
            <h3>{receitaEditando ? "Editar receta" : "Añadir receta"}</h3>
            <input
              type="text"
              placeholder="Título de la receta"
              value={novaReceita.titulo}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, titulo: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Descripción de la receta"
              value={novaReceita.descricao}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, descricao: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Ingredientes (uno por línea)"
              value={novaReceita.ingredientes}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, ingredientes: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Modo de preparación (uno por línea)"
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
              placeholder="URL de la imagen (opcional)"
              value={novaReceita.imagem}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, imagem: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="URL del video (opcional)"
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
                {receitaEditando ? "Guardar" : "Añadir"}
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
        )}
      </div>
      <RodaPe />
    </div>
  );
}

export default App;