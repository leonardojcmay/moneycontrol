import React, { useState, useEffect } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
//Importando pacote de icons
import { FiPower, FiTrash2, FiArrowLeft } from 'react-icons/fi';
//Importando estilização
import './styles.css';
//Impotando imagem utilizada na página
//import logoImg from '../../assets/logo.svg';
//Importando API
import api from '../../services/api';

//Listar todas as vendas do usuario que esta logado no sistema
export default function Manage() {
    //Buscando o nome do usuario logado
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    
    //Salvando as informações em um estado
    const [sales, setSales] = useState([]);

    //Voltando para o inicio após efetuar o Logout/Sair
    const history = useHistory();

    //Listagem das vendas: utilizando função useEffect, que serve para disparar alguma função em algum determinado momento do componente. Por exemplo: assim que ele é mostrado em tela
    //primeira função: função para carregar os casos e tudo mais, segunda função: quando que essa função irá ser executada
    useEffect(() => {
        //Buscando no banco de dados
        api.get('profile', {
            headers: {
                Authorization: userId,
            }

        }).then(response =>{
            setSales(response.data);
        });//Gravando a resposta em um estado
    }, [userId]);//Colocado este parametro para que se caso o id do user mudar, recarregar as vendas desse novo user

    //Função de deletar uma venda
    async function handleDeleteSale(id) {//Vai receber o id da venda que deseja excluir
        try {
            
            await api.delete(`sales/${id}`, {
                //Verificando se é o mesmo usuario que fez o cadastro da venda
                headers: {
                    Authorization: userId,
                }
            });

            //Atualizando a página automaticamente após a exclusão, para retirar o caso deletado da lista
            setSales(sales.filter(sale => sale.id !== id));//Retornar todas as vendas diferentes deste id excluido

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    //Função de logout: SAIR
    function handleLogout() {
        //Remover os dados de login do localStorage
        localStorage.clear();//Limpa todos os dados contidos no localStorage
           
        //Após logout, voltando para página inicial
        history.push('/');
    }

    //Função de voltar
    function handleBack() {
        history.push('/profile');
    }

    return (
        <div className="profile-container">
            {/*Header: parte de cima no cabeçalho*/}
            <header>
                
                <span>Bem vindo, {userName}</span>
                
                {/*Botão para cadastrar uma nova venda*/}
                <Link className="button" to="/sales/new">Cadastrar nova venda</Link>

                {/*Botão de Voltar*/}
                <button onClick={handleBack} type="button">
                    <FiArrowLeft size={18} color="#333" />
                </button>

                {/*Botão de Logout/Sair*/}
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Listagem de vendas</h1>
            
            
        </div>
    );
}