import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Share as ShareIcon } from "@mui/icons-material";
import useStyles from "./styles";

const LeaderBoard = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.leaderboardPage}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Leaderboard
        </Typography>
        <Link to={"/game"}>
          <Button className={classes.backButton} variant="contained">
            Back
          </Button>
        </Link>
      </Box>

      <Box className={classes.userSummary}>
        <Typography variant="h4">Your Score: {800}</Typography>
        <Typography variant="h4">Percentile: {80}th Percentile</Typography>
      </Box>

      <Box className={classes.gridSummary}>
        <Typography variant="h5">Game Summary</Typography>
        <Box className={classes.gridContainer}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Box key={index} className={classes.gridItem}>
              <Box className={classes.gridContent}>
                <Typography variant="body1">Box {index + 1}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className={classes.shareButtonContainer}>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            className={classes.shareButton}
            //onClick={() => handleShare()}
          >
            Share Grid
          </Button>
        </Box>
      </Box>

      <Box className={classes.achieveTable}>
        <Typography variant="h5" className={classes.tableTitle}>
          Achievement Table
        </Typography>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Grid</th>
              <th>Date</th>
              <th>Score</th>
              <th>Rarity</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                grid: "Grid 1",
                date: "2024-12-18",
                score: 800,
                rarity: "Rare",
              },
              {
                grid: "Grid 2",
                date: "2024-12-19",
                score: 750,
                rarity: "Epic",
              },
              {
                grid: "Grid 3",
                date: "2024-12-20",
                score: 900,
                rarity: "Legendary",
              },
            ].map((row, index) => (
              <tr key={index}>
                <td>{row.grid}</td>
                <td>{row.date}</td>
                <td>{row.score}</td>
                <td>{row.rarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default LeaderBoard;
