const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.render("index", {
        msg: "Welcome!",
        examples: users
      });
    });
  });

  // Load user profile page by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(users) {
      res.render("example", {
        example: users
      });
    });
  });

  app.get("/highscores", function(req, res) {
    db.Scores.findAll({
      include: [db.user]
    }).then(function(scores) {
      res.json(scores);
      // this will be used to render the handlebars highscore page (just parse and use the json)
      // res.render("highscores", {
      //   score: scores.score,
      //   email: scores.user.email
      // });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
