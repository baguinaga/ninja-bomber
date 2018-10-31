const db = require("../models");

$(document).ready(function() {
  // Get Highscores
  $.get("/api/game/:id", function(req, res) {
    db.Scores.findAll({
      include: [db.Games, db.user],
      where: {
        GameId: req.params.id
      }
    }).then(function(gameHighScores) {
      console.log(gameHighScores);
      res.json(gameHighScores);
    });
  });
})