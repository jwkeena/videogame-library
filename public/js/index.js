// Controls add-game-modal via the pill in the header
function openGameModal() {
  document.getElementById("game-modal-button").click();
}

function giantBombApiCall(gameName) {
  return new Promise(resolve => {
    let giantBombURL;
    console.log("game to be searched: " + gameName);
    giantBombURL = "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search?api_key=0f5a567565f80ed0d9a43e0862315a17c315dc22&format=json&query=" + gameName + "&resources=game&limit=5"
    $.ajax({
      url: giantBombURL,
      method: "GET"
    }).then(function (response) {
      console.log(response.results);
      printResultsInTestDiv(response);
      resolve(response.results);
    });
  });
};

function printResultsInTestDiv(response) {
  $("#results").empty();
  let newGame = {};
  for (let i = 0; i < response.results.length; i++) {

    // Restricting search to first result
    let res = response.results[i];

    // Grabbing info from GB API to show user
    let title = res.name;
    let system_type = res.platforms;
    let year_released = res.expected_release_year;

    // Grabbing info from GB API to store tacitly in database
    let api_url = res.api_detail_url;
    let giant_bomb_ID = res.guid;
    let box_art = res.image.medium_url;
    let description = res.deck;

    // Putting in some necessary defaults
    let is_physical = true;
    let is_beaten = false;

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

    let p = $("<p>");
    p.attr("data-api-url", api_url);
    p.text(JSON.stringify(newGame, null, 2));
    p.addClass("newgame");
    $("#results").append(p);
  };
};

let searchResults = [];

function processSearch(response) {
  console.log(response);
  
  // Extract relevant information from giant bomb api
  for (let i = 0; i < response.length; i++) {
    let res = response[i];
    let title = res.name;
    let year_released = res.expected_release_year;
    let api_url = res.api_detail_url;
    let box_art = res.image.medium_url;
    let description = res.deck;
    let giant_bomb_ID = res.guid;
    
    let newGame = {
      title,
      year_released,
      api_url,
      box_art,
      description,
      giant_bomb_ID
    }
    
    let possiblePlatforms = [];
    for (let j = 0; j < res.platforms.length; j++) {
      possiblePlatforms.push(res.platforms[j].name);
    }
    newGame.possiblePlatforms = possiblePlatforms;
    searchResults.push(newGame);
  }
  console.log(searchResults);

  // Print the results to the modal table

  // EMPTY TABLE!!

  for (let i=0; i<searchResults.length; i++) {

   let tr = $("<tr>");
   
   let th = $("<th>");
   th.attr("scope", "row");
   th.text(i + 1);
   tr.append(th);

   let td1 = $("<td>");
   let img = $("<img>");
   img.attr("src", searchResults[i].box_art);
   img.css("height", "100px");
   td1.append(img);
   tr.append(td1);

   let td2 = $("<td>");
   td2.text(searchResults[i].title);
   tr.append(td2);

   let td3 = $("<td>");
   let button = $("<button>");
   button.addClass("btn btn-primary btn-sm");
   button.text("select");
   td3.append(button);
   tr.append(td3);

   $("#main-results table tbody").append(tr);
   

  }

  // Print the possible consoles to the modal
}

async function giantBombThenProcessSearch(gameName) {
  const response = await giantBombApiCall(gameName);
  processSearch(response);
}

// Event listeners for main search button
$("#main-search-button").on("click", function () {
  let gameName = $("#title").val().trim();
  $("#title").val("");
  giantBombThenProcessSearch(gameName);
});

document.getElementById("title").onkeydown = function (e) {
  if (e.keyCode == 13) {
    let gameName = $("#title").val().trim();
    $("#title").val("");
    giantBombThenProcessSearch(gameName);
  }
};

// Event listener for test search button
$("#test-search-button").on("click", function () {
  let gameName = $("#search").val().trim();
  giantBombApiCall(gameName);
});

// Validates numbers entered into barcode scanner
function isNumber(evt) {
  var iKeyCode = (evt.which) ? evt.which : evt.keyCode
  if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
    return false;

  return true;
};

// Grabs typed barcode if manually typed
let barcode;
$("#scanner_input").on("keyup", function () {
  let number = $(this).val();

  if (number.length < 10) {
    console.log("input isn't long enough to be a barcode");
    barcode = undefined;
  } else if (number.length > 13) {
    console.log("input is too long to be a barcode");
    barcode = undefined;
  } else {
    if (number !== barcode) {
      barcode = number;
      console.log(barcode);
    }
  }
});

// Event listener for searching barcode api
$("#search-barcode").on("click", function () {
  if (!barcode) {
    console.log("there is no barcode to search")
  } else {
    console.log("barcode to be searched ", barcode);
    barcodeThenGiantBomb(barcode);
  }
})

function searchBarcodeApi(barcode) {
  return new Promise(resolve => {
    let queryURL = "https://cors-anywhere.herokuapp.com/https://api.upcitemdb.com/prod/trial/lookup?upc=" + barcode
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      resolve(response);
    });
  });
};

async function barcodeThenGiantBomb(barcode) {
  const response = await searchBarcodeApi(barcode);
  gameName = response.items[0].title;
  giantBombApiCall(gameName);
}

// Get references to page elements
let newGame = {};
$(document.body).on("click", ".newgame", function () {

  let giantBombURL = $(this).attr("data-api-url");
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/" + giantBombURL + "?api_key=0f5a567565f80ed0d9a43e0862315a17c315dc22&format=json",
    method: "GET"
  }).then(function (response) {

    let res = response.results;
    let title = res.name;
    let system_type = res.platforms[0].name; // Restricts platform to first option
    let year_released = res.expected_release_year;
    let api_url = res.api_detail_url;
    let giant_bomb_ID = res.guid;
    let box_art = res.image.medium_url;
    let description = res.deck;
    let is_physical = true;
    let is_beaten = false;

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

    $.ajax("/api/games", {
      type: "POST",
      data: newGame
    }).then(
      function () {
        console.log("New game sent to database");
      }
    );
  });
});

// Event listener for test display of database
$("#library-button").on("click", function () {

  $("#database-display").empty();
  $.ajax({
    url: "/api/games",
    type: 'GET',
    success: function (res) {

      for (let i = 0; i < res.length; i++) {
        let p = $("<p>");
        p.attr("data-giant-bomb-id", res[i].giant_bomb_ID);
        p.text(JSON.stringify(res[i], null, 2));
        p.addClass("delete")
        $("#database-display").append(p);
      }
      console.log(res);
    }
  });

  $(document.body).on("click", ".delete", function () {
    let id = $(this).attr("data-giant-bomb-id");
    $.ajax({
      url: "/api/games/" + id,
      type: 'DELETE',
      success: function (res) {
        console.log("Game deleted from database")
        document.getElementById("library-button").click();
      }
    });
  });

});