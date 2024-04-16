import {useGetMoviesStarWarsQuery} from "../../services/starWars";
import {Container, Typography} from "@mui/material";

export function StarWars() {
    const {data} = useGetMoviesStarWarsQuery()

    console.log(data)
    return (
        <Container>
            {data?.results.map((movie, index) => (
                <Container key={index}>
                    <Typography variant="h5">{movie.title}</Typography>
                    <Typography variant="body1">Director: {movie.director}</Typography>
                    <Typography variant="body1">Release Date: {movie.releaseDate}</Typography>
                    <Typography variant="body1">Species:</Typography>
                    <ul>
                        {movie.speciesConnection.species.map((specie, specieIndex) => (
                            <li key={specieIndex}>
                                <Typography variant="body2">{specie.name}</Typography>
                                <Typography variant="body2">Classification: {specie.classification}</Typography>
                            </li>
                        ))}
                    </ul>
                </Container>
            ))}
        </Container>
    );
}

