import {Movie} from "../reducers/movies";
import {connect} from "react-redux";
import {RootState} from "../store";
interface MoviesProps{
    movies: Movie[]
}

function Movies({ movies}: MoviesProps){
    return(
        <div>
            <ul>
                {movies.map(m => (
                    <li key={m.id}>
                        <div>{m.title}</div>
                        <div>{m.overview}</div>
                        <div>{m.popularity}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateTopProps = (state: RootState) => ({
    movies: state.movies.top
});

const connector = connect(mapStateTopProps)

export default connector(Movies)