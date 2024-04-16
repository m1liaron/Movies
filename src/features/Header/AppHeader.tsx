import {AppBar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import {LiveTvOutlined} from "@mui/icons-material";
import React, {useContext} from "react";
import {Link as RouterLink} from "react-router-dom";
import {AuthSection} from "./AuthSection";
import {useAuth0} from "@auth0/auth0-react";

interface AppHeaderProps {
    onLogin(): void;
    onLogout(): void;
}
export function AppHeader() {
    const {isAuthenticated} = useAuth0();

    return (
        <AppBar position="static">
            <Toolbar>
                <LiveTvOutlined sx={{ mr: 2}}/>
                <Typography variant='h6' color='inherent' noWrap>
                    The Movies DB
                </Typography>
                <Box sx={{flexGrow: 1 }}>
                    <nav>
                        <HeaderLink to='/'>Home</HeaderLink>
                        <HeaderLink to='/about'>About</HeaderLink>
                        <HeaderLink to='/movies'>Movies</HeaderLink>
                        {/*{isAuthenticated && <HeaderLink to='/protected'>Protected</HeaderLink>}*/}
                        <HeaderLink to='/extra'>Extra</HeaderLink>
                        <HeaderLink to='/starwars'>Star Wars</HeaderLink>
                    </nav>
                </Box>
                <AuthSection/>
            </Toolbar>
        </AppBar>
    )
}

interface AuthSectionProps {
    onLogin(): void;
    onLogout(): void;
}
function HeaderLink({children, to}: { to: string, children: React.ReactNode }) {
    return <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{my: 1, mx: 1.5}}>{children} </Link>
}