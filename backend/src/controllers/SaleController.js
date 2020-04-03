//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {

    //Deletar uma venda
    async delete(request, response) {
        //Pegar o id que vem do request.params
        const { id } = request.params;
        //Pegar o id do usuario logado, para verificar se realmente o incidente que esta sendo deletado foi criado pelo usuario logado
        const user_id = request.headers.authorization;

        //Verificar se realmente o incidente que esta sendo deletado foi criado pelo usuario logado
        const sale = await connection('sales')
            .where('id', id)//Busca o incidente pelo id
            .select('user_id')//Seleciona apenas a coluna user_id
            .first();//Método first retorna apenas um resultado

        //Verificando se o user_id for diferente do user_id que esta logado, irá lhe retornar um erro
        if (sale.user_id != user_id) {
            return response.status(401).json( 'Operation not permitted.');//401: usuario não autorizado
        }

        //Se deu certo, irá deletar do banco de dados
        await connection('sales').where('id', id).delete();
      
        //Retornando resposta
        return response.status(204).send();//204: Quando retorna alguma responsa que não tem nenhum conteúdo para o usuario
    },

    //Listar todas as vendas do banco de dados
    async index(request, response) {

        //Fazer com que não retorne todas as vendas de uma só vez
        //Buscar de dentro do request.query
        const { page = 1 } = request.query;//parametro chamado page, caso não existir irá usar por padrão o valor de 1
        
        //Retornar o total de vendas que contem na base de dados
        const [count] = await connection('sales')
            .count();

        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        const sales = await connection('sales')
            .join('users', 'users.id', '=', 'sales.user_id')//Listar os dados das ongs nos json sales também
            .limit(5)//Limitando a busca no bando de dados para 5 registros
            .offset((page - 1) * 5)//Pular 5 registros por página, sempre pegando os próximos 5 registros
            .select([
                'sales.*',
                'users.name',
                'users.email',
                'users.whatsapp',
                'users.city',
                'users.uf'
            ]);//Mostrar no JSON todos os dados dos incidentes, porém da tabela users listar somente name, email, whatsapp, city, uf

        //Retornando o total de inicidentes no cabeçalho da responta
        response.header('X-Total-Count', count['count(*)']);//Total de vendas que contem na lista
    
        //Retornando resposta
        return response.json(sales);
    },

    //Cadastro de uma venda
    async create(request, response) {
        const { loja, data, cartao, parcelamento, qtdParcela, valorParcela, valorTotal } = request.body;

        //O Id ele cria/incrementa automaticamente

        //Precisa do id do usuario para salvar na user_id
        //Vai ser utilizado as informações do cabeçalho/header, ou seja, a ong que esta logada no sistema
        const user_id = request.headers.authorization;

        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        const [id] = await connection('sales').insert({
            loja,
            data,
            cartao,
            parcelamento,
            qtdParcela,
            valorParcela,
            valorTotal,
            user_id,
        })

        //Retornando resposta
        return response.json({ id });
    }
};