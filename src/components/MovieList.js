import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import Movie from './Movie';

const api_key = "7eb1a17d2b38f4ec6ed5b4d7bf763df4"
const popular = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`
const popularTv = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${api_key}&page=1`
const search_api_Tv = `https://api.themoviedb.org/3/search/tv?&api_key=${api_key}&query=`
const img_path = "https://image.tmdb.org/t/p/w500"


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [curPage, setCurPage] = useState("movie");

  const getMovies = async (API) => {
    // console.log(API);
    const response = await fetch(API);
    let moviesResponse = await response.json();
    let allMovies = await moviesResponse.results;
    setMovies(allMovies);
  }

  useEffect(() => {
    getMovies(popular);
  }, [])

  const updatePageMovie = (e) =>{
    if(curPage==="movie")return;
    let movieBtn=document.getElementById('movieBtn');
    movieBtn.style.color='#ff3737';
    let tvBtn=document.getElementById('tvBtn');
    tvBtn.style.color='white';
    setCurPage("movie");
    getMovies(popular);
  }
  
  const updatePageTv = () =>{
    if(curPage==="tv")return;
    let movieBtn=document.getElementById('movieBtn');
    movieBtn.style.color='white';
    let tvBtn=document.getElementById('tvBtn');
    tvBtn.style.color='#ff3737';
    setCurPage("tv");
    getMovies(popularTv);
  }

  const searchMovie = (e) => {
    e.preventDefault();
    if(curPage==="movie")getMovies(search_api + searchTerm);
    else getMovies(search_api_Tv+searchTerm);
  }

  const onChangeHandle = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <div className="movieTv">
          <h2 id="movieBtn"onClick={()=>{updatePageMovie()}}>Movies</h2>
          <h2 id="tvBtn" onClick={()=>{updatePageTv()}}>TV Shows</h2>
        </div>
        <form onSubmit={searchMovie}>
          <input type="search" name="search" id="search" placeholder='Search...' value={searchTerm} onChange={onChangeHandle} />
        </form>
      </header>
      <div className="movie-container">
        {
          movies.map((movie) => (
            <Movie key={movie.id} {...movie} curPage={curPage} />
          ))
        }
      </div>
    </>
  );
}

export default MovieList;
