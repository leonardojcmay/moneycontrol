import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Importando página de Login
import Login from './pages/Login';
//Importar página Register: cadastro dos usuarios
import Register from './pages/Register';
//Importando página Profile: listar as vendas do usuario que esta logada no sistema
import Profile from './pages/Profile';
//Importando página NewSale: cadastrar nova venda
import NewSale from './pages/NewSale';
//Importando página Manage: gerir os resultados das vendas
import Manage from './pages/Manage';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>{/* Switch: garante que apenas uma rota seja conectada por momento */}
                <Route path="/" exact component={Login} />{/*Primeira rota*/}
                <Route path="/register" component={Register} />{/*Seguenda rota*/}
                <Route path="/profile" component={Profile} />{/*Terceira rota*/}
                <Route path="/sales/new" component={NewSale} />{/*Quarta rota*/}
                <Route path="/manage" component={Manage} />{/*Quinta rota*/}
            </Switch>
        </BrowserRouter>
    );
} 