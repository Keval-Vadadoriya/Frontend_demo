import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";

function MyProjectCard({ project, removeProjectHandler }) {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:600px)");
  const [removeProject, setRemoveProject] = useState(false);

  const handleRemoveProjectClose = () => {
    setRemoveProject(false);
  };
  return (
    <Container>
      <Card
        sx={{
          margin: "5px",
          border: "1px dashed black",
          borderRadius: "20px",
          transition: "all 0.5s ease",
          "&:hover": {
            transform: "scale(1.03)",
            borderRadius: "40px",
            backgroundColor: theme.palette.third.light,
          },
        }}
      >
        <CardContent sx={{ padding: "20px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: "Arvo",
              margin: "5px",
              color: theme.palette.secondary.main,
            }}
          >
            {project.project_name}
          </Typography>
          <Typography variant="body2" display="inline" color="black">
            Requirement :-
          </Typography>
          <Typography
            variant="body2"
            display="inline"
            color="text.secondary"
            sx={{ fontFamily: "Arvo", margin: "5px" }}
          >
            {project.profession}
          </Typography>
          <br />
          <Typography variant="body2" display="inline" color="black">
            Location :-
          </Typography>
          <Typography
            variant="body2"
            display="inline"
            color="text.secondary"
            sx={{ fontFamily: "Arvo", margin: "5px" }}
          >
            {project.location}
          </Typography>
          <br />
          <Typography variant="body2" display="inline" color="black">
            Description :-
          </Typography>
          <Typography
            variant="body2"
            display="inline"
            color="text.secondary"
            sx={{ wordBreak: "break-all", fontFamily: "Arvo", margin: "5px" }}
          >
            {project.description}
          </Typography>
          <br />
          <Typography variant="body2" display="inline" color="black">
            Pay :-
          </Typography>
          <Typography
            variant="body2"
            display="inline"
            color="text.secondary"
            sx={{ fontFamily: "Arvo", margin: "5px" }}
          >
            {project.money}$
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setRemoveProject(true);
            }}
            sx={{
              marginLeft: "15px",
              textDecoration: "none",
              color: "white",
              width: "100px",
              textAlign: "center",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.third.extra,
                color: theme.palette.secondary.main,
              },
            }}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
      <Dialog
        fullScreen={matches}
        open={removeProject}
        onClose={handleRemoveProjectClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.third.light,
            fontFamily: "Arvo",
          }}
        >
          Remove Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText marginTop={3}>
            Are You Sure You Want to Remove Project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveProjectClose}>Cancel</Button>
          <Button onClick={removeProjectHandler.bind(null, project._id)}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyProjectCard;
