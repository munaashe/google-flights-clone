import { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import Home from './pages/home';
import Results from './pages/results';
import Layout from './layout';
import SearchArea from './components/searchArea';
import CheapFlights from './components/cheap-flights';

const queryClient = new QueryClient();

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

  // Create the theme
  const theme = createTheme(getDesignTokens(themeMode));

  // Search local state
  const [tripType, setTripType] = useState<string>('Round trip');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });
  const [classType, setClassType] = useState<string>('Economy');
  const [departure, setDeparture] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout themeMode={themeMode} setThemeMode={setThemeMode}>
          <Router>
            <Routes>
              <Route
                path='/'
                element={
                  <Home>
                    <SearchArea
                      themeMode={themeMode}
                      tripType={tripType}
                      passengers={passengers}
                      anchorRef={anchorRef}
                      classType={classType}
                      dropdownOpen={dropdownOpen}
                      departure={departure}
                      returnDate={returnDate}
                      setClassType={setClassType}
                      setDeparture={setDeparture}
                      setReturnDate={setReturnDate}
                      setDropdownOpen={setDropdownOpen}
                      setTripType={setTripType}
                      setPassengers={setPassengers}
                    />
                    <CheapFlights thememode={themeMode} />
                    
                  </Home>
                }
              />
              <Route path='/results' element={<Results />} />
            </Routes>
          </Router>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;