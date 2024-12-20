import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { clsx } from "clsx";

import CollegeModal from "../../components/CollegeModal/CollegeModal";

import useStyles from "./styles";
import { GameSetting, PlayerInfo } from "../../models/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollegeList, getHistoryList } from "../../reducers/game.slice";
import {
  DECREASE_TIME,
  DURATION_TIME,
  MAX_COUNT,
  MAX_SCORE_PER_QUE,
  MIN_SCORE_PER_QUE,
  SERVER_URL,
} from "../../config/config";
import { getRemainTimeStr } from "../../utils/utils";

const GameBoardIndex = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const [targetItem, setTargetItem] = useState<PlayerInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [remainTime, setRemainTime] = useState(0);

  const [gameSetting, setGameSetting] = useState<GameSetting>({
    createTime: 0,
    remainCount: MAX_COUNT,
    score: 0,
    endStatus: false,
    playerList: [],
  });

  const { history } = useAppSelector((state) => state.game);

  const handleCollegeSelect = async (collegeName: string) => {
    try {
      if (targetItem) {
        console.log(targetItem);

        setIsConfirming(true);
        const response = await axios.post(`${SERVER_URL}/game/college`, {
          id: targetItem.playerId,
          college: collegeName,
        });
        setIsConfirming(false);

        const status = response.data.message as boolean;

        setGameSetting((prevSetting: GameSetting) => {
          const updatedList = prevSetting.playerList.map((player) => {
            if (player.playerId !== targetItem.playerId) return player;
            else if (status) {
              return { ...player, rightStatus: collegeName };
            } else {
              const updatedWrongStatus = [...(player.wrongStatus || [])];
              updatedWrongStatus.push(collegeName);
              return { ...player, wrongStatus: updatedWrongStatus };
            }
          });

          return {
            ...prevSetting,
            playerList: updatedList,
            remainCount: prevSetting.remainCount - 1,
          };
        });
      }
    } catch (err) {
      console.error("Error fetching game/college post:", err);
      setIsConfirming(false);
    }
  };

  const loadDataFromLocalStorage = useCallback(() => {
    if (history.items.length === 0) return;

    const dataStr = localStorage.getItem("Data");

    if (dataStr) {
      try {
        const data = JSON.parse(dataStr) as GameSetting;
        console.log("Parsed localstorage data:", data);

        if (data.createTime && history.startTimestamp === data.createTime) {
          setGameSetting({
            playerList: data.playerList,
            remainCount: data.remainCount,
            score: data.score,
            createTime: data.createTime,
            endStatus: data.endStatus,
          });
        } else {
          setGameSetting({
            playerList: history.items,
            remainCount: MAX_COUNT,
            score: 0,
            createTime: history.startTimestamp,
            endStatus: false,
          });
        }
      } catch (err) {
        console.error("Error parsing local storage data:", err);
        setGameSetting({
          playerList: history.items,
          remainCount: MAX_COUNT,
          score: 0,
          createTime: history.startTimestamp,
          endStatus: false,
        });
      }
    } else {
      setGameSetting({
        playerList: history.items,
        remainCount: MAX_COUNT,
        score: 0,
        createTime: history.startTimestamp,
        endStatus: false,
      });
    }
  }, [history]);

  const selectItem = useCallback(
    (item: PlayerInfo) => {
      if (gameSetting.endStatus) {
        toast(
          "The game has concluded. Please try again after the remaining time has elapsed."
        );
        return;
      }
      setTargetItem(item);
      setOpen(true);
    },
    [gameSetting.endStatus]
  );

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [loadDataFromLocalStorage]);

  useEffect(() => {
    if (gameSetting.createTime === 0) return;
    localStorage.setItem("Data", JSON.stringify(gameSetting));
  }, [gameSetting]);

  const handleEndGame = useCallback(() => {
    const score =
      gameSetting.playerList.filter((item) => item.rightStatus !== "none")
        .length *
      Math.max(
        MAX_SCORE_PER_QUE / DECREASE_TIME,
        MIN_SCORE_PER_QUE
      );

    setGameSetting((prevSetting) => ({
      ...prevSetting,
      endStatus: true,
      score,
    }));
  }, [gameSetting.playerList]);

  useEffect(() => {
    if (gameSetting.playerList.length > 0 && targetItem) {
      const updatedItem = gameSetting.playerList.find(
        (item) => item.playerId === targetItem.playerId
      );
      setTargetItem(updatedItem);
    }
  }, [gameSetting.playerList, targetItem]);

  useEffect(() => {
    if (gameSetting.remainCount === 0) {
      handleEndGame();
    }
  }, [gameSetting.remainCount, handleEndGame]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainTime(
        DURATION_TIME - new Date().getTime() / 1000 + gameSetting.createTime
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameSetting.createTime]);

  useEffect(() => {
    dispatch(getCollegeList());
    dispatch(getHistoryList());
  }, [dispatch]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.leftPanel}></Box>
      <Box>
        <Typography variant="h3" className={classes.gameTitle}>
          AlumniGrid
        </Typography>
        <Box className={classes.gridBox}>
          {gameSetting.playerList.map((item, index) => (
            <Box
              className={clsx(
                classes.gridItem,
                item.rightStatus !== "none"
                  ? classes.correctBox
                  : gameSetting.endStatus
                  ? classes.wrongBox
                  : null
              )}
              onClick={() => selectItem(item)}
              key={index}
            >
              <PersonIcon className={classes.personAva} />
              <Box className={classes.playerName}>
                {item.firstname} {item.lastname}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={classes.rightPanel}>
        {!gameSetting.endStatus && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box className={classes.guessLeftTxt}>GUESS LEFT</Box>
            <Box className={classes.score}>{gameSetting.remainCount}</Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Box className={classes.guessLeftTxt}>SCORE</Box>
          <Box className={classes.score}>{gameSetting.score}</Box>
        </Box>
        {!gameSetting.endStatus && (
          <>
            <Button
              className={classes.giveUpBtn}
              variant="contained"
              onClick={handleEndGame}
            >
              Give Up
            </Button>
          </>
        )}
        <Box className={classes.remainTime}>{getRemainTimeStr(remainTime)}</Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CollegeModal
        open={open}
        handleOpenStatus={(open) => setOpen(open)}
        handleCollegeSelect={handleCollegeSelect}
        targetItem={targetItem}
        isConfirming={isConfirming}
      />
    </Box>
  );
};

export default GameBoardIndex;
