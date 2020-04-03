exports.up = function(knex) {
    return knex.schema.createTable('sales', function (table) {
        table.increments();//Primary Key
        table.string('loja').notNullable();
        table.string('data').notNullable();
        table.decimal('cartao').notNullable();
        table.string('parcelamento').notNullable();
        table.string('qtdParcela').notNullable();
        table.string('valorParcela').notNullable();
        table.decimal('valorTotal').notNullable();

        
        table.string('user_id').notNullable();//Armazenar qual é o usuario que criou esta venda

        table.foreign('user_id').references('id').inTable('users');//Criar a chave estrangeira: a coluna user_id referencia a coluna id da tabela users
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};