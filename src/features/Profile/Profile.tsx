import {useAuth0} from "@auth0/auth0-react";
import {Avatar, Box, Container, Stack, Typography} from "@mui/material";

export function Profile() {
    const {user, isAuthenticated} = useAuth0();

    return (
        <Container>
            <Stack>
                <Box>
                    <Avatar src={user?.picture}/>
                    <Box>
                        <Typography variant="h5">{user?.name}</Typography>
                        <Typography>{user?.email}</Typography>
                    </Box>
                </Box>
                <Box>
                    <pre>
                        <code>{JSON.stringify(user, null, 2)}</code>
                    </pre>
                </Box>
            </Stack>
        </Container>
    );
}