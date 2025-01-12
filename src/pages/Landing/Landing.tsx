import { Box, Button, Typography } from "@mui/material";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <Box className={classes.landingBoard}>
      <Box className={classes.content}>
        <Typography className={classes.gameTitle}>
          Welcome to the AlumniGrid
        </Typography>
        <Box className={classes.description}>
          AlumniGrid is a daily sports trivia game.
          <br />
          Each day 9 athletes are prompted and tap a Square to guess the college
          the player went to.
          <br />
          If they didn’t attend college, name the high school or last school
          attended.
          <br />
          If they attended to multiple colleges, select the most recent school
          attended.
          <br />
          <br />
          Max 9 guesses per day.
          <br />
          Max 100 points per box for a correct answer.
          <br />
          The faster you complete, the higher the possible score.
          <br />
          <br />
          Head over to the summary page to share your grid with friends, view
          statistics, and play prior day grids!
          <br />
          <br />
          <strong>
            Come back tomorrow for a new grid! Refreshes at 12am PST
          </strong>
          <br />
          <br />
          <strong>
            Note: The game is currently in beta. Only the NBA grid is available
            at this time. Stay tuned…
          </strong>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
          onClick={handleStartGame}
        >
          Start Game
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
