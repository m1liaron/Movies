import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";

interface Configuration{
    images:{
        base_url: string;
    };
}

interface MovieDetails {
    backdrop_path?: string;
    homepage: string;
    id: number;
    overview: string;
    popularity: number;
    poster_path?: string;
    title: string;
    genres: Genre[];
    release_date: string;
    production_companies: Company[];
    production_countries: Country[];
}

interface CharacterDetails {
    id:number;
    known_for_department: string;
    name:string;
    profile_path:string;
    character:string;
}

interface Crew {
    id: number;
    job: string;
    name:string;
    profile_path:string;
}

interface Characters {
    cast: CharacterDetails[];
    crew: Crew[]
}

interface Person{
    name:string;
    profile_path: string;
    known_for: MovieDetails[];
    known_for_department: string;
    gender:number;
}

interface PersonDetails{
    also_known_as: string[];
    biography: string;
    birthday:string;
    deathday: number;
    place_of_birth:string;
}

export interface Company {
    id: number;
    name:string;
    logo_path:string;
    origin_country: string;
}

interface Country {
    iso_3166_1: string
    name: string
}

interface MoviesState {
    results: MovieDetails[];
    lastPage: number;
    hasMorePages: boolean;
}

export interface MoviesFilters {
    keywords?: number[];
    genres?: number[];
    year?: number[];
    country?: string;
    companies?:number[];
}

export interface MoviesQuery {
    page: number;
    filters: MoviesFilters;
}

export interface KeyWordItem {
    id: number;
    name: string;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
    total_pages: number;
}

interface Genre {
    id: number,
    name: string
}

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${configuration.apiUrl}/3`,
        prepareHeaders(headers){
            headers.set("Accept", "application/json");
            headers.set("Authorization", `Bearer ${configuration.apiToken}`);
        }
    }),
    endpoints: builder => ({
        getConfiguration: builder.query<Configuration,  void>({
            query: () => "/configuration"
        }),
        getMovies: builder.query<MoviesState, MoviesQuery>({
            query(moviesQuery) {
                const params = new URLSearchParams({
                    page: moviesQuery.page.toString()
                });

                if(moviesQuery.filters.keywords?.length){
                    params.append("with_keywords", moviesQuery.filters.keywords.join("|"))
                }

                if(moviesQuery.filters.genres?.length){
                    params.append("with_genres", moviesQuery.filters.genres.join(","));
                }

                console.log(moviesQuery.filters)
                if(moviesQuery.filters.companies?.length){
                    params.append("with_companies", moviesQuery.filters.companies.join(","));
                }

                const query = params.toString();
                const path = `/discover/movie?${query}`;

                return path
            },
            transformResponse(response: PageResponse<MovieDetails>, _, arg) {
                return {
                    results: response.results,
                    lastPage: response.page,
                    hasMorePages: arg.page < response.total_pages,
                };
            },
            serializeQueryArgs({ endpointName }) {
              return endpointName;
            },
            merge(currentCacheData, responseData) {
                if(responseData.lastPage === 1){
                    currentCacheData.results = responseData.results
                } else {
                    currentCacheData.results.push(...responseData.results)
                }

                currentCacheData.lastPage = responseData.lastPage;
                currentCacheData.hasMorePages = responseData.hasMorePages;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            }
        }),
        getKeyWords: builder.query<KeyWordItem[], string>({
            query: (queryText) => `/search/keyword?query=${queryText}`,
            transformResponse: (response: PageResponse<KeyWordItem>) => response.results,
        }),
        getGenres: builder.query<Genre[], void>({
            query: () => "/genre/movie/list",
            transformResponse: (response: { genres: Genre[] }) => response.genres
        }),
        getCompanies: builder.query<Company[], string>({
            query:(companies) => `/search/company?query=${companies}`,
            transformResponse: (response: PageResponse<Company>) => response.results,
        }),
        getMovie: builder.query<MovieDetails, number>({ // number is movieId
            query: (movieId) => `/movie/${movieId}`,
        }),
        addFavorite: builder.mutation<MovieDetails, number>({
            query: (movieId) => `/account/20362953/favorite?session_id=`
        }),
        getCharacters: builder.query<Characters, number>({
            query:(movieId) => `movie/${movieId}/credits`
        }),
        getPerson: builder.query<Person[], string>({
            query:(name) => `/search/person?query=${name}`,
            transformResponse: (response: PageResponse<Person>) => response.results
        }),
        getPersonDetails: builder.query<PersonDetails, number>({
            query:(personId) => `/person/${personId}`
        })
    })
});

export const {
    useGetConfigurationQuery,
    useGetGenresQuery,
    useGetKeyWordsQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetCompaniesQuery,
    useGetCharactersQuery,
    useGetPersonQuery,
    useGetPersonDetailsQuery
} = tmdbApi