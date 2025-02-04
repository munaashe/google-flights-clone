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
};

interface Carrier {
    id: number;
    alternateId: string;
    logoUrl: string;
    name: string;
}

interface Segment {
    id: string;
    origin: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
            flightPlaceId: string;
            displayCode: string;
            name: string;
            type: string;
        };
        name: string;
        type: string;
        country: string;
    };
    destination: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
            flightPlaceId: string;
            displayCode: string;
            name: string;
            type: string;
        };
        name: string;
        type: string;
        country: string;
    };
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
}

interface Leg {
    id: string;
    origin: {
        id: string;
        entityId: string;
        name: string;
        displayCode: string;
        city: string;
        country: string;
        isHighlighted: boolean;
    };
    destination: {
        id: string;
        entityId: string;
        name: string;
        displayCode: string;
        city: string;
        country: string;
        isHighlighted: boolean;
    };
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
        marketing: Carrier[];
        operationType: string;
    };
    segments: Segment[];
}

interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
}

interface FlightPrice {
    raw: number;
    formatted: string;
    pricingOptionId: string;
}

export interface Itinerary {
    id: string;
    price: FlightPrice;
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    fareAttributes: Record<string, any>;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
}