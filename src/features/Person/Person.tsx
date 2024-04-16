import {Card, CardMedia, Container, Link, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import {useGetConfigurationQuery, useGetPersonDetailsQuery, useGetPersonQuery} from "../../services/tmdb";
import {formatImageUrl} from "../../utils/formatImageUrl";

export function Person() {
    const {name, id} = useParams()
    const { data: configuration } = useGetConfigurationQuery()
    const {data} = useGetPersonQuery(String(name))
    const {data: personDetails} = useGetPersonDetailsQuery(Number(id))

    const person = data || []

    console.log(personDetails)
    return (
        <Container>
           <Container sx={{display:'flex', m:2}}>
               <Container sx={{width:'30%'}}>
                   <CardMedia
                       component="img"
                       src={formatImageUrl(person[0]?.profile_path, configuration)}
                       sx={{width:300, height:450, borderRadius:'5%'}}
                   />
                   <Container sx={{p:0, mb:2}}>
                       <Typography sx={{fontWeight:'bold'}}>Known for</Typography>
                       <Typography>{person[0]?.known_for_department}</Typography>
                   </Container>
                   <Container sx={{p:0, mb:2}}>
                       <Typography sx={{fontWeight:'bold'}}>Gender</Typography>
                       <Typography>{person[0]?.gender === 1 ? "Female" : "Male"}</Typography>
                   </Container>
                   <Container sx={{p:0, mb:2}}>
                       <Typography sx={{fontWeight:'bold'}}>Birthday</Typography>
                       <Typography>{personDetails?.birthday}</Typography>
                   </Container>
                   <Container sx={{p:0, mb:2}}>
                       <Typography sx={{fontWeight:'bold'}}>Place of birth</Typography>
                       <Typography>{personDetails?.place_of_birth}</Typography>
                   </Container>
                   <Container sx={{p:0, mb:2}}>
                       <Typography sx={{fontWeight:'bold'}}>Also known as</Typography>
                       {personDetails?.also_known_as.map((name, index) => (
                           <Typography key={index}>{name}</Typography>
                       ))}
                   </Container>
                   {personDetails?.deathday && (
                       <Container sx={{p:0, mb:2}}>
                           <Typography sx={{fontWeight:'bold'}}>Death day</Typography>
                           <Typography>{personDetails?.deathday}</Typography>
                       </Container>
                   )}
               </Container>
               <Container sx={{ml:2}}>
                   <Container>
                       <Typography variant='h1' sx={{fontSize: 30, fontWeight:'bold', mb:2}}>{person[0]?.name}</Typography>
                   </Container>
                   <Container>
                       <Typography variant='h1' sx={{fontSize: 20, fontWeight:'bold'}}>Biography</Typography>
                       <Typography variant='h1' sx={{fontSize: 15}}>{personDetails?.biography}</Typography>
                   </Container>
                   <Typography>Known for</Typography>
                   <Container sx={{mt:2, display:'flex'}}>
                       {person[0]?.known_for.map(movie => (
                           <Link
                               to={`/movies/${movie.id}`}
                               component={RouterLink}
                               color="inherit"
                               key={movie.id}
                           >
                               <Card>
                                   <CardMedia component="img" image={formatImageUrl(movie.poster_path, configuration)} sx={{width:150, height:250, borderRadius:5}}/>
                                   <Typography variant="body1" sx={{textAlign:'center'}}>{movie.title}</Typography>
                               </Card>
                           </Link>
                       ))}
                   </Container>
               </Container>
           </Container>
        </Container>
    )
}