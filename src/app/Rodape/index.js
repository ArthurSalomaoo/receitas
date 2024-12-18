// RodaPe.js

import React from 'react';
import './RodaPe.css';

const RodaPe = () => {
  return (
    <footer className="rodape">
      <div className="conteudo-footer">
        <div className="endereco">
          <h3>Recetas de Rosemberg</h3>
          <p>&copy; 2024 Todos los derechos reservados</p>
          <span>Dirección: Calle de las Recetas, 123 - Ciudad de México. </span>
          <span>Correo electrónico: contacto@recetasdeliciosas.com</span>
        </div>
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default RodaPe;
