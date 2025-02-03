import React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import UsefulInsights from '../../components/useful-insights';

interface Props {
    children: React.ReactNode;
}

const Home = ({ children }: Props) => {
    return (
        <HomepageContainer>
            {children}
            <UsefulInsights />
        </HomepageContainer>
    );
};

export default Home;

const HomepageContainer = styled(Container)(({ theme }) => ({
    color: theme.palette.text.primary,
    minHeight: '100vh',
}));