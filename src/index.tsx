import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About} from "./features/About/About";
import {Home} from "./features/Home/Home";
import {Provider} from "react-redux";
import store from "./store";
import {Movie} from "./features/Movie/Movie";
import {ErrorBoundary} from "./ErrorBoundary";
import {LinearProgress} from "@mui/material";
import {Extra} from "./features/Extra/Extra";
import {StatefulAuthProvider} from "./auth/StatefulAuthProvider";
import {AuthCallback} from "./auth/AuthCallback";
import {Profile} from "./features/Profile/Profile";
import {AuthenticationGuard} from "./auth/AuthenticationGuard";
import {Protected} from "./features/Protected/Protected";

const Movies = lazy(() => import("./features/Movies/Movies"));

function AppEntryPoint(){
    return (
        <StatefulAuthProvider>
            <Provider store={store}>
                <ErrorBoundary>
                    <App/>
                </ErrorBoundary>
            </Provider>
        </StatefulAuthProvider>
    )
}

const router = createBrowserRouter([
    {
        path:'/',
        element:<AppEntryPoint/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path:'/about',
                element: <About/>
            },
            {
                path:'movies',
                element:
                <Suspense fallback={<LinearProgress sx={{mt: 1}}/>}>
                    <Movies/>
                </Suspense>,
            },
            {
                path:'/movies/:id',
                element: <Movie/>
            },
            {
                path: "extra",
                element: <Extra/>
            },
            {
                path:'/protected',
                element: <AuthenticationGuard component={Protected}/>
            },
            {
                path:'/profile',
                element: <AuthenticationGuard  component={Profile}/>
            },
            {
                path: "/callback",
                element: <AuthCallback/>
            }
        ]
    }
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
