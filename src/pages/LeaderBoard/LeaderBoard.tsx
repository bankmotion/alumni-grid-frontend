import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ShareIcon from "@mui/icons-material/Share";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderHistory } from "../../reducers/game.slice";

import { GameSetting } from "../../models/interface";
import { convertPSTTime } from "../../utils/utils";
import { Version } from "../../config/config";

const LeaderBoard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [dataList, setDataList] = useState<GameSetting[]>([]);
  const [currentData, setCurrentData] = useState<GameSetting | null>(null);
  const [shareText, setShareText] = useState<string>("");
  const { allLeaderHistory } = useAppSelector((state) => state.game);

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

  const handleNavigation = (timeStamp: number) => {
    navigate(`/game?timestamp=${timeStamp}`);
  };

  const goGameBoard = () => {
    navigate("/game");
  };

  useEffect(() => {
    let data: GameSetting[] = [];
    try {
      data = JSON.parse(localStorage.getItem(`dataList${Version}`)) || [];
    } catch (err) {}

    setDataList(data);
  }, []);

  useEffect(() => {
    let data: GameSetting | null = null;
    try {
      const storedData = localStorage.getItem(`Data${Version}`);
      data = storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }

    setCurrentData(data);
  }, []);
  console.log("currentdata", currentData);

  const calculatePlayerPercentile = (score: number) => {
    const allScores = combineData
      .map((entry) => entry.gameSetting?.score || 0)
      .sort((a, b) => b - a);

    const rank = allScores.findIndex((playerScore) => playerScore === score);

    if (rank === -1 || allScores.length === 0) {
      return 0;
    }

    const percentile = (rank / allScores.length) * 100;
    return Math.min(Math.round(100 - percentile), 100);
  };

  console.log({ combineData, allLeaderHistory });
  const userPercentitle = calculatePlayerPercentile(currentData?.score || 0);

  const generateShareableText = useCallback(() => {
    if (!currentData) return;

    const gridVisualization = currentData.playerList
      .map((player) => (player.rightStatus === "none" ? "⬜" : "🟩"))
      .reduce((rows, current, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(current);
        return rows;
      }, [])
      .map((row) => " " + row.join(" "))
      .join("\n");

    const text =
      `🏀 Alumni Grid \n` +
      ` Score: ${currentData.score}\n` +
      `${gridVisualization}\n` +
      ` Play at:\n` +
      ` ` +
      `https://alumnigrid.com/game`.trim();

    setShareText(text);
  }, [currentData]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        Toastify({
          text: "Grid details copied to clipboard!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  useEffect(() => {
    generateShareableText();
  }, [generateShareableText]);
  return (
    <Box className={classes.leaderboardPage}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Summary
        </Typography>
        <Button
          className={classes.backButton}
          variant="contained"
          onClick={goGameBoard}
        >
          <Box component={"span"}>
            <ReplyAllIcon />
          </Box>{" "}
          <Box component={"span"} className={classes.onlyDesktop}>
            Back
          </Box>
        </Button>
      </Box>

      <Box className={classes.userSummary}>
        <Typography className={classes.score}>
          Your Score: {currentData?.score || 0}
        </Typography>
        {/* <Typography variant="h4">
          Percentile:
          {userPercentitle}
          th Percentile
        </Typography> */}
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
              {/* <Box className={classes.gridContent}>
                <Typography variant="body1">
                  {player.firstname} {player.lastname}
                </Typography>
              </Box> */}
            </Box>
          ))}
        </Box>
        <Box className={classes.shareButtonContainer}>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            className={classes.shareButton}
            onClick={copyToClipboard}
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
              {/* <th>Percentile</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {combineData.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{convertPSTTime(entry.timeStamp)}</td>
                  <td>{entry.gameSetting?.score || 0}</td>
                  {/* <td>{calculatePlayerPercentile(entry.gameSetting?.score)}</td> */}
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
                        ? "Completed"
                        : !entry.gameSetting?.createTime
                        ? "Play Now!"
                        : "In-Game"}
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
