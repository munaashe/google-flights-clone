import React from "react";
import {
  Box,
  Skeleton,
  LinearProgress,
  Typography,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Itinerary as ItineraryType, SearchState } from "../../../utils/types";
import FlightList from "../../components/flight-list";

interface FlightResults {
  data: {
    itineraries: ItineraryType[];
  };
}

interface Props {
  loading: boolean;
  flightResults: FlightResults;
  error: boolean;
  searchState: SearchState;
}

const Results = ({
  searchState,
  loading,
  flightResults,
  error,
}: Props) => {
  const [itineraries, setItineraries] = React.useState<ItineraryType[]>([]);

  React.useEffect(() => {
    if (flightResults) {
      setItineraries(flightResults.data.itineraries);
    }
  }, [flightResults]);

  if (error) return <p>Error Loading Page</p>;

  if (loading)
    return (
      <>
        <Box sx={{ width: "100%", minHeight: "80vh" }}>
          <LinearProgress />
        </Box>
        <Box sx={{ maxWidth: "90%", mx: "auto", p: 2, height: "100vh" }}>
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        </Box>
      </>
    );

  return (
    <>
      <SearchContainer>
        <TripTypeContainer>
          {/* Display Trip Type */}
          <Typography variant="h6">{searchState.tripType}</Typography>

          {/* Display Passengers */}
          <Box display="flex" alignItems="center">
            <PersonIcon />
            <Typography variant="body1">
              {Object.values(searchState.passengers).reduce((a, b) => a + b, 0)}{" "}
              Passengers
            </Typography>
          </Box>

          {/* Display Travel Class */}
          <Typography variant="body1">{searchState.classType}</Typography>
        </TripTypeContainer>

        <TripDetailsContainer>
          {/* Display Departure */}
          <Typography variant="body1">
            From: {searchState.places.departure}
          </Typography>
          <Typography variant="body1">
            Departure Date: {searchState.dates.departure}
          </Typography>

          {/* Display Return if it's a Round Trip */}
          {searchState.tripType === "Round trip" && (
            <Typography variant="body1">
              Return Date: {searchState.dates.return}
            </Typography>
          )}

          {/* Display Destination */}
          <Typography variant="body1">
            To: {searchState.places.destination}
          </Typography>
        </TripDetailsContainer>
      </SearchContainer>

      {/* Render the FlightList Component */}
      <FlightList itineraries={itineraries} />
    </>
  );
};

export default Results;

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: "12px",
  padding: "16px",
  boxShadow: "0px 2px 4px rgba(1,0,0,0.5)",
  borderRadius: "8px",
  width: "100%",
  marginTop: "54px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "#37373a"
      : theme.palette.background.paper,
  [theme.breakpoints.up("md")]: {
    padding: "42px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "42px",
  },
  position: "relative",
}));

const TripTypeContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const TripDetailsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  paddingBottom: "24px",
});