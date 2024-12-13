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
    imagem: "./imgs/tacos_al_pastor.jpg",
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
    imagem: "./imgs/chiles_en_nogada.jpg",
  },
];

function App() {
  const [receitas, setReceitas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [receitaEditando, setReceitaEditando] = useState(null);
  const [novaReceita, setNovaReceita] = useState({
    titulo: "",
    descricao: "",
    ingredientes: "",
    imagem: "",
  });

  // Carregar as receitas do localStorage apenas uma vez
  useEffect(() => {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
    const receitasIniciais = [...receitasMock, ...receitasSalvas];
    setReceitas(receitasIniciais);
  }, []);

  // Salvar as receitas no localStorage apenas quando houver uma alteração significativa
  useEffect(() => {
    if (receitas.length > 0) {
      const receitasNovas = receitas.filter(
        (receita) => !receitasMock.some((mock) => mock.id === receita.id)
      );
      localStorage.setItem("receitas", JSON.stringify(receitasNovas));
    }
  }, [receitas]);

  const filtrarReceitas = () => {
    setReceitas((prevReceitas) => {
      return prevReceitas.filter((receita) =>
        receita.titulo.toLowerCase().includes(filtro.toLowerCase())
      );
    });
  };

  const handleAddReceita = () => {
    const novaReceitaFormatada = {
      ...novaReceita,
      id: receitas.length + 1,
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
    });
    setReceitaEditando(null);
    setMostraFormulario(false);
  };

  const handleEditReceita = (receita) => {
    setReceitaEditando(receita);
    setNovaReceita({
      titulo: receita.titulo,
      descricao: receita.descricao,
      ingredientes: receita.ingredientes.join("\n"),
      imagem: receita.imagem,
    });
    setMostraFormulario(true);
  };

  const handleDeleteReceita = (id) => {
    setReceitas(receitas.filter((receita) => receita.id !== id));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif"}}>
      <Cabecalho />
      <div style={{padding:" 20px"}}>
      <BarraDeAcoes
        filtro={filtro}
        setFiltro={setFiltro}
        filtrarReceitas={filtrarReceitas}
        setNovaReceita={setNovaReceita}
        setMostraFormulario={setMostraFormulario}
        setReceitaEditando={setReceitaEditando}
      />

      <div>
        {filtro ? (
          <div>
            <h2>Receitas Filtradas</h2>
            {receitas.map((receita) =>
              receita.titulo.toLowerCase().includes(filtro.toLowerCase()) ? (
                <div
                  key={receita.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <h2>{receita.titulo}</h2>
                  <img
                    src={receita.imagem}
                    alt={`Imagem da receita ${receita.titulo}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <p>{receita.descricao}</p>
                  <button
                    onClick={() => handleEditReceita(receita)}
                    style={{
                      padding: "10px 15px",
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
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Deletar
                  </button>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <h2>Todas as Receitas</h2>
            <div className="receitas">
              {receitas.map((receita) => (
                <div
                  key={receita.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <h2>{receita.titulo}</h2>
                  <img
                    src={receita.imagem}
                    alt={`Imagem da receita ${receita.titulo}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <p>{receita.descricao}</p>
                  <button
                    onClick={() => handleEditReceita(receita)}
                    style={{
                      padding: "10px 15px",
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
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
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
