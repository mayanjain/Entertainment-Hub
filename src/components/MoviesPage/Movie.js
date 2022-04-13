import './Movie.css'
const img_path = "https://image.tmdb.org/t/p/w1280"

const Movie = ({ title, poster_path, overview, vote_average }) => {

    return (
        <div className="movie">
            <img src={img_path + poster_path} alt={title} />
            <div className="movie-info"  >
                <h4>{title}</h4>
                <div id="vote">{vote_average}</div>
            </div>
            <div className="overview">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>
        </div>
    )
}

export default Movie;