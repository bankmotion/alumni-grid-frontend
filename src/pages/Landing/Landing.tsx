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
        <Typography variant="h3" className={classes.gameTitle}>
          Welcome to the AlmuniGrid
        </Typography>
        <Typography variant="body1" className={classes.description}>
          9 new players each day with a mix between NBA and NFL.
          <br />
          Tap a Square and guess the college the player went to.
          <br />
          If they didn’t attend college, name the high school or last form of
          education attended.
          <br />
          <br />
          Max 9 guesses per day.
          <br />
          Max 100 points per box for a correct answer.
          <br />
          The faster you complete, the higher the possible score.
          <br />
          <br />
          When you click "play now" or "continuing" button on leaderboard, you
          can play the game on that date.
          <br />
          <br />
          <strong>Come back tomorrow for a new game!</strong>
        </Typography>
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
