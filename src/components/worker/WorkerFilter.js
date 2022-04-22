import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";

const WorkerFilter = ({
  profession,
  location,
  clearFilter,
  filterWorkersBy,
  changeLocationHandler,
  changeProfessionHandler,
  review,
  changeReviewHandler,
  availability,
  changeAvailabilityHandler,
}) => {
  const theme = useTheme();
  return (
    <Box
      component="form"
      noValidate
      onSubmit={filterWorkersBy}
      sx={{
        minWidth: 160,
        maxWidth: 200,
        margin: 2,
        position: "sticky",
        top: "70px",
      }}
    >
      <Typography
        variant="h4"
        marginBottom="10px"
        sx={{ color: theme.palette.secondary.main, fontFamily: "Arvo" }}
      >
        Filter By
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="profession">Profession</InputLabel>
            <Select
              labelId="profession"
              id="profession"
              value={profession}
              label="Profession"
              onChange={changeProfessionHandler}
            >
              <MenuItem value={"none"} disabled hidden>
                {"Select Profession"}
              </MenuItem>
              <MenuItem value={"carpenter"}>{"Carpenter"}</MenuItem>
              <MenuItem value={"plumber"}>{"Plumber"}</MenuItem>
              <MenuItem value={"electrician"}>{"Electrician"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="location">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={location}
              label="Location"
              onChange={changeLocationHandler}
            >
              <MenuItem value={"none"} disabled hidden>
                {"Select Location"}
              </MenuItem>
              <MenuItem value={"surat"}>{"Surat"}</MenuItem>
              <MenuItem value={"anand"}>{"Anand"}</MenuItem>
              <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
              <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="availability">Availability</InputLabel>
            <Select
              labelId="availability"
              id="availability"
              value={availability}
              label="availability"
              onChange={changeAvailabilityHandler}
            >
              <MenuItem value={"none"} disabled hidden>
                {"Availability"}
              </MenuItem>
              <MenuItem value={true}>{"Available"}</MenuItem>
              <MenuItem value={false}>{"Not Available"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="review">review</InputLabel>
            <Select
              labelId="review"
              id="review"
              value={review}
              label="review"
              onChange={changeReviewHandler}
            >
              <MenuItem value={"none"} disabled>
                {"Select Review"}
              </MenuItem>
              <MenuItem value={0}>{">0"}</MenuItem>
              <MenuItem value={1}>{">1"}</MenuItem>
              <MenuItem value={2}>{">2"}</MenuItem>
              <MenuItem value={3}>{">3"}</MenuItem>
              <MenuItem value={4}>{">4"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.third.light,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.third.light,
              },
            }}
          >
            Apply
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.third.light,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.third.light,
              },
            }}
            onClick={clearFilter}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkerFilter;
