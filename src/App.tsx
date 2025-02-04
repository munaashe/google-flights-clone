import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import Home from "./pages/home";
import Results from "./pages/results";
import Layout from "./layout";
import SearchArea from "./components/searchArea";
import CheapFlights from "./components/cheap-flights";
import { fetchAirportSuggestions, fetchFlights } from "./api/fetch-flights";
import { SearchState } from "../utils/types";

// Initialize QueryClient outside the component

// Debounce Hook (to reduce API calls when typing)
function useDebouncedValue(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'device'>(
    (localStorage.getItem('themeMode') as 'light' | 'dark' | 'device') || 'device'
  );
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Function to get design tokens based on theme mode
  const getDesignTokens = (mode: 'light' | 'dark' | 'device') => ({
    palette: {
      mode: mode === 'device' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode,
      primary: {
        main: '#202124',
        light: '#e3f2fd',
      },
      divider: '#bdbdbd',
    },
  });

  const theme = createTheme(getDesignTokens(themeMode));

  // Search local state
  const [searchState, setSearchState] = useState<SearchState>({
    tripType: 'Round trip',
    passengers: { adults: 1, children: 0, infantsSeat: 0, infantsLap: 0 },
    classType: 'Economy',
    dates: { departure: '', return: '' },
    places: { departure: '', destination: '' },
    originSkyId: '',
    destinationSkyId: '',
    originEntityId: '',
    destinationEntityId: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  // Debounce user input before fetching airport suggestions
  const debouncedDeparture = useDebouncedValue(searchState.places.departure);
  const debouncedDestination = useDebouncedValue(searchState.places.destination);

  // Fetch airport suggestions with React Query
  const { data: departureSuggestions, isLoading: loadingDeparture } = useQuery({
    queryKey: ["departureSuggestions", debouncedDeparture],
    queryFn: () => fetchAirportSuggestions(debouncedDeparture),
    enabled: debouncedDeparture.length > 2, // Fetch only if input has 3+ chars
  });

  const { data: destinationSuggestions, isLoading: loadingDestination } = useQuery({
    queryKey: ["destinationSuggestions", debouncedDestination],
    queryFn: () => fetchAirportSuggestions(debouncedDestination),
    enabled: debouncedDestination.length > 2,
  });

  const [triggerSearch, setTriggerSearch] = useState(false);

  const shouldFetch = !!searchState.places.departure && !!searchState.places.destination && !!searchState.dates.departure;

  const { data: flightResults, isLoading: flightsLoading } = useQuery({
    queryKey: ["flightResults", searchState],
    queryFn: () =>
      fetchFlights({
        originSkyId: searchState.originSkyId,
        destinationSkyId: searchState.destinationSkyId,
        originEntityId: searchState.originEntityId,
        destinationEntityId: searchState.destinationEntityId,
        cabinClass: searchState?.classType,
        adults: 1,
        departureDate: searchState?.dates?.departure,
      }),
    enabled: triggerSearch && shouldFetch,
  });
  console.log(flightResults)
  const handleSearchClick = () => {
    if (shouldFetch) {
      setTriggerSearch(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout themeMode={themeMode} setThemeMode={setThemeMode}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home>
                  {/* Autocomplete Search */}


                  {/* Search Area & Cheap Flights */}
                  <SearchArea
                    themeMode={themeMode}
                    anchorRef={anchorRef}
                    dropdownOpen={dropdownOpen}
                    searchState={searchState}
                    loadingDeparture={loadingDeparture}
                    loadingDestination={loadingDestination}
                    shouldFetch={shouldFetch}
                    departureSuggestions={departureSuggestions?.data}
                    destinationSuggestions={destinationSuggestions?.data}
                    setSearchState={setSearchState}
                    setDropdownOpen={setDropdownOpen}
                    handleSearch={handleSearchClick}
                  />
                  <CheapFlights thememode={themeMode} />
                </Home>
              }
            />
            <Route path="/results" element={<Results
              loading={flightsLoading}
              flightResults={flightResults}
            />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;