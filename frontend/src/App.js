import React, { useState } from 'react';//useState: para fazer com que o número do contador na pagina web atualize automaricamente, ou seja, renderize automaticamente
//Importando css padrão da aplicação
import './global.css';
//Importando as rotas
import Routes from './routes';


//JSX: é quando o arquivo HTML esta escrito dentro de um arquivo JavaScript
function App() {  
  return (
    <Routes />   
  );
}

export default App;