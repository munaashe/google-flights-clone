export interface Passengers {
    adults: number;
    children: number;
    infantsSeat: number;
    infantsLap: number;
};

export interface FetchFlightsProps {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    departureDate: string;
    returnDate?: string;
    cabinClass: string;
    adults: number;
}



interface Places {
    departure: string;
    destination: string;
}

export interface Dates {
    departure: string;
    return: string;
}

export interface SearchState {
    tripType: 'Round trip' | 'One way';
    passengers: Passengers;
    classType: 'Economy' | 'Business' | 'First Class';
    places: Places;
    dates: Dates
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
}