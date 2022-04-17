import './Movie.css'
const img_path = "https://image.tmdb.org/t/p/w1280"

const Movie = (props) => {
    const curPage=props.curPage;
    let title,vote_average,poster_path;
    if(curPage=="tv"){
        title=props.name;
    }
    else title=props.title;
    if(curPage=="anime"){
        poster_path=props.image_url;
        vote_average=props.score;
    }
    else{
        poster_path=img_path+props.poster_path;
        vote_average=props.vote_average;
    }
    const overview=props.overview;
    return (
        <div className="movie">
            <img src={poster_path} alt={title} />
            <div className="movie-info">
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