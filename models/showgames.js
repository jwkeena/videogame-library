const orm = require("../config/orm.js");

const showgames = {
    all: function(cb) {
        orm.selectAll('Games', function(res) {
            cb(res);
        });
    }
}

module.exports = showgames;