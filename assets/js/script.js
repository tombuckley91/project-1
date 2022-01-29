var movieFormEl = $("#movieForm");
var hassanEl = $("#hassan");
var movieTitleEl = $("#movieTitle");

movieFormEl.on("submit", function (event) {
  event.preventDefault();

  var movieTitle = movieTitleEl.val();
});
