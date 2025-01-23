import { Box, Button, Typography } from "@mui/material";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { PlayType } from "../../constant/const";

const Landing = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const handleStartGame = (playType: PlayType) => {
    if (playType === PlayType.NBA) {
      navigate("/game/nba");
    } else if (playType === PlayType.NFL) {
      navigate("/game/nfl");
    }
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
          Each day, 9 squares containing an athlete’s name are prompted.
          <br />
          Players tap into each square and guess where each athlete went to
          college.
          <br />
          If the athlete did not go to college, guess the high school or last
          school the athlete attended.
          <br />
          If the athlete went to multiple colleges, guess the most recent school
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
            Note: The game is currently in beta. NBA and NFL grids are available
            at this time. Stay tuned…
          </strong>
        </Box>
        <Box className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            className={classes.nbaButton}
            onClick={() => {
              handleStartGame(PlayType.NBA);
            }}
          >
            Start NBA
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.nflButton}
            onClick={() => {
              handleStartGame(PlayType.NFL);
            }}
          >
            Start NFL
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
