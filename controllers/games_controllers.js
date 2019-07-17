const express = require('express');
const router = express.Router();
const showgames = require('../models/showgames');

router.get("/", function(req, res) {
    showgames.all(function(game_data) {
        console.log(game_data);
        res.render('bookshelf',
        
        
        
        
        
        
        
        
        )
    })
});

module.exports = router;