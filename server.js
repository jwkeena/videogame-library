require("dotenv").config();
const {apiKey, jawsHost, jawsPassword, jawsUsername, jawsDatabase} = require("./config/config.js");

var express = require("express");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const routes = require("./controllers/games_controllers");

app.use(routes);

let syncOptions = { force: false };

// If developing with local database, set syncOptions.force to true
// recreating the tables each time
if (process.env.NODE_ENV == "development") {
  console.log("development")
  syncOptions = {force: true};
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
