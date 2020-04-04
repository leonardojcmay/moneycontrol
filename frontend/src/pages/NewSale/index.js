import React, { useState  } from 'react';
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

        const dataV = {
            loja,
            data,
            cartao,
            parcelamento,
            qtdParcela,
            valorParcela,
            valorTotal,
        };

        try {
            await api.post('sales', dataV, {
                headers: {
                    Authorization: userId,//Verificando id do usuario logado
                }
            });

            history.push('/profile');

        } catch (err) {
            alert('Erro ao cadastrar venda, tente novamente.');
        } 
    }

    // Função para deixar os campos de quantidade parcela e valor parcela em disabled caso não contenha parcelamento
    // Wait for the page to finish loading
    document.addEventListener('DOMContentLoaded', function () {
    // Attach `change` event listener to checkbox
        document.getElementById('billing-checkbox').onchange = toggleBilling;
    }, false);
  
    function toggleBilling() {
        // Select the billing text fields
        var billingItems = document.querySelectorAll('#billing input[type="text"]');
  
        // Toggle the billing text fields
        for (var i = 0; i < billingItems.length; i++) {
        billingItems[i].disabled = !billingItems[i].disabled;
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
                    
                    <div className="checkbox">
                        <label>Loja 1</label>
                        <input type="checkbox" value="Loja 1" style={{width:25, height:30}} onChange={e => setLoja(e.target.value)} />
                            
                        <label>Loja 2</label>
                        <input type="checkbox" value="Loja 2" style={{width:25, height:30}} onChange={e => setLoja(e.target.value)}/>
                    </div>

                    <input 
                        type="date"
                        placeholder="Data" 
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />

                    <select value={cartao} onChange={e => setCartao(e.target.value)}>
                        <option>Selecione o cartão</option>
                        <option value="Getnet-Débito">Getnet-Débito</option>
                        <option value="Getnet-Crédito">Getnet-Crédito</option>
                        <option value="Banrisul">Banrisul</option>
                    </select>

                    <fieldset id="billing">
                        <div className="checkbox">
                            <label for="billing-checkbox">Venda parcelada?</label>
                            
                            <label>Sim</label>
                            <input type="checkbox" value="Sim" style={{width:25, height:30}} onChange={e => setParcelamento(e.target.value)} id="billing-checkbox"/>
                                
                            <label>Não</label>
                            <input type="checkbox" value="Não" style={{width:25, height:30}} onChange={e => setParcelamento(e.target.value)}/>
                        </div>

                        <input 
                            disabled
                            type="text"
                            placeholder="Quantidade de parcelas" 
                            value={qtdParcela}
                            onChange={e => setQtdParcela(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                        />
                        <input 
                            disabled
                            type="text"
                            placeholder="Valor da parcela" 
                            value={valorParcela}
                            onChange={e => setValorParcela(e.target.value)}
                        />
                    </fieldset>
                    
                    <input 
                        placeholder="Valor total" 
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