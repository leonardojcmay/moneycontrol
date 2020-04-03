import React, { useState } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
//Impotando imagem utilizada na página
//import logoImg from '../../assets/logo.svg';
//Importando pacote de icons
import { FiArrowLeft } from 'react-icons/fi';
//Importando API
import api from '../../services/api';

//Página para cadastrar nova venda
export default function NewSale() {
    //Criando estados para cada um dos inputs
    const [loja, setLoja] = useState('');
    const [data, setData] = useState('');
    const [cartao, setCartao] = useState('');
    const [parcelamento, setParcelamento] = useState('');
    const [qtdParcela, setQtdParcela] = useState('');
    const [valorParcela, setValorParcela] = useState('');
    const [valorTotal, setValorTotal] = useState('');

    //Pegando o id do user que esta logado
    const userId = localStorage.getItem('userId');

    //Direcionando para rota /profile, após ter efetuado o cadastro de uma nova venda
    const history = useHistory();

    //Cadastrando nova venda
    async function handleNewSale(e) {
        e.preventDefault();

        const dataC = {
            loja,
            data,
            cartao,
            parcelamento,
            qtdParcela,
            valorParcela,
            valorTotal,
        };

        try {
            await api.post('sales', dataC, {
                headers: {
                    Authorization: userId,//Verificando id do usuario logado
                }
            });

            history.push('/profile');

        } catch (err) {
            alert('Erro ao cadastrar venda, tente novamente.');
        } 
    }
    
    return (
        <div className="new-sale-container">
            {/*div da parte de fora com a cor cinza claro */}
            <div className="content">
                {/*Parte esquerda da página, parte escrita e botão*/}
                <section>
                    
                    <h1>Cadastrar nova venda</h1>
                    <p>Descreva a venda detalhamente para conter o valor correto de recebíveis.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041'/>
                        Voltar para home
                    </Link>

                </section>

                {/*Formulario de cadastro de vendas*/}
                <form onSubmit={handleNewSale}>
                    <input 
                        placeholder="Loja" 
                        value={loja}
                        onChange={e => setLoja(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <textarea 
                        placeholder="Data" 
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />
                    <input 
                        placeholder="Cartão" 
                        value={cartao}
                        onChange={e => setCartao(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <textarea 
                        placeholder="Venda Parcelada?" 
                        value={parcelamento}
                        onChange={e => setParcelamento(e.target.value)}
                    />
                    <input 
                        placeholder="Quantidade de Parcelas:" 
                        value={qtdParcela}
                        onChange={e => setQtdParcela(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <textarea 
                        placeholder="Valor da parcela:" 
                        value={valorParcela}
                        onChange={e => setValorParcela(e.target.value)}
                    />
                    <input 
                        placeholder="Valor Total:" 
                        value={valorTotal}
                        onChange={e => setValorTotal(e.target.value)}
                    />

                    {/*Botão de cadastrar*/}
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}