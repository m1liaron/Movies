import {Movie} from "../../reducers/movies";
import {connect} from "react-redux";
import {RootState} from "../../store";
import {MovieCard} from "./MovieCard";
import styles from "./Movies.module.scss"
interface MoviesProps{
    movies: Movie[]
}

function Movies({ movies}: MoviesProps){
    return(
        <section>
            <div className={styles.list}>
            {movies.map(m => (
                <MovieCard
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    overview={m.overview}
                    popularity={m.popularity}/>
                ))}
            </div>
        </section>
    )
}

const mapStateTopProps = (state: RootState) => ({
    movies: state.movies.top
});

const connector = connect(mapStateTopProps)

export default connector(Movies)