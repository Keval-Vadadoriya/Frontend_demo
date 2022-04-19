import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/styles";

function Loading() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "91.5vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.fifth.light,
        }}
      >
        <CircularProgress size={100} disableShrink />
      </Box>
    </>
  );
}

export default Loading;
