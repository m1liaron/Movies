import {Link as RouterLink} from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, IconButton, Tooltip,
    Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {memo} from "react";
interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string;
    enableUserActions?: boolean;
    onAddFavorite?(id: number):void
}

function MovieCard({
  id,
  title,
  overview,
  popularity,
  enableUserActions,
  onAddFavorite,
  image = '/thumbnail.png'
}: MovieCardProps){

    return (
        <Card sx={{height: "100%", display:'flex', flexDirection: 'column'}}>
            <CardMedia component="div" image={image} sx={{pt: "56.25%"}}/>
            <CardContent sx={{flexGrow: 1}}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{overview}</Typography>
                <Typography variant="button" display="block" mt={2}>
                    {popularity}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
                    Details
                </Button>
                {enableUserActions && (<Tooltip title="Add to favorites">
                    <IconButton onClick={() => onAddFavorite?.(id)}>
                        <FavoriteIcon/>
                    </IconButton>
                </Tooltip>)}
            </CardActions>
        </Card>
    )
}

export default memo(MovieCard);