module.exports = (sequelize, DataTypes)=>{
let cliente =sequelize.define(
        "clientes", // Nome do model
        {
            id_cliente: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
          endereco:{
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: "cliente",
            timestamps: false
        }
    );
    return cliente


}