import {useCallback, useContext, useEffect, useState} from "react";
import {fetchNextPage, resetMovies} from "./moviesSlice";
import MovieCard from "./MovieCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Container, Grid, LinearProgress, Typography} from "@mui/material";
import {anonymousUser, AuthContext} from "../../AuthContext";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver";
import {MoviesFilter, Filters} from "./MoviesFilter";

function Movies(){
    const [filters, setFilters] = useState<Filters>();
    const dispatch = useAppDispatch()
    const movies = useAppSelector((state) => state.movies.top)
    const loading = useAppSelector((state) => state.movies.loading)
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages)
    const { user} = useContext(AuthContext)
    const loggedIn = user !== anonymousUser

    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        dispatch(resetMovies())
    }, [dispatch]);

    useEffect(() => {
        if(entry?.isIntersecting && hasMorePages){
            const moviesFilters = filters
                ? {
                 keywords: filters.keywords.map(k => k.id),
                 genres: filters?.genres,
                }
                : undefined

            dispatch(fetchNextPage(moviesFilters));
        }
    },[dispatch, entry?.isIntersecting, filters, hasMorePages])

    const handleAddFavorite = useCallback((id: number) => {
        alert(`Not implemented! Action: ${user.name} is adding movie ${id} to favorites.`)
    }, [user.name])

    return(
        <Grid container spacing={2} sx={{flexWrap:"nowrap"}}>
            <Grid item xs="auto">
                <MoviesFilter onApply={(f) => {
                    dispatch(resetMovies())
                    setFilters(f)
                }}/>
            </Grid>
            <Grid item xs={12}>
        <Container sx={{py: 8}} maxWidth='lg'>
            <Grid container spacing={4}>
                {movies.map((m, i) => (
                    <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                        <MovieCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            overview={m.overview}
                            popularity={m.popularity}
                            image={m.image}
                            enableUserActions={loggedIn}
                            onAddFavorite={handleAddFavorite}
                        />
                    </Grid>
                ))}
            </Grid>
            <div ref={targetRef}>
                {loading && <LinearProgress color="secondary" sx={{mt: 3}}/>}
            </div>
        </Container>
         </Grid>
        </Grid>
    )
}

export default Movies;