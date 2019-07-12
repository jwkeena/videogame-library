module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 144]
      }
    },
    system: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [4]
      }
    },
    isPhysical: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isBeaten: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    personalRating: {
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
    }
  });
  return Game;
};
