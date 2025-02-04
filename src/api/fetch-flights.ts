import { FetchFlightsProps } from "../../utils/types";

const API_BASE_URL = import.meta.env.VITE_SKY_SCRAPPER_BASE_URL;
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = "sky-scrapper.p.rapidapi.com";

/**
 * Fetch airport suggestions for autocomplete input.
 * @param query - User input (city or airport name).
 */
const fetchAirportSuggestions = async (query: string) => {
    if (!query) return [];

    const url = new URL(`${API_BASE_URL}searchAirport`);
    url.searchParams.append("query", query);
    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch airport suggestions");
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching airport suggestions:", error);
        return [];
    }
};

/**
 * Fetch flight details based on user search.
 * Supports both one-way and round-trip searches.
 * @param params - Flight search parameters.
 */
const fetchFlights = async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    departureDate,
    returnDate,
}: FetchFlightsProps) => {
    const url = new URL(`${API_BASE_URL}searchFlights`);
    url.searchParams.append("originSkyId", originSkyId);
    url.searchParams.append("destinationSkyId", destinationSkyId);
    url.searchParams.append("originEntityId", originEntityId);
    url.searchParams.append("destinationEntityId", destinationEntityId);
    url.searchParams.append("date", departureDate);

    if (returnDate) {
        url.searchParams.append("returnDate", returnDate);
    }

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch flights");
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
    }
};
export { fetchAirportSuggestions, fetchFlights };