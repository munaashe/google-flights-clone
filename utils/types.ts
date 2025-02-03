export interface Passengers {
    adults: number;
    children: number;
    infantsSeat: number;
    infantsLap: number;
};

export interface FetchFlightsProps {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
};