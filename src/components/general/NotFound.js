import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
function NotFound() {
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
          fontWeight="bold"
        >
          404
        </Typography>
        <Typography
          variant="h2"
          component="span"
          gutterBottom
          color={theme.palette.secondary.main}
          marginLeft="10px"
        >
          Not Found
        </Typography>
      </Box>
    </>
  );
}

export default NotFound;
