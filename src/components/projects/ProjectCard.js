import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  projectCard: {
    margin: "5px",
    border: "1px dashed black",
    borderRadius: "20px",
    zIndex: 1,
    transition: "all 0.5s ease",
    "&:hover": {
      transform: "scale(0.98)",

      borderRadius: "30px",
      backgroundColor: theme.palette.third.light,
    },
  },
}));

function ProjectCard({ project }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Card className={classes.projectCard}>
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
          Requirement
        </Typography>
        <Typography
          display="inline"
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Arvo", margin: "5px" }}
        >
          :-
          {project.profession}
        </Typography>
        <br />
        <Typography variant="body2" display="inline" color="black">
          Location
        </Typography>
        <Typography
          display="inline"
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Arvo", margin: "5px" }}
        >
          :- {project.location}
        </Typography>
        <br />
        <Typography variant="body2" display="inline" color="black">
          Description
        </Typography>
        <Typography
          display="inline"
          variant="body2"
          color="text.secondary"
          sx={{ wordBreak: "break-all", fontFamily: "Arvo", margin: "5px" }}
        >
          :- {project.description}
        </Typography>
        <br />
        <Typography variant="body2" display="inline" color="black">
          Pay
        </Typography>

        <Typography
          display="inline"
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Arvo", margin: "5px" }}
        >
          :- {project.money}$
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          component={Link}
          to={`/chats/${project.owner}`}
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
          Chat
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
