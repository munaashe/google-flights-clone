import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';



const Home = () => {
    return (
        <HomepageContainer>
            <Typography variant="h4">Home Page</Typography>
            <Typography variant="body1">This page is responsive to the theme.</Typography>
        </HomepageContainer>
    );
};

export default Home;

const HomepageContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: '100vh',
    padding: theme.spacing(3),
}));