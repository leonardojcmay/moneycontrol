//Método up: o que você quer que seja feito
exports.up = function(knex) {
    //Criação da tabela users
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();//Limitando campo com 2 caracteres
    })
};

//Método down: caso de algum erro, precisa desfazer o que fez, deletar a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('users');
  
};