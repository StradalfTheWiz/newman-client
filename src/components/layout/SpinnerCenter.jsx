import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SpinnerCenter = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
      <CircularProgress size={100} />
    </Box>
  );
};

export default SpinnerCenter;
