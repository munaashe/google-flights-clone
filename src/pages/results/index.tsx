//import React from 'react'
import {
  Box,
  Skeleton
} from "@mui/material";
interface Props {
  loading: boolean;
  flightResults: any[];
}

const Results = ({
  loading,
  flightResults
}: Props) => {

  console.log(flightResults)
  if (loading) return <>
    <Box sx={{ maxWidth: "90%", mx: "auto", p: 2, height: "100vh" }}>
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />
    </Box>
  </>
  return (
    <div>
      results page
    </div>
  )
}

export default Results
