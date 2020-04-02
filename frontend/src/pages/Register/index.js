import React, { useState } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
//Importando estilização
import './styles.css';
//Impotando imagem utilizada na página
//import logoImg from '../../assets/logo.svg';
//Importando pacote de icons
import { FiArrowLeft } from 'react-icons/fi';
//Importando conexão com banco de dados
import api from '../../services/api';

//Página register: cadastro dos usuarios
export default function Register() {
    //Armazenando os dados dos input dentro de um estado, cada input um estado
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    //Após o cadastro fazer com que volte a página de login
    const history = useHistory();

    //Conectando com o back-end
    //Função responsavel por fazer o cadastro do usuário
    async function handleRegister(e){
        //Prevenindo o comportamento padrão. Fazendo que não carregue a pagina ao clicar em cadastrar
        e.preventDefault();

        //Pegando todas informações dos inputs
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        //Enviando para API. Por padrão o axios já envia em formato JSON
        try {
            //Confirmando se o cadastro foi feito com sucesso. Utilizando o async await
            const response = await api.post('users', data);
    
            //Mensagem
            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/');

        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="register-container">
            {/*div da parte de fora com a cor cinza claro */}
            <div className="content">
                {/*Parte esquerda da página, parte escrita e botão*/}
                <section>
                    
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e controle seus recebíveis.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#737374'/>
                        Não tenho cadastro
                    </Link>

                </section>

                {/*Formulario de cadastro de usuarios*/}
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da usuario" 
                        value={name}
                        onChange={e => setName(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Whatsapp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    {/*Colocando os dois campos abaixo na mesma linha*/}
                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}    
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        /> {/*{} : para utilizar código JavaScript. {{}}: Para utilizar objetos do JavaScript*/}{/*{} : para utilizar código JavaScript. {{}}: Para utilizar objetos do JavaScript*/}
                    </div>

                    {/*Botão de cadastrar*/}
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}