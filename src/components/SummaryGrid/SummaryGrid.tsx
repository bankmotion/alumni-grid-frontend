import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import useStyles from "./styles";
import ShareIcon from "@mui/icons-material/Share";
import { GameSetting } from "../../models/interface";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderHistory } from "../../reducers/game.slice";
import { PlayType, PlayTypeInfo } from "../../constant/const";

const SummaryGrid = ({
  playType,
  gameSetting,
}: {
  playType: PlayType;
  gameSetting: GameSetting;
}) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const [shareText, setShareText] = useState<string>("");

  const { allLeaderHistory } = useAppSelector((state) => state.game);

  const generateShareableText = useCallback(() => {
    if (!gameSetting) return;

    const gridVisualization = gameSetting.playerList
      .map((player) => (player.rightStatus === "none" ? "⬜" : "🟩"))
      .reduce((rows, current, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(current);
        return rows;
      }, [])
      .map((row) => " " + row.join(" "))
      .join("\n");

    const text =
      `${playType === PlayType.NBA ? "🏀" : "🏈"} Alumni Grid - ${
        PlayTypeInfo[playType].up
      } \n` +
      ` Score: ${gameSetting.score}\n` +
      `${gridVisualization}\n` +
      ` Play at:\n` +
      ` ` +
      `https://alumnigrid.com/game/${PlayTypeInfo[playType].lo}`.trim();

    setShareText(text);
  }, [gameSetting, playType]);

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

  const getPercent = (timestamp: number, playerId: number) => {
    const gameData = allLeaderHistory.find(
      (history) => history.timeStamp === timestamp
    );

    if (!gameData) return 0;
    const playerData = gameData.players.find(
      (player) => player.id === playerId
    );
    if (!playerData) return 0;

    return playerData.playingCount === 0
      ? 0
      : Math.floor((playerData.correctCount / playerData.playingCount) * 100);
  };

  useEffect(() => {
    dispatch(getLeaderHistory({ playType }));
  }, [dispatch, playType]);

  useEffect(() => {
    generateShareableText();
  }, [generateShareableText]);

  return (
    <Box className={classes.gridSummary}>
      {/* <Typography variant="h5">Game Summary</Typography> */}
      <Box className={classes.gridContainer}>
        {gameSetting?.playerList.map((player, index) => (
          <Box
            key={index}
            className={`${classes.gridItem} ${
              player.rightStatus === "none"
                ? classes.gridItem
                : classes.correctBox
            }`}
          ></Box>
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
      <Box sx={{ marginTop: "24px" }}>Accuracy Table</Box>
      <Box className={classes.gridWithPercent}>
        {gameSetting?.playerList.map((player, index) => (
          <Box key={index} className={classes.gridItem}>
            <Box className={classes.percentBox}>
              {getPercent(gameSetting.createTime, player.playerId)}%
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SummaryGrid;
