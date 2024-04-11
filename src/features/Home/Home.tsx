import {Box, Typography, Container, Input, Button} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
export function Home() {
    const { user, isAuthenticated} = useAuth0()
    const greeting = isAuthenticated
    ? `${user?.name} Explore movies today with us!`
    : 'Explore movies today with us!'

    // throw new Error('Fatality!') check Error Boundary work

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
            </Container>

        </Box>
    )
}