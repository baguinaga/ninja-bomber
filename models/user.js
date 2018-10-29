module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define("user", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    firstname: { type: Sequelize.STRING, notEmpty: true },
    lastname: { type: Sequelize.STRING, notEmpty: true },
    username: { type: Sequelize.TEXT },
    about: { type: Sequelize.TEXT },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    password: { type: Sequelize.STRING, allowNull: false },
    lastlogin: { type: Sequelize.DATE },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  // User.associate = function(models) {
  //   user.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};
