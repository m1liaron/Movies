import {ActionWidthPayload, createReducer} from "../redux/utils";
import {AppThunk} from "../store";
import {client} from "../api/tmdb";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
}

interface MovieState {
    top: Movie[];
    loading: boolean;
}

const initialState: MovieState = {
    top:[],
    loading: false
}

const moviesLoaded = (movies: Movie[]) => ({
    type: "movies/loaded",
    payload: movies,
})

const moviesLoading = () => ({
    type: "movies/loading"
})

export function fetchMovies(): AppThunk<Promise<void>> {
    return async (dispatch, getState)  => {
        dispatch(moviesLoading());


        const configuration = await client.getConfiguration();
        const imageUrl = configuration.images.base_url;
        const results = await client.getNowPlaying();

        const mappedResults: Movie[] = results.map((m) => ({
            id: m.id,
            title: m.title,
            overview: m.overview,
            popularity: m.popularity,
            image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined
        }))

        dispatch(moviesLoaded(mappedResults))
    }
}

export const moviesReducer = createReducer<MovieState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWidthPayload<Movie[]>) => {
            return {
                ...state,
                top: action.payload,
                loading: false
            };
        },
        "movies/loading": (state, action) => {
            return {
                ...state,
                loading:true
            }
        }
    }
)
