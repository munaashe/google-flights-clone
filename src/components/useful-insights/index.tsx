import { Box, styled } from "@mui/material";
import CustomText from "../ui-components/text";
import {
    CalendarMonthOutlined,
    LineAxisOutlined,
    AddAlarmOutlined
} from '@mui/icons-material';
import { useEffect, useState } from "react";

interface ToolItem {
    title: string;
    details: string;
    icon: React.ReactNode | string;
}

const UsefulInsights = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [message, setMessage] = useState<ToolItem | null>(null);
    useEffect(() => {
        setMessage(messages[selectedIndex])
    }, [selectedIndex]);

    const toolItems: ToolItem[] = [
        {
            title: 'Find the cheapest days to fly',
            details: 'The Date grid and Price graph make it easy to see the best flight deals',
            icon: <CalendarMonthOutlined />
        },
        {
            title: 'See the whole picture with price insights',
            details: 'Price history and trend data show you when to book to get the best price on your flight',
            icon: <LineAxisOutlined />
        },
        {
            title: 'Track prices for a trip',
            details: 'Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.',
            icon: <AddAlarmOutlined />
        }
    ];

    const messages: ToolItem[] = [
        {
            title: 'Insightful tools help you choose your trip dates',
            details: 'If your travel plans are flexible, use the form above to start searching for a specific trip. Then, play around with the Date grid and Price graph options on the Search page to find the cheapest days to get to your destination – and back again for round trips.',
            icon: '/assets/images/message1.png'
        },
        {
            title: 'Get smart insights about flight prices',
            details: 'Real-time insights can tell you if a fare is lower or higher than usual, and if the fare you’re seeing is a good price. So, you don’t have to worry about paying too much for a flight or missing out on the cheapest time to book. On some routes, you might also see historical data that helps you better understand how flight prices vary over time.',
            icon: '/assets/images/message2.png'
        },
        {
            title: 'Monitor flight prices and make sure you never miss a price change',
            details: "Effortlessly track prices for specific travel dates or for any dates, if your plans are flexible, to uncover the best deals. You can easily set up tracking for multiple routes while searching for flights and opt-in to receive email updates when the price changes. Once that's done, you can come back to your Tracked Flights page to monitor prices whenever you like, or relax knowing you’ll never miss a flight deal.",
            icon: '/assets/images/message3.png'
        }
    ]

    return (
        <StyledContainer>
            <CustomText customVariant="title3">
                Useful tools to help you find the best deals
            </CustomText>
            <PageContainer>
                <ToolsContainer>
                    {toolItems.map((tool, index) => (
                        <ToolItemContainer key={index} onClick={() => setSelectedIndex(index)}>
                            <IconContainer>
                                {tool.icon}
                            </IconContainer>
                            <div style={{ maxWidth: '240px' }}>
                                <CustomText customVariant="title5">
                                    {tool.title}
                                </CustomText>
                                <CustomText customVariant="body2" sx={{ paddingTop: '8px' }}>
                                    {tool.details}
                                </CustomText>
                            </div>
                        </ToolItemContainer>
                    ))}
                </ToolsContainer>
                {message && <div style={{ width: '70%' }}>
                    <CustomText customVariant="title4">
                        {message.title}
                    </CustomText>
                    <CustomText customVariant="body2" sx={{ paddingTop: '8px' }}>
                        {message.details}
                    </CustomText>
                    <img
                        src={message.icon as string}
                        alt=""
                        style={{ width: '100%', objectFit: 'cover', height: '240px', marginTop: '24px' }}
                    />
                </div>}
            </PageContainer>

        </StyledContainer>
    )
}

export default UsefulInsights

const StyledContainer = styled(Box)(() => ({
    marginTop: '54px',
    padding: '0px'
}));

const PageContainer = styled(Box)(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    width: '100%',
    alignItems: 'center',
    justifyItems: 'center',
    '@media(min-width: 768px)': {
        gridTemplateColumns: '1fr 2fr',
        justifyItems: 'start',
    }
}));

const ToolsContainer = styled(Box)(() => ({
    marginTop: '24px',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: '1fr', // Single column by default
    '@media(min-width: 768px)': {
        width: '100%', // Ensure it takes full width on smaller screens
        paddingRight: '24px', // Add padding on the right
    }
}));

const ToolItemContainer = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    padding: '24px',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    gap: '16px',
    cursor: 'pointer'
}));

const IconContainer = styled(Box)(() => ({
    color: '#4285F4',
    fontSize: '24px'
}));