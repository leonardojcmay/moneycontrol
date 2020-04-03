//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {

    //Listar casos especificos de uma ONG
    async index(request, response) {
        //Acessando os dados da ong que esta logada
        const user_id = request.headers.authorization;

        //Buscar todos os incidentes que foi a ong que esta logada que criou
        const sales = await connection('sales')
            .where('user_id', user_id)
            .select('*');//Buscando todos os incidentes
        
        return response.json(sales);

    }
}