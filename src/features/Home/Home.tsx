import {Box, Typography, Container, Input, Button} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import {useContext} from "react";
import {anonymousUser, AuthContext} from "../../AuthContext";
export function Home() {
    const { user} = useContext(AuthContext)
    const loggedIn = user !== anonymousUser
    const greeting = loggedIn
    ? `${user.name} Explore movies today with us!`
    : 'Explore movies today with us!'

    throw new Error('Fatality!')

    return (
        <Box sx={{pt: 8, pb:8}}>
            <Container maxWidth='sm'>
                <Typography
                    component="h1"
                    variant='h2'
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome
                </Typography>
                <Typography
                    variant='h5'
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {greeting}
                </Typography>

                {/*<Typography*/}
                {/*    component="h4"*/}
                {/*    variant='h5'*/}
                {/*    color="text.primary"*/}
                {/*    gutterBottom*/}
                {/*>*/}
                {/*    Search for your favorite movis*/}
                {/*</Typography>*/}
                {/*<Button*/}
                {/*    component={RouterLink}*/}
                {/*    to='/movies'*/}
                {/*    variant="contained"*/}
                {/*>Explore</Button>*/}
                {/*<Input type='text'/>*/}
            </Container>

        </Box>
    )
}