import {createApi} from "@reduxjs/toolkit/query/react";
import {graphqlRequestBaseQuery} from "@rtk-query/graphql-request-base-query";
import {gql} from "graphql-request";

interface MoviesState {
    results: Movie[];
}

interface Movie {
    title: string;
    director:string
    releaseDate: string;
    speciesConnection: {
        species: Specie[]
    }
}
interface Specie {
    name:string;
    classification:string;
}

interface MovieResponse {
    allFilms: {
        films: Movie[]
    }
}

export const starWarsApi = createApi({
    reducerPath: "starWarsApi",
    baseQuery: graphqlRequestBaseQuery({
        url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    }),
    endpoints: (builder) => ({
        getMoviesStarWars: builder.query<MoviesState, void>({
            query: () => ({
                document: gql`
                  query {allFilms {
                      films {
                        title
                        director
                        releaseDate
                        speciesConnection {
                          species {
                            name
                            classification
                            homeworld {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                `,
            }),
            transformResponse(response: MovieResponse) {
                return {results: response.allFilms.films}
            }
        }),
    }),
});

export const {useGetMoviesStarWarsQuery} = starWarsApi
