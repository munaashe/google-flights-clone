import CustomText from '../ui-components/text';
import React, { SetStateAction } from "react";
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
    Paper
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
    tripType: string;
    setTripType: (value: string) => void;
    passengers: Passengers;
    setPassengers: React.Dispatch<SetStateAction<Passengers>>
    classType: string;
    setClassType: (value: string) => void;
    departure: string;
    setDeparture: (value: string) => void;
    returnDate: string;
    setReturnDate: (value: string) => void;
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<SetStateAction<boolean>>
    anchorRef: React.RefObject<HTMLDivElement | null>;
    themeMode: "light" | "dark" | "device";
}

interface Passengers {
    adults: number;
    children: number;
    infantsSeat: number;
    infantsLap: number;
}

const passengerCategories = [
    { id: "adults", label: "Adults", subLabel: "", min: 1 },
    { id: "children", label: "Children", subLabel: "Aged 2-11", min: 0 },
    { id: "infantsSeat", label: "Infants", subLabel: "In seat", min: 0 },
    { id: "infantsLap", label: "Infants", subLabel: "On lap", min: 0 },
];

const SearchArea = ({
    tripType,
    setTripType,
    passengers,
    setPassengers,
    classType,
    setClassType,
    departure,
    setDeparture,
    returnDate,
    setReturnDate,
    dropdownOpen,
    setDropdownOpen,
    anchorRef,
    themeMode,
}: Props) => {


    const handlePassengerChange = (type: keyof Passengers, increment: boolean) => {
        setPassengers((prev) => ({
            ...prev,
            [type]: Math.max(passengerCategories.find((cat) => cat.id === type)?.min || 0, prev[type] + (increment ? 1 : -1)),
        }));
    };

    const handleCancel = () => {
        setDropdownOpen(false); // Close the dropdown
    };

    const handleDone = () => {
        setDropdownOpen(false); // Close the dropdown
    };

    const handleToggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown
    };

    const handleCloseDropdown = (event: Event) => {
        if (anchorRef?.current && anchorRef?.current.contains(event.target as HTMLElement)) {
            return;
        }
        setDropdownOpen(false); 
    };

    return (
        <>
            <StyledContainer themeMode={themeMode}>
                <CustomText customVariant='title1'>
                    Flights
                </CustomText>
            </StyledContainer>
            <SearchContainer>
                <TripTypeContainer>
                    <StyledSelect
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value as string)}
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
                                <Typography>{Object.values(passengers).reduce((a, b) => a + b, 0)}</Typography>
                            </PassengerDropdown>

                            <Popper
                                open={dropdownOpen}
                                anchorEl={anchorRef?.current}
                                placement="bottom-start"
                                disablePortal
                            >
                                <Paper>
                                    <Box sx={{ padding: 2 }}>
                                        {passengerCategories.map((category) => (
                                            <MenuItem key={category.id}>
                                                <div style={{ width: '60px' }}>
                                                    <Typography>{category.label}</Typography>
                                                    {category.subLabel && (
                                                        <Typography variant="caption" >
                                                            {category.subLabel}
                                                        </Typography>
                                                    )}
                                                </div>
                                                <Incrementor>
                                                    <Button
                                                        onClick={() => handlePassengerChange(category.id as keyof Passengers, false)}
                                                        disabled={passengers[category.id as keyof Passengers] === category.min}
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography>{passengers[category.id as keyof Passengers]}</Typography>
                                                    <Button onClick={() => handlePassengerChange(category.id as keyof Passengers, true)}>
                                                        +
                                                    </Button>
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
                        value={classType}
                        onChange={(e) => setClassType(e.target.value as string)}
                        variant='standard'
                    >
                        <MenuItem value="Economy">Economy</MenuItem>
                        <MenuItem value="Premium economy">Premium economy</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="First">First</MenuItem>
                    </StyledSelect>
                </TripTypeContainer>

                <TripDetailsContainer>
                    <StyledInput placeholder="From" />
                    <StyledInput placeholder="To" />
                    <StyledInput
                        type="date"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                    {tripType === "Round trip" && (
                        <StyledInput
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    )}
                </TripDetailsContainer>
                {/* Search Button */}
                <SearchButtonContainer>
                    <SearchButton variant="contained">
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
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    paddingBottom: '24px'
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

