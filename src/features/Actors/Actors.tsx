import {CardMedia, Container, LinearProgress, Link, Typography} from "@mui/material";
import {useGetCharactersQuery, useGetConfigurationQuery, useGetMovieQuery} from "../../services/tmdb";
import {Link as RouterLink, useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import anonymousImage from "../../assets/img/anonymous.png"
export default function Actors() {
    const { id }= useParams();
    const { data: configuration } = useGetConfigurationQuery()
    const { data: movie, isFetching } = useGetMovieQuery(Number(id));
    const { data: characters} = useGetCharactersQuery(Number(id))

    function formatImageUrl(path?: string) {
        return path && configuration ? `${configuration?.images.base_url}w780${path}` : "/anonymous.png"
    }

    return (
        <Container>
            {isFetching && <LinearProgress/>}
            <Container sx={{m:5, display:'flex', gap:2}}>
                <CardMedia
                    component="img"
                    src={formatImageUrl(movie?.poster_path)}
                    sx={{width:100, height:150}}
                />
                <Container>
                    <Typography variant="h3" sx={{fontWeight:'bold', fontSize: 20}}>{movie?.title}</Typography>
                    <Typography variant="h3" sx={{fontWeight:'bold', fontSize: 20}}>({movie?.release_date.slice(0,4)})</Typography>
                    <Link
                        to={`/movies/${id}`}
                        component={RouterLink}
                        color="inherit"
                        variant="h3"
                        sx={{fontSize:20, alignItems:'center', display:'flex'}}
                    >
                        <ArrowBack/>
                        Back to movie
                    </Link>
                </Container>
            </Container>
            <Container sx={{display:'flex', justifyContent:'space-between'}}>
                <Container>
                    {characters?.cast.map(character => (
                        <Link
                            to={`/person/${character.name}`}
                            component={RouterLink}
                            color="inherit"
                            variant="h3"
                            key={character.id}
                        >
                            <Container key={character.id} sx={{display:'flex',  alignItems:'center'}}>
                                <CardMedia
                                    component="img"
                                    src={formatImageUrl(character.profile_path) || anonymousImage}
                                    sx={{width:80, height:80, borderRadius: 5, mr:2, mb:2}}
                                />
                                <Container>
                                    <Typography sx={{fontWeight:'bold'}}>{character.name}</Typography>
                                    <Typography>{character.character}</Typography>
                                </Container>
                            </Container>
                        </Link>
                    ))}
                </Container>
                <Container>
                    {characters?.crew.map(character => (
                        <Link
                            to={`/person/${character.name}`}
                            component={RouterLink}
                            color="inherit"
                            variant="h3"
                            key={character.id}
                        >
                            <Container key={character.id} sx={{display:'flex',  alignItems:'center'}}>
                                <CardMedia
                                    component="img"
                                    src={formatImageUrl(character.profile_path)}
                                    sx={{width:80, height:80, borderRadius: 5, mr:2, mb:2}}
                                />
                                <Container>
                                    <Typography sx={{fontWeight:'bold'}}>{character.name}</Typography>
                                    <Typography>{character.job}</Typography>
                                </Container>
                        </Container>
                        </Link>
                    ))}
                </Container>
            </Container>
        </Container>
    )
}