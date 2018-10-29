module.exports = (sequelize, Sequelize) => {
  var Scores = sequelize.define("scores", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  Scores.associate = function(models) {
    Scores.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    Scores.belongsTo(models.games, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Scores;
};
