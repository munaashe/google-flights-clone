import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import Home from './pages/home';
import Results from './pages/results';
import Layout from './layout';


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
        main: '#1976d2',
        light: '#e3f2fd',
      },
      divider: '#bdbdbd',
    },
  });

  // Create the theme
  const theme = createTheme(getDesignTokens(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <CssBaseline />
        <Layout themeMode={themeMode} setThemeMode={setThemeMode}>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/results' element={<Results />} />
            </Routes>
          </Router>
        </Layout>
      </StyledComponentsThemeProvider>
    </ThemeProvider>
  )
}

export default App
