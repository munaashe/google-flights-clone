import { Typography, Tooltip, Button, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Itinerary } from "../../../utils/types";
import { styled } from "@mui/system";

interface Props {
    itineraries: Itinerary[];
}

const FlightList = ({ itineraries }: Props) => {
    return (
        <StyledStack spacing={2}>
            {itineraries.map((itinerary) => (
                <FlightCard key={itinerary.id}>
                    {/* Airline Logo and Details */}
                    <AirlineInfo>
                        <AirlineLogo
                            src={itinerary.legs[0].carriers.marketing[0].logoUrl}
                            alt={itinerary.legs[0].carriers.marketing[0].name}
                        />
                        <AirlineDetails>
                            <Typography variant="subtitle2" color="text.primary">
                                {itinerary.legs[0].carriers.marketing[0].name}
                            </Typography>
                            {itinerary.legs.length > 1 && (
                                <Typography variant="body2" color="text.secondary">
                                    Multiple Airlines
                                </Typography>
                            )}
                        </AirlineDetails>
                    </AirlineInfo>

                    {/* Flight Times and Duration */}
                    <FlightTimes>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {new Date(itinerary.legs[0].departure).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(itinerary.legs[0].arrival).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            {itinerary.legs[0].timeDeltaInDays > 0 && (
                                <span> +{itinerary.legs[0].timeDeltaInDays}</span>
                            )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {Math.floor(itinerary.legs[0].durationInMinutes / 60)}h{" "}
                            {itinerary.legs[0].durationInMinutes % 60}m
                        </Typography>
                    </FlightTimes>

                    {/* Stops */}
                    <StopsInfo>
                        <Typography variant="body2" color="text.secondary">
                            {itinerary.legs[0].stopCount === 0
                                ? "Non-stop"
                                : `${itinerary.legs[0].stopCount} stop${itinerary.legs[0].stopCount > 1 ? "s" : ""
                                }`}
                        </Typography>
                    </StopsInfo>

                    {/* CO2 Emissions */}
                    <EmissionsInfo>
                        <Tooltip title="Estimated CO2 emissions for this flight">
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                            >
                                806 kg CO₂e <InfoIcon fontSize="small" />
                            </Typography>
                        </Tooltip>
                        <Typography variant="body2" color="success.main">
                            -15% emissions
                        </Typography>
                    </EmissionsInfo>

                    {/* Price */}
                    <PriceInfo>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "blue" }}>
                            {itinerary.price.formatted}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            round trip
                        </Typography>
                    </PriceInfo>
                </FlightCard>
            ))}

            {/* View More Button */}
            <Button variant="outlined" sx={{ marginTop: 2 }}>
                View more flights
            </Button>
        </StyledStack>
    );
};

export default FlightList;

const StyledStack = styled(Stack)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
}));

const FlightCard = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.background.paper,
}));

const AirlineInfo = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
}));

const AirlineLogo = styled("img")(() => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
}));

const AirlineDetails = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
}));

const FlightTimes = styled("div")(() => ({
    textAlign: "center",
}));

const StopsInfo = styled("div")(() => ({
    textAlign: "center",
}));

const EmissionsInfo = styled("div")(() => ({
    textAlign: "center",
}));

const PriceInfo = styled("div")(() => ({
    textAlign: "right",
}));