import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Importando página de Login
import Login from './pages/Login';
//Importar página Register: cadastro dos usuarios
import Register from './pages/Register';
//Importando página Profile: listar os casos da ONG que esta logada no sistema
import Profile from './pages/Profile';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>{/* Switch: garante que apenas uma rota seja conectada por momento */}
                <Route path="/" exact component={Login} />{/*Primeira rota*/}
                <Route path="/register" component={Register} />{/*Seguenda rota*/}
                <Route path="/profile" component={Profile} />{/*Terceira rota*/}
            </Switch>
        </BrowserRouter>
    );
} 