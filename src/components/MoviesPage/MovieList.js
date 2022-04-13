import { useState, useEffect } from 'react';
import Movie from './Movie';

const api_key = "7eb1a17d2b38f4ec6ed5b4d7bf763df4"
const popular = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`
const img_path = "https://image.tmdb.org/t/p/w500"
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async (API) => {
    console.log(API);
    const response = await fetch(API);
    let moviesResponse = await response.json();
    let allMovies = await moviesResponse.results;
    setMovies(allMovies);
  }

  useEffect(() => {
    getMovies(popular);
  }, [])

  const searchMovie = (e) => {
    e.preventDefault();
    getMovies(search_api + searchTerm);
  }

  const onChangeHandle = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={searchMovie}>
          <input type="search" name="search" id="search" placeholder='Search...' value={searchTerm} onChange={onChangeHandle} />
        </form>
      </header>
      <div className="movie-container">
        {
          movies.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))
        }
      </div>
    </>
  );
}

export default MovieList;
