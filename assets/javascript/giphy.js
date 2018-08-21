var giphys = [];
        
function renderButtons() {
  $("#gifybtns").empty();
    for (var i = 0; i < giphys.length; i++) {
      var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);
      $("#gifybtns").append(a);
    }
}
    
function displaygifInfo() {
  var gifss = $(this).attr("data-name");
    console.log(gifss);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifss+"&api_key=QF9yKj2G4spVhiWmfa7phirSNTSmBTgC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gifview").empty();
    for(i=0;i<response.data.length;i++){
      console.log( response.data[i]);
      var p = $("<p id='rating'>").text("Rating: " + response.data[i].rating);
      var st = response.data[i].images.fixed_width_still.url;
      var am = response.data[i].images.fixed_width.url;
      var gifimg= $("<img>").attr("src", st);
      gifimg.attr("data-still", st);
      gifimg.attr("data-state", "still");
      gifimg.attr("data-animate", am);
      gifimg.addClass("gif-state");
      $("#gifview").append(p);
      $("#gifview").append(gifimg);
    }
  });
}
    
function toggleState() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};
        
$(".submit").on("click", function () {
  event.preventDefault();
  var searchstring = $("#search-string").val().trim();
    console.log(searchstring);
  giphys.push(searchstring);
  renderButtons();
  $("#search-string").val(" ");
})
       
$(document).on("click", ".gif", displaygifInfo);
$(document).on("click", ".gif-state", toggleState);