import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

function Unauthorized() {
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
        <Typography
          variant="h1"
          component="span"
          gutterBottom
          color={theme.palette.secondary.main}
          marginLeft="10px"
        >
          Unauthorized Access
        </Typography>
      </Box>
    </>
  );
}

export default Unauthorized;
