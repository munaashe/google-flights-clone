import { FetchFlightsProps } from "../../utils/types";

const fetchFlights = async ({ origin, destination, departureDate, returnDate }: FetchFlightsProps) => {
    const url = new URL(`${import.meta.env.SKY_SCRAPPER_BASE_URL}searchFlights`);
    url.searchParams.append('origin', origin);
    url.searchParams.append('destination', destination);
    url.searchParams.append('date', departureDate);

    if (returnDate) {
        url.searchParams.append('returnDate', returnDate);
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-rapidapi-key': import.meta.env.SKY_SCRAPPER_API_KEY,
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch flights');
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const fetchDestinations = async (cityName: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_TRAVEL_ADVISOR_BASE_URL}search?query=${cityName}&limit=4`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-key': import.meta.env.SKY_SCRAPPER_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch destinations');
    return response.json();
};

export { fetchFlights, fetchDestinations }