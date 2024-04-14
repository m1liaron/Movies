import {
    FormControl,
    Paper,
    Autocomplete,
    TextField,
    Button,
    debounce,
    FormLabel,
    FormControlLabel,
    Checkbox, Skeleton, FormGroup, Input
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FilterAltOutlined} from "@mui/icons-material";
import {
    Company,
    KeyWordItem,
    useGetCompaniesQuery,
    useGetGenresQuery,
    useGetKeyWordsQuery
} from "../../services/tmdb";
import {useMemo, useState} from "react";

export interface Filters {
    keywords: KeyWordItem[];
    genres: number[];
    companies: Company[];
}
interface MoviesFilterProps{
    onApply(filters: Filters): void
}

export default function MoviesFilter({onApply} : MoviesFilterProps) {
    const [keywordsQuery, setKeywordsQuery] = useState<string>("")
    const { data: keywordsOptions = [], isLoading: keywordsLoading } =  useGetKeyWordsQuery(keywordsQuery)
    useGetKeyWordsQuery(keywordsQuery, { skip: !keywordsQuery }); // skip request to API

    const [companiesQuery, setCompaniesQuery] = useState<string>("");
    const {data: companiesOptions = [], isLoading: companiesLoading} = useGetCompaniesQuery(companiesQuery)

    const { data: genres = [], isLoading: genresLoading} = useGetGenresQuery();

    const {handleSubmit, control} = useForm<Filters>({
        defaultValues:{
            keywords:[],
            genres: [],
            companies: [],
        },
    });

    const debouncedFetchKeywordOptions = useMemo(() => debounce((query: string) => {
        setKeywordsQuery(query)
    }, 1000),[]);

    const debouncedFetchCompanyOptions = useMemo(() => debounce((query: string) => {
        setCompaniesQuery(query)
    }, 1000),[]);

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
                    {genresLoading ? (
                        <Skeleton width={300} height={480}/>
                    ) : (
                        <>
                        <FormLabel component="legend">Genres</FormLabel>
                        <FormGroup sx={{ maxHeight: 500 }}>
                            <Controller
                                name="genres"
                                control={control}
                                render={({field}) => (
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
                        </FormGroup>
                    </>)}
                </FormControl>

                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{m: 2, display: "block"}}
                >
                    <FormLabel component="legend">Company</FormLabel>
                    <Controller
                        name="companies"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                multiple
                                loading={companiesLoading}
                                disablePortal
                                options={companiesOptions}
                                filterOptions={(x) => x}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => onChange(value)}
                                value={value}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onInputChange={(_, value) => debouncedFetchCompanyOptions(value)}
                                renderInput={(params) => <TextField {...params} label="Companies" />}
                            />
                        )}/>
                </FormControl>
                <Button type="submit" variant="contained" startIcon={<FilterAltOutlined/>} sx={{m:2}}>
                    Apply filter
                </Button>
            </form>
        </Paper>
    )
}

