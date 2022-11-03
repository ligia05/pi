const sequelize =require('sequelize');
const config = {
    username: "root",
    password: "",
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    database: "pro_tabela"

}
const conexao = new sequelize(config);
let promise = conexao.query("SELECT * FROM pro_tabela");

promise.then(
    pro_tabela => (console.log(pro_tabela))
)


console.log(promise);