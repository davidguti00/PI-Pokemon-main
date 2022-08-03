const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:200,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:200,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:200,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:200,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:200,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0,
        max:9999,
      }
    },
    createdInDb: { 
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
  }, {
    timestamps: false
  });
};

