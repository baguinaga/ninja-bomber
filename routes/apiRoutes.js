const db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(users) {
      res.json(users);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(users) {
      res.json(users);
    });
  });

  //Post user highscore
  app.post("/api/game", isLoggedIn, function(req, res) {
    console.log(req.body);
    const userData = {
      userId: req.session.passport.user,
      gameId: req.body.gameId,
      score: req.body.score
    };
    console.log(userData);
    res.json(userData);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
