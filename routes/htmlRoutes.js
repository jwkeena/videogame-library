var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json("welcome to the Virtual Backlog");
      // res.sendFile(path.join(__dirname, "FILE.html"));
      });
    });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json("test example");
      // res.sendFile(path.join(__dirname, "FILE.html"));
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.json("error")
  });
};
