//Exemplo de teste unitário
const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');//Vai gerar 4 bits de catacteres aleatórios, e irá converter estes caracteres em uma String do tipo hexadecimal
}