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

const Movies = lazy(() => import("./features/Movies/Movies"));

function AppEntryPoint(){
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </Provider>
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
                path:'about',
                element: <About/>
            },
            {
                path:'movies',
                element:
                    <Suspense fallback={<LinearProgress sx={{mt: 1}}/>}>
                        <Movies/>
                    </Suspense>,
                children:[
                    {
                        path:':id',
                        element:<Movie/>
                    }
                ]
            },
            {
                path: "extra",
                element: <Extra/>
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
