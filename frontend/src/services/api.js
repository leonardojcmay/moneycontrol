//Importando pacote de conexão com banco de dados
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api; 