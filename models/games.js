module.exports = (sequelize, Sequelize) => {
  var Games = sequelize.define("Games", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING, notEmpty: true }
  });

  Games.associate = function(models) {
    Games.hasMany(models.Scores, {
      onDelete: "cascade"
    });
  };

  return Games;
};
