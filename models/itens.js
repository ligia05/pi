module.exports = (sequelize, DataTypes)=>{

  return sequelize.define(
      "itens", // Nome do model
      {
          id_itens: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
          },
         modelo: {
              type: DataTypes.STRING,
              allowNull: false
          },
          marca: {
              type: DataTypes.STRING,
              allowNull: false
          },
          

          tipo: {
              type: DataTypes.STRING,
              allowNull: false
          },
        preco:{
              type: DataTypes.DECIMAL,
              allowNull: true
          },
          imagem:{
            type: DataTypes.STRING,
            allowNull: true
        }
      },
      {
          tableName: "itens",
          timestamps: false,
          modelName: 'itens'


      }
  );

}