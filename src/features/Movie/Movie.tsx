import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";



export function Movie() {

   const params = useParams()

   console.log(params)
   return (
       <Typography>Movieee</Typography>
   )
}