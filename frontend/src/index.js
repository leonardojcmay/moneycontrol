import React from 'react';
import ReactDOM from 'react-dom';//Integração do react com o navegador. DOM: arvore de elementos
import App from './App';

//Esta renderizando o arquivo App, dentro da div com id
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
