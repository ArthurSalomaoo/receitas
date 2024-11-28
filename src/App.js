import React, { useState } from "react";
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
    imagem: "./imgs/guacamole.jpg", // Caminho atualizado
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
    imagem: "/imgs/tacos_al_pastor.jpg",
  },
  {
    id: 3,
    titulo: "Chiles en Nogada",
    descricao:
      "Un platillo tradicional que combina sabores dulces y salados.",
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
    imagem: "/imgs/chiles_en_nogada.jpg",
  },
];


function App() {
  const [receitas, setReceitas] = useState(receitasMock);
  const [filtro, setFiltro] = useState("");

  const filtrarReceitas = () => {
    if (filtro.trim() === "") {
      setReceitas(receitasMock);
    } else {
      setReceitas(
        receitasMock.filter((receita) =>
          receita.titulo.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }
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
          />

          <p>{receita.descricao}</p>
          <h4>Ingredientes:</h4>
          <ul>
            {receita.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
