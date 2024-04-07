import {Card, CardActions, CardMedia, IconButton} from "@mui/material";
import {useRef, useState} from "react";
import {PlayArrow, Pause} from "@mui/icons-material";

export function CountdownVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    function togglePlay(){
        const nextPlaying = !isPlaying;

        if(nextPlaying){
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }

    return (
        <Card>
            <CardMedia>
                <video
                    ref={videoRef}
                    src="/mountain.mp4"
                    height="500"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            </CardMedia>
            <CardActions>
                <IconButton onClick={togglePlay}>
                    {isPlaying ? (
                          <Pause sx={{height: 38, width: 38}}/>
                        ) : (
                          <PlayArrow sx={{height: 38, width: 38}}/>
                    )}
                </IconButton>
            </CardActions>
        </Card>
    )
}