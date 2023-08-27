import { useEffect, useState } from "react";
import { Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Popular.css'

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=c6b8872b3532bbaa567316618a5d8d56')
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, []);

    return (
        <div className="poster">
            <Carousel 
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}>
                {popularMovies.map(movie => (
                    <span key={movie.id}>{movie.original_title}</span>
                ))}
            </Carousel>
        </div>
    )
}

export default Popular;
