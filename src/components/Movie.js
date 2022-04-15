import './Movie.css'
const img_path = "https://image.tmdb.org/t/p/w1280"

const Movie = (props) => {
    const curPage=props.curPage;
    let title;
    if(curPage=="movie"){
        title=props.title;
    }
    else title=props.name;
    const poster_path=props.poster_path;
    const vote_average=props.vote_average;
    const overview=props.overview;
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