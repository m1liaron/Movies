import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import {
    CssBaseline,
    ThemeProvider,
    createTheme
} from "@mui/material";
import {teal} from "@mui/material/colors"
import {AppHeader} from "./features/Header/AppHeader";
import {anonymousUser, AuthContext, AuthInfo} from "./AuthContext";

const defaultTheme = createTheme({
    palette: {
        primary: teal,
        secondary:{
            main: '#96000f'
        },
    },
});

const fakeAuth: AuthInfo = {
    user:{
        name:'Denis'
    }
}

function App() {
  const [auth, setAuth] = useState<AuthInfo>({user: anonymousUser})

  return (
    <ThemeProvider theme={defaultTheme}>
          <CssBaseline/>
          <AuthContext.Provider value={auth}>
              <AppHeader/>
              <main>
                <Outlet/>
              </main>
          </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;