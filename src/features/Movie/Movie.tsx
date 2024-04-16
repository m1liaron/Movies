import {CardMedia, Container, LinearProgress, Typography, Link, List, ListItem, Card, Button} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetCharactersQuery, useGetConfigurationQuery, useGetMovieQuery} from "../../services/tmdb";
import {Link as RouterLink} from 'react-router-dom'
import {ArrowBack, Description} from "@mui/icons-material";
import "./Movie.scss"

export function Movie() {
    const { id }= useParams();
    const { data: configuration } = useGetConfigurationQuery()
    const { data: movie, isFetching } = useGetMovieQuery(Number(id));
    const { data: characters, isFetching: charactersLoading} = useGetCharactersQuery(Number(id))

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
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 5,
                        // backgroundImage: `url(${formatImageUrl(movie?.backdrop_path)})`, // Set background image
                        backgroundSize: 'cover', // Ensure the image covers the container
                        backgroundPosition: 'center', // Center the image within the container
                    }}
                >
                    <CardMedia
                        component="div"
                        image={formatImageUrl(movie?.backdrop_path) || '/thumbnail.png'}
                        sx={{pt: "56.25%"}}
                    />
                    <CardMedia
                        component="img"
                        src={formatImageUrl(movie.poster_path)}
                        alt={movie.title}
                        sx={{width:'50%', height: 500, mr:10}}
                    />
                    <Container sx={{p:5}}>
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
                        <Container sx={{ display: 'flex', flexDirection: 'row', gap: '1px', mb:2, flexWrap:'nowrap'}}>
                            {movie.genres.map(genre => (
                                <ListItem key={genre.id} sx={{border:'1px solid #000'}}>
                                    <Typography variant="body1">{genre.name}</Typography>
                                </ListItem>
                            ))}
                        </Container>
                        <Typography variant="h2" sx={{ fontSize: 20 }}>{movie.overview}</Typography>
                        <Container sx={{ display: 'flex', flexDirection: 'row', mb:2}}>
                            <Typography>Companies: </Typography>
                            {movie?.production_companies.map(company => (
                                    <CardMedia
                                        key={company.id}
                                        component="img"
                                        src={formatImageUrl(company.logo_path)}
                                        alt={company.name}
                                        sx={{width:'40%', height: '50%', mr:10}}
                                    />
                            ))}
                        </Container>
                        <Container>
                            {movie?.production_countries.map((country, index) => (
                                <Container key={index}>
                                    <Typography>{country.iso_3166_1}: {country.name}</Typography>
                                </Container>
                            ))}
                        </Container>
                    </Container>
                </Container>
            )}

            <Container sx={{display:'flex',  justifyContent:'center', gap:2, flexWrap:'wrap', alignItems:'center'}}>
            {characters?.cast.slice(0,6).map(character => (
                <Link
                    to={`/person/${character.id}/${character.name}`}
                    component={RouterLink}
                    color="inherit"
                    variant="h3"
                    key={character.id}
                >
                    <Card>
                        <CardMedia
                            component="img"
                            src={formatImageUrl(character?.profile_path)}
                            sx={{width:150, height:200}}
                        />
                        <Container sx={{p:0}}>
                            <Typography sx={{fontWeight:'bold'}}>{character.name}</Typography>
                            <Typography>{character.character}</Typography>
                        </Container>
                    </Card>
                </Link>
            ))}
                <Link
                    to={'cast'}
                    component={RouterLink}
                    color="inherit"
                    variant="h3"
                >
                    <Button color="inherit">View more</Button>
                </Link>
            </Container>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
        </Container>
    );
}