const mysql = require("mysql");

//make connection
if (process.env.JAWSDB_URL){
 connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
 connection = mysql.createConnection({
   port: 3300,
   host: "localhost",
   user: "root",
   password: "",
   database: "game_library"
 })
}

// create connection
connection.connect(function(err) {
    if (err) {
        console.error("error connection: " + err.stack);
        return
    }
    console.log(`Connected as ID: ${connection.threadId}`);
});

module.exports = connection;