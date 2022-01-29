var movieFormEl = $("#movieForm");
var hassanEl = $("#hassan");
var movieTitleEl = $("#movieTitle");

var mainSectionEl = $("#mainSection");

var API_KEY = "d4b4aa40";

function getMovieByTitle(title) {
  // http://www.omdbapi.com/?apikey=d4b4aa40&t=blade%20runner&type=movie
  return fetch(
    "http://www.omdbapi.com/?apikey=" + API_KEY + "&t=" + title + "&type=movie"
  ).then(function (res) {
    return res.json();
  });
}

function handleNoMoviesFound(title) {
  var div = $(
    '<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>'
  );
  var strong = $(
    "<strong>We didn't find any movies with the title of " + title + "</strong>"
  );
  var button = $(
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
  );

  div.append(strong);
  div.append(button);

  mainSectionEl.append(div);
}

function renderRatingSlide(rating, active) {
  var carouselSlideDiv = $(
    '<div class="carousel-item"><div class="container"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' +
      rating.Source +
      '</span></h5><p class="card-text">' +
      rating.Value +
      "</p></div></div></div></div>"
  );

  if (active) {
    carouselSlideDiv.addClass("active");
  }

  return carouselSlideDiv;
}

function renderRatingsCarousel(ratings) {
  var ratingsSlideOne = renderRatingSlide(ratings[0], true);
  var ratingsSlideTwo = renderRatingSlide(ratings[1], false);
  var ratingsSlideThree = renderRatingSlide(ratings[2], false);

  var carouselDiv = $(
    '<div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel"><button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>'
  );

  var carouselInnerDiv = $('<div class="carousel-inner"></div>');

  carouselInnerDiv.append(ratingsSlideOne);
  carouselInnerDiv.append(ratingsSlideTwo);
  carouselInnerDiv.append(ratingsSlideThree);

  carouselDiv.append(carouselInnerDiv);

  return carouselDiv;
}

function renderMovieDetails(movie) {
  var title = movie.Title;
  var released = movie.Released;
  var poster = movie.Poster;
  var plot = movie.Plot;
  var ratings = movie.Ratings;

  mainSectionEl.empty();

  var movieDetailsCard = $(
    '<div class="card" style="width: 18rem;"> <img src=' +
      poster +
      'class="card-img-top"><div class="card-body"><h5 class="card-title">' +
      title +
      " - " +
      "<span>" +
      released +
      '</span></h5><p class="card-text">' +
      plot +
      "</p></div></div>"
  );
  var ratingsCarousel = renderRatingsCarousel(ratings);

  movieDetailsCard.append(ratingsCarousel);

  mainSectionEl.append(movieDetailsCard);
}

movieFormEl.on("submit", function (event) {
  event.preventDefault();

  var movieTitle = movieTitleEl.val();

  getMovieByTitle(movieTitle).then(function (data) {
    if (data.Error) {
      // No movie with that title was found
      handleNoMoviesFound(movieTitle);
    } else {
      // A movie was found
      renderMovieDetails(data);
    }
  });
});
