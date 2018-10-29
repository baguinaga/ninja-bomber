module.exports = (sequelize, Sequelize) => {
  var Scores = sequelize.define("scores", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    score: { type: Sequelize.INTEGER, allowNull: false }
  });

  Scores.associate = function(models) {
    Scores.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    Scores.belongsTo(models.Games, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Scores
}