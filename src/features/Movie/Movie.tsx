import {CardMedia, Container, LinearProgress, Typography, Link, List, ListItem} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetConfigurationQuery, useGetMovieQuery} from "../../services/tmdb";
import {Link as RouterLink} from 'react-router-dom'
import {ArrowBack} from "@mui/icons-material";

export function Movie() {
    const { id }= useParams();
    const { data: configuration } = useGetConfigurationQuery()
    const { data: movie, isFetching } = useGetMovieQuery(Number(id));

    function formatImageUrl(path?: string) {
        return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined
    }

    return (
        <Container sx={{m:0, p:0}}>
            <Link
                to={'/movies'}
                component={RouterLink}
                color="inherit"
                variant="h3"
            >
                <ArrowBack/>
            </Link>
            {movie && (
                <Container sx={{display:'flex', justifyContent:'center'}}>
                    <CardMedia
                        component="img"
                        src={formatImageUrl(movie.poster_path)}
                        alt={movie.title}
                        sx={{width:'50%', height: 500, mr:10}}
                    />
                    <Container>
                        <Link
                            component={RouterLink}
                            to={movie.homepage}
                            color="inherit"
                            target="_blank"
                            variant="h3"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {movie.title}
                        </Link>
                        <Typography>{movie.release_date}</Typography>
                        <Container sx={{ display: 'flex', flexDirection: 'row', gap: '1px', mb:2}}>
                            {movie.genres.map(genre => (
                                <ListItem key={genre.id}>
                                    <Typography variant="body1">{genre.name}</Typography>
                                </ListItem>
                            ))}
                        </Container>
                        <Typography variant="h2" sx={{ fontSize: 20 }}>{movie.overview}</Typography>
                    </Container>
                </Container>
            )}
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
        </Container>
    );
}