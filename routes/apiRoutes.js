const db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(users) {
      res.json(users);
    });
  });

  //Post user highscore
  app.post("/api/game", isLoggedIn, function(req, res) {
    const userData = {
      userId: req.session.passport.user,
      GameId: req.body.gameId,
      score: req.body.score
    };
    console.log(userData);
    db.Games.findOrCreate({
      where: {
        name: "Bomber"
      }
    });
    db.Scores.create(userData).then(function(response) {
      res.json(response);
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
