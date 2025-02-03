import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../components/header';

interface Props {
    themeMode: 'light' | 'dark' | 'device';
    setThemeMode: (mode: 'light' | 'dark' | 'device') => void;
    children: React.ReactNode;
}

const Layout = ({ children, themeMode, setThemeMode }: Props) => {
    return (
        <StyledBox>
            <Header themeMode={themeMode} setThemeMode={setThemeMode} />
            <StyledContainer>{children}</StyledContainer>
        </StyledBox>
    );
};

export default Layout;

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        //paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
        //paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('lg')]: {
        //paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? '#202124' : theme.palette.background.default,
    color: theme.palette.text.primary,
}));