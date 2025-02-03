import React, { useState } from 'react';
import {
    AppBar, Toolbar, Tabs, IconButton, Menu, MenuItem, styled
} from '@mui/material';
import {
    WbSunny,
    Brightness3,
    SettingsBrightness,
    Flight,
    Hotel,
    Luggage
} from '@mui/icons-material';
import StyledTab from '../ui-components/tab';

interface HeaderProps {
    themeMode: 'light' | 'dark' | 'device';
    setThemeMode: (mode: 'light' | 'dark' | 'device') => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, setThemeMode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTab, setSelectedTab] = useState(2);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = (mode: 'light' | 'dark' | 'device') => {
        setThemeMode(mode);
        handleMenuClose();
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <AppBar position="sticky" color="default" elevation={0}>
            <ToolbarContainer>
                {/* Google Logo */}
                <Logo
                    src={themeMode === "light" ? "/assets/icons/logo.svg" : "/assets/icons/logo-white.svg"}
                    alt="Google Logo"
                />

                {/* Dummy Tabs */}
                <StyledTabs value={selectedTab} onChange={handleTabChange}>
                    <StyledTab icon={<Hotel />} label="Hotels" disabled />
                    <StyledTab icon={<Luggage />} label="Packages" disabled />
                    <StyledTab icon={<Flight />} label="Flights" />
                </StyledTabs>

                {/* Theme Toggle */}
                <div style={{ marginLeft: 'auto' }}>
                    <IconButton onClick={handleMenuOpen} color="inherit">
                        {themeMode === 'light' ? (
                            <WbSunny />
                        ) : themeMode === 'dark' ? (
                            <Brightness3 />
                        ) : (
                            <SettingsBrightness />
                        )}
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleThemeChange('device')}>Use Device Default</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('light')}>Light Theme</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('dark')}>Dark Theme</MenuItem>
                    </Menu>
                </div>
                <PersonIcon
                    src='/assets/icons/person-avatar.svg'
                    alt=''
                />
            </ToolbarContainer>
            {/* Border line below header */}
            <div style={{ borderBottom: '1px solid #ccc', width: '100%' , marginTop: '4px   '}} />
        </AppBar>
    );
};

export default Header;

const ToolbarContainer = styled(Toolbar)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#202124' : theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Logo = styled('img')({
    height: '30px',
    marginRight: '20px',
});

const StyledTabs = styled(Tabs)(() => ({
    marginTop: '12px',
    /* Hide on smaller screens */
    '@media (max-width: 600px)': {
        display: 'none',
    },

    '@media (min-width: 1024px)': {
        marginLeft: '140px',
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
}));

const PersonIcon = styled('img')({
    height: '42px',
    width: '42px',
    marginLeft: '12px',
    marginRight: '12px',
});