import React, { useState, useEffect } from "react";
import BarraDeAcoes from "./app/BarraDeAcoes/index";
import Cabecalho from "./app/Cabecalho";
import RodaPe from "./app/Rodape";
import Formulario from "./app/Formulario";
import "./App.css";

function App() {
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

  useEffect(() => {
    fetch("./arquivos/receitas.json")
      .then((response) => response.json())
      .then((data) => {
        const receitasSalvas =
          JSON.parse(localStorage.getItem("receitas")) || [];
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
      localStorage.setItem("receitas", JSON.stringify(receitas));
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
              <div key={receita.id}>
                <div
                  onClick={() => handleAbrirModal(receita)}
                  style={{ cursor: "pointer" }}
                >
                  <h2>{receita.titulo}</h2>
                  <img
                    src={receita.imagem}
                    alt={`Imagem da receita ${receita.titulo}`}
                    className="receita-imagem"
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
                    className="botao-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteReceita(receita.id)}
                    className="botao-deletar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={receitaSelecionada ? "overlay" : "none"}
          onClick={handleFecharModal}
        ></div>
        <div className={receitaSelecionada ? "receitaSelecionada" : "none"}>
          {receitaSelecionada && (
            <div>
              <h2>{receitaSelecionada.titulo}</h2>
              <img
                src={receitaSelecionada.imagem}
                alt={`Imagem da receita ${receitaSelecionada.titulo}`}
                className="receita-imagem"
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
              <button onClick={handleFecharModal} className="botao-deletar">
                Cerrar
              </button>
            </div>
          )}
        </div>

        {mostraFormulario && (
          <Formulario
            receitaEditando={receitaEditando}
            novaReceita={novaReceita}
            setNovaReceita={setNovaReceita}
            handleAddReceita={handleAddReceita}
            handleCancelar={handleCancelar}
          />
        )}
      </div>
      <RodaPe />
    </div>
  );
}

export default App;
