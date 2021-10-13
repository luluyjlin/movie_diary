// https://api.themoviedb.org/3/movie/297762?api_key=60e6126aa1e87d24d95b517a4fc18d85

//TMDB
const API_KEY = "api_key=60e6126aa1e87d24d95b517a4fc18d85";
const BASE_URL = "https://api.themoviedb.org/3";
const USER_URL = "/account/11259766";
const SESSION_ID = "session_id=1a1497dda26a36f162459af159b2e7aeaefbf7ed";
const GENRE_URL = BASE_URL + "/genre/movie/list?" + API_KEY;
const API_URL =
  BASE_URL + USER_URL + "/rated/movies?" + API_KEY + "&" + SESSION_ID;

console.log(API_URL);

const IMG_URL = "http://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const amount = document.getElementById("amount");

let results = [];
let genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
console.log(genres);
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let totalPage = data.total_pages;
      amount.innerHTML = "- Movies I have wateched:" + data.total_results;
      for (let i = 1; i < totalPage + 1; i++) {
        fetch(url + "&page=" + i)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            results.push(...data.results);
            showMovies(results);
          });
      }
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const {
      title,
      poster_path,
      release_date,
      overview,
      rating,
      genre_ids,
      id,
    } = movie;
    const movieEl = document.createElement("div");
    const releaseDate = release_date.split("-")[0];
    const stars = starRatings(rating);
    const genres = getGenres(genre_ids);
    movieEl.classList.add("movie");

    fetch(BASE_URL + "/movie/" + id + "?" + API_KEY)
      .then((res) => res.json())
      .then((data) => {
        const tagline = data.tagline;
        movieEl.innerHTML = `
        <div class="inner"><img src="${IMG_URL + poster_path}" alt="${title}" />
        <div class="movie-info"><h3>${title}<br>(${releaseDate})</h3>
        <span class="star">${stars}</span><div class="overview"><i>${tagline}</i><br><br>${overview}</div><div class="genres-container">${genres}</div></div></div>`;
      });

    main.appendChild(movieEl);
  });
}

function starRatings(num) {
  let out = "";
  for (let i = 0; i < num / 2; i++) {
    out += "&#11088";
  }
  return out;
}

function getGenres(arr) {
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    genres.forEach((element) => {
      if (arr[i] === element["id"]) {
        const name = element["name"];
        out += `<span class="genres">${name}</span>`;
      }
    });
  }
  return out;
}
