import React, { useState, useEffect } from "react";
import BarraDeAcoes from "./app/BarraDeAcoes/index";
import Cabecalho from "./app/Cabecalho";
import "./App.css";

const receitasMock = [
  {
    id: 1,
    titulo: "Guacamole Tradicional",
    descricao: "Uma receita simples e deliciosa de guacamole.",
    ingredientes: [
      "2 abacates maduros ou 1 abacate grande",
      "1 tomate pequeno (sem sementes), picado em cubos",
      "1/2 cebola roxa, bem picada",
      "1 dente de alho, amassado (opcional)",
      "Suco de 1 limão",
      "Sal a gosto",
      "Coentro fresco (opcional)",
    ],
    imagem: "./imgs/guacamole.jpg",
    video: "https://youtube.com/shorts/WiiFnrYFTzQ",
  },
  {
    id: 2,
    titulo: "Tacos al Pastor",
    descricao:
      "Um prato icônico do México feito com carne de porco marinada e abacaxi.",
    ingredientes: [
      "500g de carne de porco (preferencialmente lombo)",
      "2 chiles guajillo secos",
      "1 chile ancho seco",
      "2 dentes de alho",
      "1/4 de xícara de vinagre de maçã",
      "1/2 xícara de suco de abacaxi",
      "Tortilhas de milho",
      "Abacaxi em pedaços",
      "Coentro fresco e cebola picada para decorar",
    ],
    imagem:
      "https://blog.biglar.com.br/wp-content/uploads/2023/06/iStock-1371385807-1.jpg",
    video: "https://youtube.com/shorts/WiiFnrYFTzQ",
  },
  {
    id: 3,
    titulo: "Chiles en Nogada",
    descricao: "Um prato tradicional que combina sabores doces e salgados.",
    ingredientes: [
      "4 pimentões poblanos grandes",
      "300g de carne moída (metade de porco, metade de boi)",
      "1/2 xícara de passas",
      "1/2 xícara de amêndoas picadas",
      "2 pêssegos picados",
      "1 romã (sementes)",
      "1 xícara de noz moída",
      "1 xícara de creme espesso",
      "1/4 de xícara de queijo fresco",
    ],
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjOPPUv_TjNYUh49ZzaOKjghnSU7r15PZIEw&s",
    video: "https://youtube.com/shorts/WiiFnrYFTzQ",
  },
];

function App() {
  const [modalEditandoAberto, setModalEditandoAberto] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null); // Aqui está a primeira declaração
  const [receitas, setReceitas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [receitaEditando, setReceitaEditando] = useState(null);
  const [novaReceita, setNovaReceita] = useState({
    titulo: "",
    descricao: "",
    ingredientes: "",
    imagem: "",
    video: "", // Adicionando o campo de vídeo
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
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];

    const receitasUnicas = receitasMock.filter(
      (mock) => !receitasSalvas.some((salva) => salva.id === mock.id)
    );
    const receitasIniciais = [...receitasSalvas, ...receitasUnicas];
    setReceitas(receitasIniciais);
  }, []);

  useEffect(() => {
    if (receitas.length > 0) {
      const receitasCustom = receitas.filter(
        (receita) => !receitasMock.some((mock) => mock.id === receita.id)
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
      ingredientes: novaReceita.ingredientes.split("\n"),
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
      video: "", // Limpando o campo de vídeo após adicionar
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
      video: receita.video, // Adicionando o campo de vídeo
    });
    setMostraFormulario(true);
    setReceitaSelecionada(null);
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
          <h2 style={{ textAlign: "center", margin: "25px 0" }}>
            {filtro ? "Receitas Filtradas" : "Todas as Receitas"}
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
                  <h3 style={{ marginTop: "15px" }}>Ingredientes:</h3>
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
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={overlayStyle} onClick={handleFecharModal}></div>
        <div className={receitaSelecionada ? "receitaSelecionada":"none"}>
          {receitaSelecionada && (
            <div>
              <h2>{receitaSelecionada.titulo}</h2>
              <img
                src={receitaSelecionada.imagem}
                alt={`Imagem da receita ${receitaSelecionada.titulo}`}
              />
              <p>{receitaSelecionada.descricao}</p>
              <h3>Ingredientes:</h3>
              <ul>
                {receitaSelecionada.ingredientes.map((ingrediente, index) => (
                  <li key={index}>{ingrediente}</li>
                ))}
              </ul>
              <a
                href={receitaSelecionada.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                Assistir ao vídeo
              </a>
              <button
                onClick={handleFecharModal}
                style={{
                  display:"block",
                  marginTop: "20px",
                  padding: "10px 15px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          )}
        </div>

        {mostraFormulario && (
          <div className="formulario">
            <h3>
              {receitaEditando ? "Editar Receita" : "Adicionar Nova Receita"}
            </h3>
            <input
              type="text"
              placeholder="Título"
              value={novaReceita.titulo}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, titulo: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Descrição"
              value={novaReceita.descricao}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, descricao: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Ingredientes (separados por linhas)"
              value={novaReceita.ingredientes}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, ingredientes: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="URL da Imagem"
              value={novaReceita.imagem}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, imagem: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="URL do Vídeo"
              value={novaReceita.video}
              onChange={(e) =>
                setNovaReceita({ ...novaReceita, video: e.target.value })
              }
              style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
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
              {receitaEditando ? "Salvar Alterações" : "Adicionar Receita"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
