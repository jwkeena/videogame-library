const db = require("../models");

module.exports = function(app) {
  // Get all games in database
  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  // Add new game
  app.post("/api/games", function(req, res) {
      db.Game.create({
        title: req.body.title,
        system_type: req.body.system_type,
        year_released: req.body.year_released,
        is_physical: req.body.is_physical,
        is_beaten: req.body.is_beaten,
        personal_rating: req.body.personal_rating,
        notes: req.body.notes,
        api_url: req.body.api_url,
        giant_bomb_ID: req.body.giant_bomb_ID,
        box_art: req.body.box_art,
        description: req.body.description
      }).then(function (dbGame) {
        res.json(dbGame);
      });
  });

  // Delete a game
  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({ where: { giant_bomb_ID: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });
};
