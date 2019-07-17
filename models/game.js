module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 144]
      }
    },
    system_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    year_released: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [4]
      }
    },
    is_physical: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_beaten: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    personal_rating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [1, 3],
        max: 10
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }, 
    api_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    giant_bomb_ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    box_art: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  return Game;
};
