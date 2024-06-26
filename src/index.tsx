import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, {lazy, Profiler, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About} from "./features/About/About";
import Home from "./features/Home/Home";
import {Provider} from "react-redux";
import store from "./store";
import {Movie} from "./features/Movie/Movie";
import {LinearProgress} from "@mui/material";
import {Extra} from "./features/Extra/Extra";
import {StatefulAuthProvider} from "./auth/StatefulAuthProvider";
import {AuthCallback} from "./auth/AuthCallback";
import {Profile} from "./features/Profile/Profile";
import {AuthenticationGuard} from "./auth/AuthenticationGuard";
import {Protected} from "./features/Protected/Protected";
import {ErrorBoundary} from "react-error-boundary";
import fallbackRender from "./fallbackRender";
import Actors from "./features/Actors/Actors";
import {Person} from "./features/Person/Person";
import {StarWars} from "./features/StarWars/StarWars";

const Movies = lazy(() => import("./features/Movies/Movies"));

type OnRenderFunction = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
) => void;

const onRender: OnRenderFunction = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // Aggregate or log render timings...
    // console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
}

function AppEntryPoint(){
    return (
        <StatefulAuthProvider>
            <Provider store={store}>
                <ErrorBoundary fallbackRender={fallbackRender}>
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
                element:
                    <Profiler id="About" onRender={onRender}>
                        <About/>
                    </Profiler>
            },
            {
                path:'movies',
                element:
                <Suspense fallback={<LinearProgress sx={{mt: 1}}/>}>
                    <Movies/>
                </Suspense>,
            },
            {
                path:'movies/:id',
                element: <Movie/>,
            },
            {
                path:'movies/:id/cast',
                element: <Actors/>
            },
            {
                path: "extra",
                element: <Extra/>
            },
            {
                path: "starwars",
                element: <StarWars/>
            },
            {
                path: "person/:id/:name",
                element: <Person/>
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
