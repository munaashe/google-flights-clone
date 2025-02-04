import CustomText from '../ui-components/text';
import React from "react";
import {
    Box,
    MenuItem,
    Select,
    TextField,
    Button,
    IconButton,
    Typography,
    styled,
    Container,
    ClickAwayListener,
    Popper,
    Paper,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Passengers, SearchState } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';

interface Props {
    searchState: SearchState;
    setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    anchorRef: React.RefObject<HTMLDivElement | null>;
    themeMode: "light" | "dark" | "device";
    loadingDeparture: boolean;
    loadingDestination: boolean;
    departureSuggestions: any[];
    destinationSuggestions: any[];
    shouldFetch: boolean;
    handleSearch: () => void;
}




const passengerCategories = [
    { id: "adults", label: "Adults", subLabel: "", min: 1 },
    { id: "children", label: "Children", subLabel: "Aged 2-11", min: 0 },
    { id: "infantsSeat", label: "Infants", subLabel: "In seat", min: 0 },
    { id: "infantsLap", label: "Infants", subLabel: "On lap", min: 0 },
];

const SearchArea = ({
    searchState,
    setSearchState,
    dropdownOpen,
    setDropdownOpen,
    anchorRef,
    themeMode,
    loadingDeparture,
    departureSuggestions,
    loadingDestination,
    destinationSuggestions,
    shouldFetch,
    handleSearch
}: Props) => {

    // Generic state update function
    const updateSearchState = (field: keyof SearchState, value: any) => {
        setSearchState((prev) => ({ ...prev, [field]: value }));
    };
    const navigate = useNavigate();

    const updateNestedState = <K extends keyof SearchState>(
        category: K,
        field: keyof SearchState[K] & string,
        value: any
    ) => {
        setSearchState((prev) => ({
            ...prev,
            [category]: {
                ...(prev[category] as Record<string, any>), // Ensure it's an object
                [field]: value,
            },
        }));
    };

    // Handle passenger count change
    const handlePassengerChange = (type: keyof Passengers, increment: boolean) => {
        setSearchState((prev) => ({
            ...prev,
            passengers: {
                ...prev.passengers,
                [type]: Math.max(passengerCategories?.find((cat) => cat.id === type)?.min || 0, prev.passengers[type] + (increment ? 1 : -1)),
            },
        }));
    };

    const handleCancel = () => setDropdownOpen(false);
    const handleDone = () => setDropdownOpen(false);
    const handleToggleDropdown = () => setDropdownOpen((prev) => !prev);

    const handleCloseDropdown = (event: Event) => {
        if (anchorRef?.current?.contains(event.target as HTMLElement)) return;
        setDropdownOpen(false);
    };

    const onSearch = () => {
        handleSearch();
        navigate('/results')
    }

    return (
        <>
            <StyledContainer themeMode={themeMode}>
                <CustomText customVariant='title1'>Flights</CustomText>
            </StyledContainer>
            <SearchContainer>
                <TripTypeContainer>
                    <StyledSelect
                        value={searchState.tripType}
                        onChange={(e) => updateSearchState('tripType', e.target.value)}
                        variant="standard"
                    >
                        <MenuItem value="Round trip">Round trip</MenuItem>
                        <MenuItem value="One way">One way</MenuItem>
                    </StyledSelect>

                    {/* Passengers Dropdown */}
                    <ClickAwayListener onClickAway={handleCloseDropdown}>
                        <Box>
                            <PassengerDropdown ref={anchorRef} onClick={handleToggleDropdown}>
                                <IconButton>
                                    <PersonIcon />
                                </IconButton>
                                <Typography>{Object.values(searchState.passengers).reduce((a, b) => a + b, 0)}</Typography>
                            </PassengerDropdown>

                            <Popper open={dropdownOpen} anchorEl={anchorRef?.current} placement="bottom-start" disablePortal>
                                <Paper>
                                    <Box sx={{ padding: 2 }}>
                                        {passengerCategories.map((category) => (
                                            <MenuItem key={category.id}>
                                                <div style={{ width: '60px' }}>
                                                    <Typography>{category.label}</Typography>
                                                    {category.subLabel && <Typography variant="caption">{category.subLabel}</Typography>}
                                                </div>
                                                <Incrementor>
                                                    <Button
                                                        onClick={() => handlePassengerChange(category.id as keyof Passengers, false)}
                                                        disabled={searchState.passengers[category.id as keyof Passengers] === category.min}
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography>{searchState.passengers[category.id as keyof Passengers]}</Typography>
                                                    <Button onClick={() => handlePassengerChange(category.id as keyof Passengers, true)}>+</Button>
                                                </Incrementor>
                                            </MenuItem>
                                        ))}
                                        <MenuItem>
                                            <Button onClick={handleCancel}>Cancel</Button>
                                            <Button onClick={handleDone}>Done</Button>
                                        </MenuItem>
                                    </Box>
                                </Paper>
                            </Popper>
                        </Box>
                    </ClickAwayListener>

                    {/* Travel Class Dropdown */}
                    <StyledSelect
                        value={searchState.classType}
                        onChange={(e) => updateSearchState('classType', e.target.value)}
                        variant='standard'
                    >
                        <MenuItem value="Economy">Economy</MenuItem>
                        <MenuItem value="Premium economy">Premium economy</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="First">First</MenuItem>
                    </StyledSelect>
                </TripTypeContainer>

                <TripDetailsContainer>
                    <Autocomplete
                        freeSolo
                        options={departureSuggestions || []}
                        getOptionLabel={(option: any) =>
                            option.presentation?.title || option.navigation?.localizedName || ""
                        }
                        loading={loadingDeparture}
                        onInputChange={(_event, newValue) => {
                            // Find the selected suggestion object by matching the title or localized name
                            const selectedDeparture = departureSuggestions?.find(
                                (suggestion) =>
                                    suggestion.presentation?.title === newValue ||
                                    suggestion.navigation?.localizedName === newValue
                            );

                            // Update the searchState with originSkyId and originEntityId if a match is found
                            if (selectedDeparture) {
                                setSearchState((prev) => ({
                                    ...prev,
                                    places: {
                                        ...prev.places,
                                        departure: selectedDeparture.presentation?.title, // Store the title or name
                                    },
                                    originSkyId: selectedDeparture.skyId, // Store originSkyId
                                    originEntityId: selectedDeparture.entityId, // Store originEntityId
                                }));
                            } else {
                                // If no match, just update the departure name
                                setSearchState((prev) => ({
                                    ...prev,
                                    places: {
                                        ...prev.places,
                                        departure: newValue,
                                    },
                                }));
                            }
                        }}
                        renderInput={(params) => (
                            <StyledInput
                                {...params}
                                placeholder="From"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingDeparture ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />

                    <Autocomplete
                        freeSolo
                        options={destinationSuggestions || []}
                        getOptionLabel={(option: any) =>
                            option.presentation?.title || option.navigation?.localizedName || ""
                        }
                        loading={loadingDestination}
                        onInputChange={(_event, newValue) => {
                            // Find the selected suggestion object by matching the title or localized name
                            const selectedDestination = destinationSuggestions?.find(
                                (suggestion) =>
                                    suggestion.presentation?.title === newValue ||
                                    suggestion.navigation?.localizedName === newValue
                            );

                            if (selectedDestination) {
                                setSearchState((prev) => ({
                                    ...prev,
                                    places: {
                                        ...prev.places,
                                        destination: selectedDestination.presentation?.title,
                                    },
                                    destinationSkyId: selectedDestination.skyId,
                                    destinationEntityId: selectedDestination.entityId,
                                }));
                            } else {
                                setSearchState((prev) => ({
                                    ...prev,
                                    places: {
                                        ...prev.places,
                                        destination: newValue,
                                    },
                                }));
                            }
                        }}
                        renderInput={(params) => (
                            <StyledInput
                                {...params}
                                placeholder="To"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingDestination ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                    <StyledInput
                        type="date"
                        value={searchState.dates.departure}
                        onChange={(e) => updateNestedState('dates', 'departure', e.target.value)}
                        inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    />

                    {searchState.tripType === "Round trip" && (
                        <StyledInput
                            type="date"
                            value={searchState.dates.return}
                            onChange={(e) => updateNestedState('dates', 'return', e.target.value)}
                            inputProps={{ min: searchState.dates.departure }}
                        />
                    )}
                </TripDetailsContainer>

                {/* Search Button */}
                <SearchButtonContainer>
                    <SearchButton variant="contained" disabled={!shouldFetch} onClick={onSearch}>
                        <SearchIcon sx={{ marginRight: "8px" }} />
                        Search
                    </SearchButton>
                </SearchButtonContainer>
            </SearchContainer>
        </>
    );
};

export default SearchArea;

const StyledContainer = styled(Container)<{ themeMode: string }>(({ themeMode }) => ({
    position: 'relative',
    height: '360px',
    backgroundImage:
        themeMode === 'light'
            ? 'url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)'
            : 'url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    gap: "12px",
    padding: "16px",
    boxShadow: "0px 2px 4px rgba(1,0,0,0.5)",
    borderRadius: "8px",
    width: '100%',
    marginTop: '54px',
    backgroundColor: theme.palette.mode === 'dark' ? '#37373a' : theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
        padding: '42px',
    },
    [theme.breakpoints.up('lg')]: {
        padding: '42px',
    },
    position: 'relative'
}));

const TripTypeContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
});

const TripDetailsContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    paddingBottom: '24px',
});

const StyledInput = styled(TextField)({
    flex: 1,
});

const StyledSelect = styled(Select)({
    minWidth: '100px'
});


const PassengerDropdown = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
});


const Incrementor = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100px",
});

const SearchButton = styled(Button)({
    backgroundColor: "#4285F4",
    color: "#fff",
    borderRadius: "20px",
    padding: "8px 16px",
    ":hover": {
        backgroundColor: "#357ae8",
    },
});
const SearchButtonContainer = styled(Container)({
    width: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    position: 'absolute',
    bottom: '-20px',
    left: '0',
})

