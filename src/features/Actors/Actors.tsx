import {CardMedia, Container, Typography} from "@mui/material";
import {useGetCharactersQuery, useGetConfigurationQuery} from "../../services/tmdb";
import {useParams} from "react-router-dom";

export default function Actors() {
    const { id }= useParams();
    const { data: configuration } = useGetConfigurationQuery()
    const { data: characters, isFetching: charactersLoading} = useGetCharactersQuery(Number(id))

    function formatImageUrl(path?: string) {
        return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined
    }

    return (
        <Container sx={{display:'flex', justifyContent:'space-between'}}>
            <Container>
                {characters?.cast.map(character => (
                    <Container key={character.id} sx={{display:'flex',  alignItems:'center'}}>
                        <CardMedia
                            component="img"
                            src={formatImageUrl(character.profile_path)}
                            sx={{width:80, height:80, borderRadius: 5, mr:2, mb:2}}
                        />
                        <Container>
                            <Typography sx={{fontWeight:'bold'}}>{character.name}</Typography>
                            <Typography>{character.character}</Typography>
                        </Container>
                    </Container>
                ))}
            </Container>
            <Container>
                {characters?.crew.map(character => (
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
                ))}
            </Container>
        </Container>
    )
}