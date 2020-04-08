import React, { useState, useEffect } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
//Importando pacote de icons
import { FiPower, FiTrash2 } from 'react-icons/fi';
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

    return (
        <div className="profile-container">
            {/*Header: parte de cima no cabeçalho*/}
            <header>
                
                <span>Bem vindo, {userName}</span>
                
                {/*Botão para cadastrar uma nova venda*/}
                <Link className="button" to="/sales/new">Cadastrar nova venda</Link>

                {/*Botão de Logout/Sair*/}
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Vendas cadastradas</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>Loja:</th>
                        <th>Data:</th>
                        <th>Cartao:</th>
                        <th>Venda Parcelada?</th>
                        <th>Quantidade de Parcelas:</th>
                        <th>Valor Parcela:</th>
                        <th>Valor Total:</th>
                    </tr>
                </thead>
                {sales.map(sale => (    
                    /*Listagem de casos*/
                    <tbody key={sale.id}>
                        <tr>
                            <td>{sale.loja}</td>
                            <td>{sale.data}</td>
                            <td>{sale.cartao}</td>
                            <td>{sale.parcelamento}</td>
                            <td>{sale.qtdParcela}</td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(sale.valorParcela)}</td>{/*Passando para R$*/}
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(sale.valorTotal)}</td>{/*Passando para R$*/}

                            {/*Botão de apagar venda*/}
                            <button onClick={() => handleDeleteSale(sale.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                            </button>

                        </tr>
                        
                    </tbody>
                ))}
            </table>
        </div>
    );
}