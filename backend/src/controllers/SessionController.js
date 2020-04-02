//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {
    //Login
    async create(request, response) {
        //Verificar se realmente o usuario existe
        const { id } = request.body;//Buscando o id atraves do corpo da requisição

        //Buscar usuario do banco de dados
        const user = await connection('users')
            .where('id', id)//Verificando se o id tem cadastrado
            .select('name')//Retorna somente o nome do usuario para o front-end
            .first();//Método first retornando apenas um unico usuario, pois esta buscando pelo id

        //Caso a usuario não existir
        if (!user) {
            return response.status(400).json({ error: 'No USER found with this ID' });
        }

        //Se tudo der certo, irá retornar os dados da ong
        return response.json(ong);
    }
}