var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Game.findAll({}).then(function(dbGames) {
      res.json(dbGames);
      res.sendFile(path.join(__dirname, "index.html"));
      });
    });


    app.get("/shelf", function(req, res) {
      db.Game.findAll({}).then(function(dbGames) {
        res.json(dbGames);
        res.sendFile(path.join(__dirname, "bookshelf.html"));
        });
      });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Game.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json("test example");
      // res.sendFile(path.join(__dirname, "FILE.html"));
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.json("error")
  });
};
