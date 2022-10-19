const sequelize =require('sequelize');
const config = {
    username: "root",
    password: "",
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    database: "projeto"

}
const conexao = new sequelize(config);
let promise = conexao.query("SELECT * FROM produtos");

promise.then(
    produtos => (console.log(produtos))
)


console.log(promise);