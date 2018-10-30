module.exports = (sequelize, Sequelize) => {
  var Scores = sequelize.define("Scores", {
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
<<<<<<< HEAD
    })
    Scores.belongsTo(models.games, {
=======
    });
    Scores.belongsTo(models.Games, {
>>>>>>> d2b8f0a36689be0a18ac25f114647c186b890f48
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Scores;
};
