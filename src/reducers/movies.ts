import {Action, Reducer} from "redux";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string
}

interface MovieState {
    top: Movie[]
}

const initialState: MovieState = {
    top:[
        {id: 1, title:'Spider Man', popularity: 98, overview: "Dreams..."},
        {id: 2, title:'Hello Man2', popularity: 58, overview: "Dreams2..."},
        {id: 3, title:'Fly Man3', popularity: 68, overview: "Dreams3..."}
    ]
}
const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
    return initialState;
}

export default moviesReducer;