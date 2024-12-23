import { useEffect, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Share as ShareIcon } from "@mui/icons-material";
import useStyles from "./styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderHistory } from "../../reducers/game.slice";

import { GameSetting } from "../../models/interface";

const LeaderBoard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [dataList, setDataList] = useState<GameSetting[]>([]);
  const [currentData, setCurrentData] = useState<GameSetting | null>(null);
  const { allLeaderHistory, isGettingAllLeaderHistory } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(getLeaderHistory());
  }, [dispatch]);

  const combineData = allLeaderHistory
    .map((backendEntry) => {
      const localEntry = dataList.find(
        (local) => local.createTime === backendEntry.timeStamp
      );

      return {
        timeStamp: backendEntry.timeStamp,
        players: backendEntry.players,
        gameSetting: localEntry,
      };
    })
    .sort((a, b) => b.timeStamp - a.timeStamp);

  // const handleNavigation = (entry, isCurrentGame, isGameFinished) => {
  //   if (isCurrentGame || isGameFinished) {
  //     navigate("/game", {
  //       state: { currentData: entry, allLeaderHistory },
  //     });
  //   } else {
  //     alert("This game is archived and cannot be continued.");
  //   }
  // };

  // const handleNavigation = (timestamp) => {
  //   if (timestamp) {
  //     navigate(`/game/${timestamp}`);
  //   }
  // };

  const handleNavigation = (timeStamp: number) => {
    navigate(`/game?timestamp=${timeStamp}`);
  };

  const goGameBoard = () => {
    navigate("/game");
  };
  useEffect(() => {
    let data: GameSetting[] = [];
    try {
      data = JSON.parse(localStorage.getItem("dataList")) || [];
    } catch (err) {}

    setDataList(data);
  }, []);

  useEffect(() => {
    let data: GameSetting | null = null;
    try {
      const storedData = localStorage.getItem("Data");
      data = storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }

    setCurrentData(data);
  }, []);
  console.log("currentdata", currentData);

  return (
    <Box className={classes.leaderboardPage}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Leaderboard
        </Typography>
        {/* <Link to={"/game"}>
          <Button className={classes.backButton} variant="contained">
            Back
          </Button>
        </Link> */}
        <Button
          className={classes.backButton}
          variant="contained"
          onClick={goGameBoard}
        >
          Back
        </Button>
      </Box>

      <Box className={classes.userSummary}>
        <Typography variant="h4">
          Your Score: {currentData?.score || 0}
        </Typography>
        <Typography variant="h4">
          Percentile:
          {Math.min(Math.round(((currentData?.score || 0) / 1000) * 100), 100)}
          th Percentile
        </Typography>
      </Box>

      <Box className={classes.gridSummary}>
        <Typography variant="h5">Game Summary</Typography>
        <Box className={classes.gridContainer}>
          {currentData?.playerList.map((player, index) => (
            <Box
              key={index}
              className={`${classes.gridItem} ${
                player.rightStatus === "none"
                  ? classes.gridItem
                  : classes.correctBox
              }`}
            >
              <Box className={classes.gridContent}>
                <Typography variant="body1">
                  {player.firstname} {player.lastname}
                </Typography>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {combineData.map((entry, index) => {
              console.log(entry);
              return (
                <tr key={index}>
                  <td>{`Grid ${index + 1}`}</td>
                  <td>
                    {new Date(entry.timeStamp * 1000).toLocaleDateString()}
                  </td>
                  <td>{entry.gameSetting?.score || 0}</td>
                  <td>
                    {entry.players.length * 100} {/* Example score */}
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color={
                        entry.gameSetting?.endStatus
                          ? "success"
                          : !entry.gameSetting?.createTime
                          ? "secondary"
                          : "primary"
                      }
                      onClick={() => {
                        handleNavigation(entry.timeStamp);
                      }}
                    >
                      {entry.gameSetting?.endStatus
                        ? "Archived"
                        : !entry.gameSetting?.createTime
                        ? "Play Now!"
                        : "Continuing"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default LeaderBoard;
