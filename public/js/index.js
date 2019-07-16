// Get references to page elements
let newGame = {};

$("#search-button").on("click", function () {
  let searchTerms = $("#search").val();
  console.log(searchTerms)

  let giantBombURL = "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search?api_key=0f5a567565f80ed0d9a43e0862315a17c315dc22&format=json&query=" + searchTerms + "&resources=game&limit=10"
  $.ajax({
    url: giantBombURL,
    method: "GET"
  }).then(function (response) {
    console.log(response.results[0]);

    // Restricting search to first result
    let res = response.results[0];

    // Grabbing info from GB API to show user
    let title = res.name;
    let system_type = res.platforms[0].name;
    let year_released = res.expected_release_year;

    // Grabbing info from GB API to store tacitly in database
    let api_url = res.api_detail_url;
    let giant_bomb_ID = res.guid;
    let box_art = res.image.medium_url;
    let description = res.deck;

    // Putting in some necessary defaults
    let is_physical = true;
    let is_beaten = true;

    newGame = {
      title,
      system_type,
      year_released,
      is_physical,
      is_beaten,
      api_url,
      giant_bomb_ID,
      box_art,
      description
    };

    console.log(newGame);
    $("#results").text(JSON.stringify(newGame, null, 2));
  });
});

$("#add-to-database").on("click", function () {
  $.ajax("/api/games", {
    type: "POST",
    data: newGame
  }).then(
    function () {
      console.log("New game sent to database");
    }
  );
});

$("#library-button").on("click", function(data) {
  $.ajax("/api/games", {
    type: "GET"
  }).then(
    console.log(data)
  )
})