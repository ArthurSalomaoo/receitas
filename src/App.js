import React, { useState, useEffect } from "react";
import Cabechalho from "./app/Cabecalho/index";

const receitasMock = [
  {
    id: 1,
    titulo: "Guacamole Tradicional",
    descricao: "Una receta sencilla y deliciosa de guacamole.",
    ingredientes: [
      "2 aguacates maduros o 1 aguacate grande",
      "1 tomate pequeño (sin semillas), picado en cubitos",
      "1/2 cebolla morada, bien picada",
      "1 diente de ajo, machacado (opcional)",
      "Jugo de 1 limón",
      "Sal al gusto",
      "Cilantro fresco (opcional)",
    ],
    imagem: "./imgs/guacamole.jpg",
  },
  {
    id: 2,
    titulo: "Tacos al Pastor",
    descricao:
      "Un plato icónico de México hecho con carne de cerdo marinada y piña.",
    ingredientes: [
      "500g de carne de cerdo (preferiblemente lomo)",
      "2 chiles guajillo secos",
      "1 chile ancho seco",
      "2 dientes de ajo",
      "1/4 de taza de vinagre de manzana",
      "1/2 taza de jugo de piña",
      "Tortillas de maíz",
      "Piña en trozos",
      "Cilantro fresco y cebolla picada para decorar",
    ],
    imagem: "./imgs/tacos_al_pastor.jpg",
  },
  {
    id: 3,
    titulo: "Chiles en Nogada",
    descricao: "Un platillo tradicional que combina sabores dulces y salados.",
    ingredientes: [
      "4 chiles poblanos grandes",
      "300g de carne molida (mitad cerdo, mitad res)",
      "1/2 taza de pasas",
      "1/2 taza de almendras picadas",
      "2 duraznos picados",
      "1 granada (semillas)",
      "1 taza de nuez molida",
      "1 taza de crema espesa",
      "1/4 de taza de queso fresco",
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

  // Recupera receitas do localStorage e combina com as receitasMock
  useEffect(() => {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
    const receitasIniciais = [...receitasMock, ...receitasSalvas];
    setReceitas(receitasIniciais);
  }, []);

  // Salva apenas as receitas novas no localStorage
  useEffect(() => {
    const receitasNovas = receitas.filter(
      (receita) => !receitasMock.some((mock) => mock.id === receita.id)
    );
    localStorage.setItem("receitas", JSON.stringify(receitasNovas));
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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Cabechalho />

      <input
        type="text"
        placeholder="Buscar receita..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
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

      {mostraFormulario && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3>{receitaEditando ? "Editar Receita" : "Adicionar Nova Receita"}</h3>
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
            placeholder="Ingredientes (um por linha)"
            value={novaReceita.ingredientes}
            onChange={(e) =>
              setNovaReceita({ ...novaReceita, ingredientes: e.target.value })
            }
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="URL da imagem"
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
              marginRight: "10px",
            }}
          >
            Salvar
          </button>
          <button
            onClick={() => setMostraFormulario(false)}
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
      )}

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
          <h4>Ingredientes:</h4>
          <ul>
            {receita.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
          <button
            onClick={() => handleEditReceita(receita)}
            style={{
              padding: "10px",
              backgroundColor: "#008CBA",
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
              padding: "10px",
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
  );
}

export default App;
