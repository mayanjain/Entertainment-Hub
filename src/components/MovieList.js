import { useState, useEffect } from 'react';
import Movie from './Movie';

const api_key = "7eb1a17d2b38f4ec6ed5b4d7bf763df4"
const popular = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`
const popularTv = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${api_key}&page=1`
const search_api_Tv = `https://api.themoviedb.org/3/search/tv?&api_key=${api_key}&query=`
const img_path = "https://image.tmdb.org/t/p/w500"
const popular_anime = "https://api.jikan.moe/v3/top/anime"
const search_api_anime = "https://api.jikan.moe/v3/search/anime?q="

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [curPage, setCurPage] = useState("movie");

  const getMovies = async (API) => {
    // console.log(API);
    if(API===popular_anime){
      const response = await fetch(API);
      let animeResponse = await response.json();
      let allAnime = await animeResponse.top;
      setMovies(allAnime.slice(0,20));
      console.log(allAnime);
      return ;
    }
    const response = await fetch(API);
    let moviesResponse = await response.json();
    let allMovies = await moviesResponse.results;
    setMovies(allMovies.slice(0,20));
  }

  useEffect(() => {
    getMovies(popular);
  }, [])

  const updatePageMovie = (e) =>{
    if(curPage==="movie")return;
    let tvBtn=document.getElementById('tvBtn');
    let animeBtn=document.getElementById('animeBtn');
    tvBtn.style.color='white';
    animeBtn.style.color='white';
    let movieBtn=document.getElementById('movieBtn');
    movieBtn.style.color='#ff3737';
    setCurPage("movie");
    getMovies(popular);
  }
  
  const updatePageTv = () =>{
    if(curPage==="tv")return;
    let movieBtn=document.getElementById('movieBtn');
    let animeBtn=document.getElementById('animeBtn');
    movieBtn.style.color='white';
    animeBtn.style.color='white';
    let tvBtn=document.getElementById('tvBtn');
    tvBtn.style.color='#ff3737';
    setCurPage("tv");
    getMovies(popularTv);
  }

  const updatePageAnime = () =>{
    if(curPage==="anime")return;
    let movieBtn=document.getElementById('movieBtn');
    let tvBtn=document.getElementById('tvBtn');
    movieBtn.style.color='white';
    tvBtn.style.color='white';
    let animeBtn=document.getElementById('animeBtn');
    animeBtn.style.color='#ff3737';
    setCurPage("anime");
    getMovies(popular_anime);
  }

  const searchMovie = (e) => {
    e.preventDefault();
    if(curPage==="movie")getMovies(search_api + searchTerm);
    else if(curPage==="tv") getMovies(search_api_Tv+searchTerm);
    else getMovies(search_api_anime+searchTerm+"&page1");
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
          <h2 id="animeBtn" onClick={()=>{updatePageAnime()}}>Anime</h2>
        </div>
        <form onSubmit={searchMovie}>
          <input type="search" name="search" id="search" placeholder='Search...' value={searchTerm} onChange={onChangeHandle} />
        </form>
      </header>
      <div className="movie-container">
        {
          movies.map((movie) => (
            <Movie key={movie.title} {...movie} curPage={curPage} />
          ))
        }
      </div>
    </>
  );
}

export default MovieList;
