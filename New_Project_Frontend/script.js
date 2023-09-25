const APILINK = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTIxMDM3ODM2MjJlN2ZhMzQ1NDhlMzg2NGU1OGRlZiIsInN1YiI6IjY0Zjg4NWQ3YTg0YTQ3MDBlM2QyZTAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mRAiXS_2ylp-YwWdNcjn2vP-N3NDJ9KW_Ald8Wuo5Mc";
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&year=";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK, options)

function returnMovies(url, options) {
  fetch(url, options)
    .then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      data.results.forEach(element => {
        if (element.poster_path) { 
          const div_card = document.createElement('div');
          div_card.setAttribute('class', 'card');

          const div_column = document.createElement('div');
          div_column.setAttribute('class', 'column');

          const image = document.createElement('img');
          image.setAttribute('class', 'thumbnail');

          const title = document.createElement('h3');
          title.setAttribute('class', 'title');

          title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}</a>"`;
          image.src = IMG_PATH + element.poster_path;

          const reviewsLink = document.createElement('a');
          reviewsLink.href = `movie.html?id=${element.id}&title=${element.title}`;
          reviewsLink.textContent = 'reviews';

          div_card.appendChild(image);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_card.appendChild(reviewsLink);
          main.appendChild(div_column);
        }
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    const searchURL = `${APILINK}?query=${searchItem}&api_key=${API_KEY}`;
    returnMovies(searchURL, options);
    search.value = "";
  }
});
