import React, { useState, useEffect } from "react";
import BarraDeAcoes from "./app/BarraDeAcoes/index";
import Cabecalho from "./app/Cabecalho";
import "./App.css";

const receitasMock = [
  {
    id: 1,
    titulo: "Guacamole Tradicional",
    descricao: "Una receta simple y deliciosa de guacamole.",
    ingredientes: [
      "2 aguacates maduros o 1 aguacate grande",
      "1 tomate pequeño (sin semillas), picado en cubos",
      "1/2 cebolla morada, bien picada",
      "1 diente de ajo, triturado (opcional)",
      "Jugo de 1 limón",
      "Sal al gusto",
      "Cilantro fresco (opcional)",
    ],
    modoDePreparo: [
      "Tritura los aguacates hasta formar un puré.",
      "Añade el tomate, la cebolla y el cilantro, y mezcla.",
      "Condimenta con sal y jugo de limón al gusto.",
      "Sirve inmediatamente con tortillas o como acompañamiento.",
    ],
    imagem: "./imgs/guacamole.jpg",
    video: "https://youtube.com/shorts/WiiFnrYFTzQ",
  },
  {
    id: 2,
    titulo: "Tacos al Pastor",
    descricao:
      "Un plato icónico de México hecho con carne de cerdo marinada y piña.",
    ingredientes: [
      "500g de carne de cerdo (preferentemente lomo)",
      "2 chiles guajillo secos",
      "1 chile ancho seco",
      "2 dientes de ajo",
      "1/4 de taza de vinagre de manzana",
      "1/2 taza de jugo de piña",
      "Tortillas de maíz",
      "Piña en trozos",
      "Cilantro fresco y cebolla picada para decorar",
    ],
    modoDePreparo: [
      "Marinar la carne de cerdo con los chiles, ajo, vinagre y jugo de piña.",
      "Asa la carne hasta que esté bien dorada y córtala en trozos pequeños.",
      "Arma los tacos con la carne, la piña y el cilantro.",
    ],
    imagem:
      "https://blog.biglar.com.br/wp-content/uploads/2023/06/iStock-1371385807-1.jpg",
    video: "https://youtube.com/shorts/WiiFnrYFTzQ",
  },
  {
    id: 3,
    titulo: "Chiles en Nogada",
    descricao: "Un plato tradicional que combina sabores dulces y salados.",
    ingredientes: [
      "4 pimientos poblanos grandes",
      "300g de carne molida (mitad cerdo, mitad res)",
      "1/2 taza de pasas",
      "1/2 taza de almendras picadas",
      "2 duraznos picados",
      "1 granada (semillas)",
      "1 taza de nuez molida",
      "1 taza de crema espesa",
      "1/4 de taza de queso fresco",
    ],
    modoDePreparo: [
      "Asar los pimientos poblanos y retirarles la piel.",
      "Prepara el relleno con carne molida, pasas, almendras y duraznos.",
      "Rellena los pimientos y cúbrelos con la salsa de nogada (crema con nueces).",
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
    video: "",
    modoDePreparo: "", // Adicionando campo "modoDePreparo"
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
      video: receita.video, // Adicionando o campo de vídeo
      modoDePreparo: receita.modoDePreparo.join("\n"),
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
                  <h3 style={{ marginTop: "15px", marginBottom:"5px" }}>Ingredientes:</h3>
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
            <h3>
              {receitaEditando ? "Editar receta" : "Añadir receta"}
            </h3>
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
              {receitaEditando ? "Guardar Cambios" : "Añadir receta"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
