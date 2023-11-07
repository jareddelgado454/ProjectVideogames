const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id :{
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull : false,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description : {
      type : DataTypes.TEXT,
      allowNull : false
    },
    platforms : {
      type : DataTypes.STRING,
      allowNull : false
    },
    released : {
      type : DataTypes.STRING,
      allowNull : false
    },
    background_image : {
      type : DataTypes.TEXT,
      allowNull : false,
      validate: {
        isURL: {
          args: true,
          msg: "Invalid URL format for background image",
        }
      }
    },
    rating : {
      type : DataTypes.FLOAT,
      allowNull : false
    }, 
    created : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    }
  },{
    timestamps : false
  });
};
