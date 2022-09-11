const fs = require('fs');
const path = require('path');

const acesso = (req, res, next) => {
    
    // Capturar a hora no formato adequado
    let dataHora = new Date();
    let strDataHora = dataHora.toISOString().substring(0,19).replace('T',' ');
    let url = req.url;
    
    // Caminho para o arquivo de log de acessos
    let arquivo = path.resolve(`./logs/${strDataHora.substring(0,10)}-acessos.txt`);

    // Registrar essa hora no arquivo acessos.txt
    fs.writeFileSync(arquivo, `${strDataHora} - ${url} \n`, {flag:'a'});

    // Seguir adiante...
    next();

}

module.exports = acesso;