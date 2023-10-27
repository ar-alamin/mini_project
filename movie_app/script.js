const inputBox = document.querySelector(".input-box");
const search_form = document.querySelector("form");
const movie_container = document.querySelector(".movie-container");

// function to show movie data on screen
function showMovie(data) {
  movie_container.innerHTML = "";

  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `
  <h2>${Title}</h2>
  <p><strong>Rating: &#11088</strong>${imdbRating}</p>
  `;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `
    <p><strong>Released Date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Cast: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>
  `;

  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `
    <img src="${Poster}" />
  `;

  movie_container.appendChild(moviePosterElement);
  movie_container.appendChild(movieElement);
}

// function to fetch api
async function getMovieInfo(movie) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=e7a2ad04&t=${movie}`
  );
  const data = await response.json();

  showMovie(data);
}

// add event listener to search form
search_form.addEventListener("submit", function (e) {
  e.preventDefault();
  const movieName = inputBox.value.trim();

  if (movieName !== "") {
    getMovieInfo(movieName);
  } else {
    movie_container.innerHTML = `
      <h2>Enter movie name to get information</h2>
    `;
  }
});
