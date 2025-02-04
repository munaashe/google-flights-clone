import React from 'react';
import { Box, styled, Tooltip, IconButton, CardMedia, CardContent, Typography, Card } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomText from '../ui-components/text';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
    thememode: 'light' | 'dark' | 'device';
}

const CheapFlights: React.FC<Props> = ({ thememode }) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cityName = userTimeZone.split('/').pop();

    const suggestions = [
        {
            city: "Victoria Falls",
            price: "8,000 ZAR",
            dates: "5 Feb - 10 Feb",
            time: "1 stop · 6 h 30 min",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi8NqGvUqSW90qYKqluohB9w66pt88sldYiUBt0qu1UKXuceImVFzY6CfPhzNc9W2TqbM&usqp=CAU",
        },
        {
            city: "Nairobi",
            price: "9,500 ZAR",
            dates: "10 Feb - 17 Feb",
            time: "2 stops · 12 h 15 min",
            img: "https://www.andbeyond.com/wp-content/uploads/sites/5/giraffe-and-sky-line-nairobi.jpg",
        },
        {
            city: "Cairo",
            price: "7,800 ZAR",
            dates: "15 Feb - 22 Feb",
            time: "1 stop · 8 h 45 min",
            img: "https://www.touristegypt.com/wp-content/uploads/2023/03/giza-pyramids-cairo-egypt-with-palm-1024x634.jpg",
        },
        {
            city: "Accra",
            price: "6,200 ZAR",
            dates: "20 Feb - 28 Feb",
            time: "3 stops · 16 h 20 min",
            img: "https://cdn.britannica.com/21/128421-050-BD03AB22/Accra-Ghana.jpg",
        },
    ];

    const tileLayerUrl =
        thememode === 'dark'
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' // Dark theme tiles
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Light theme tiles

    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CustomText customVariant="title3">
                    {`Find cheap flights from ${cityName} to anywhere`}
                </CustomText>
                <Tooltip
                    title={
                        <>
                            <div>These suggestions are based on the cheapest fares to popular destinations in the next six months.</div>
                            <div>Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply.</div>
                        </>
                    }
                    arrow
                >
                    <IconButton size="small">
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', marginTop: '24px' }}>
                <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    style={{ height: '100%', width: '100%' }}
                    attributionControl={false}
                >
                    <TileLayer
                        url={tileLayerUrl}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </Box>
            <StyledGridContainer>
                {suggestions.map((suggestion, index) => (
                    <StyledCard key={index}>
                        <StyledCardMedia image={suggestion.img} />
                        <CardContent>
                            <StyledBox>
                                <CustomText customVariant='title4'>{suggestion.city}</CustomText>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {suggestion.price}
                                </Typography>
                            </StyledBox>
                            <Typography variant="body2" color="text.secondary">
                                {suggestion.dates}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {suggestion.time}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}
            </StyledGridContainer>
        </StyledContainer>
    );
};

export default CheapFlights;

const StyledContainer = styled(Box)(() => ({
    borderRadius: '8px',
    width: '100%',
    marginTop: '54px',
}));

const StyledGridContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px',
    marginTop: '32px',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: 'none',
    border: 'none',
    padding: '0px',
    margin: '0px',
    backgroundColor: theme.palette.mode === 'dark' ? '#202124' : theme.palette.background.default,
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const StyledCardMedia = styled(CardMedia)(() => ({
    borderRadius: '16px',
    height: 180,
    objectFit: 'cover',
}));

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
}));