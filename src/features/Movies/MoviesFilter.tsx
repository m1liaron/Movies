import {
    FormControl,
    Paper,
    Autocomplete,
    TextField,
    Button,
    debounce,
    FormLabel,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FilterAltOutlined} from "@mui/icons-material";
import {client, KeyWordItem} from "../../api/tmdb";
import {useMemo, useState} from "react";
import {useAppSelector} from "../../hooks";

export interface Filters {
    keywords: KeyWordItem[];
    genres: number[]
}
interface MoviesFilterProps{
    onApply(filters: Filters): void
}

export default function MoviesFilter({onApply} : MoviesFilterProps) {
    const [keywordsLoading, setKeywordsLoading] = useState(false)
    const [keywordsOptions,setKeywordsOptions] = useState<KeyWordItem[]>([]);
    const genres = useAppSelector((state) => state.movies.genres)

    const {handleSubmit, control} = useForm<Filters>({
        defaultValues:{
            keywords:[],
            genres: [],
        },
    });

    const fetchKeywordOptions = async (query: string) => {
        if (query) {
            setKeywordsLoading(true)

            const options = await client.getKeyWords(query);
            setKeywordsLoading(false)
            setKeywordsOptions(options);
        } else {
            setKeywordsOptions([]);
        }
    }

    const debouncedFetchKeywordOptions = useMemo(() => debounce(fetchKeywordOptions, 1000),[]);

    return (
        <Paper sx={{ m: 2, p:0.5}}>
            <form onSubmit={handleSubmit(onApply)}>
                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{m: 2, display: "block"}}
                >
                    <Controller
                        name="keywords"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                multiple
                                loading={keywordsLoading}
                                disablePortal
                                options={keywordsOptions}
                                filterOptions={(x) => x}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => onChange(value)}
                                value={value}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onInputChange={(_, value) => debouncedFetchKeywordOptions(value)}
                                renderInput={(params) => <TextField {...params} label="Keywords" />}
                            />
                    )}/>
                </FormControl>
                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{m: 2, display: "block"}}
                >
                    <FormLabel component="legend">Genres</FormLabel>
                    <Controller
                        name="genres"
                        control={control}
                        render={({ field }) => (
                            <>
                                {genres.map((genre) => (
                                    <FormControlLabel
                                        key={genre.id}
                                        control={
                                            <Checkbox
                                                value={genre.id}
                                                checked={field.value.includes(genre.id)}
                                                onChange={(event, checked) => {
                                                    const valueNumber = Number(event.target.value);
                                                    if (checked) {
                                                        field.onChange([...field.value, valueNumber]);
                                                    } else {
                                                        field.onChange(field.value.filter((value) => value !== valueNumber));
                                                    }
                                                }}
                                            />
                                        }
                                        label={genre.name}
                                    />
                                ))}
                            </>
                        )}/>
                </FormControl>
                <Button type="submit" variant="contained" startIcon={<FilterAltOutlined/>} sx={{m:2}}>
                    Apply filter
                </Button>
            </form>
        </Paper>
    )
}

