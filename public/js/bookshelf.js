
// replace with reference to database.
var games;
$( document ).ready(function() {
   $.ajax({
      url: "/api/games",
      type: 'GET',
      success: function (res) {
  
         games = res;
        console.log(res);
      }
    });
});
  
         

var game;
var front;
var cover;
var page;
var back;
var right;
var left;
var topa;
var bottom;
var counter;

function creategame(){
game;
front;
cover;
page;
back;
right;
left;
topa;
bottom;
counter = 0;


for (var i = 0; i < games.length; i++){
    game = $('<li class =' + i + '> <div class="bk-game game' + i + '"></div></li>' )
    $("#bk-list").append(game);

    front = $(`<div class="bk-front"></div>`)
    
    $(front).append(`<div class="bk-cover-back"></div>`);
    
    cover = $(`<div class="bk-cover">`)
    $(cover).append('<h2> <span>' + games[i].Title + '</span><span>'+ games[i].System_type +'</span></h2></div></div>');
    $(front).append(cover);
    
    page = $(`<div class="bk-page">`)
    $(page).append('<div class="bk-content bk-content-current"><p>' + games[i].Description + '</p></div>')
    $(page).append('<div class="bk-content "><p>' + games[i].is_Physical + " " + games[i].is_beaten + " " + games[i].personal_rating + '</p></div>')
    $(page).append('<div class="bk-content "><p>' + games[i].Notes + '</p></div></div>')
    
    back = $(`<div class="bk-back">`)
    $(back).append('</p>' + games[i].Title + " " + games[i].Description +" "+ games[i].giant_bomb_ID + '</p></div>')

    right = (`<div class="bk-right"></div>`);
    left = (`<div class="bk-left"><h2><span>` + games[i].Title + '  </span><span>'+ games[i].System_type +`</span></h2>`);
    topa = (`<div class="bk-top"></div>`);
    bottom = (`<div class="bk-bottom"></div>`);

    $(".game"+i).append(front,page,back,right,left,topa,bottom);
   counter ++;
   if (counter === 13){
    $("#bk-list").append("<div class=shelf></div>");
       counter = 0;
   }
}
}

creategame();


