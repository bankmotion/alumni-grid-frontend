import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { clsx } from "clsx";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import CollegeModal from "../../components/CollegeModal/CollegeModal";
import AnswerModal from "../../components/AnswerModal/AnswerModal";

import useStyles from "./styles";
import { GameSetting, PlayerInfo } from "../../models/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollegeList, getHistoryList } from "../../reducers/game.slice";
import {
  DECREASE_TIME,
  DURATION_TIME,
  MAX_COUNT,
  SERVER_URL,
  Version,
} from "../../config/config";
import {
  getRemainTimeStr,
  getStartTimeByTimestampDaily,
} from "../../utils/utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const GameBoardIndex = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const timeStampParam = getStartTimeByTimestampDaily(
    searchParams.get("timestamp")
      ? Number(searchParams.get("timestamp"))
      : Math.floor(new Date().getTime() / 1000)
  );
  console.log(timeStampParam);

  const dispatch = useAppDispatch();

  const [targetItem, setTargetItem] = useState<PlayerInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const [spentTime, setSpentTime] = useState(0);

  const [gameSetting, setGameSetting] = useState<GameSetting>({
    createTime: 0,
    remainCount: MAX_COUNT,
    score: 0,
    endStatus: false,
    playerList: [],
    gameStartTime: 0,
  });

  const { history, isGettingHistory } = useAppSelector((state) => state.game);

  const handleCollegeSelect = useCallback(
    async (collegeName: string) => {
      try {
        if (targetItem) {
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
                return {
                  ...player,
                  rightStatus: collegeName,
                };
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
              score: status
                ? prevSetting.score +
                  Math.max(100 - Math.floor(spentTime / DECREASE_TIME), 0)
                : prevSetting.score,
            };
          });

          if (status) {
            setOpen(false);
          }
        }
      } catch (err) {
        console.error("Error fetching game/college post:", err);
        setIsConfirming(false);
      }
    },
    [spentTime, targetItem]
  );

  const loadDataFromLocalStorage = useCallback(() => {
    if (history.items.length === 0) return;

    const dataStr = localStorage.getItem(`dataList${Version}`);

    if (dataStr) {
      try {
        const dataList = JSON.parse(dataStr) as GameSetting[];
        console.log("Parsed localstorage data:", dataList);
        const data = dataList.find(
          (item) => item.createTime === history.startTimestamp
        );

        if (data.createTime && history.startTimestamp === data.createTime) {
          setGameSetting({
            playerList: data.playerList,
            remainCount: data.remainCount,
            score: data.score,
            createTime: data.createTime,
            endStatus: data.endStatus,
            gameStartTime: data.gameStartTime,
          });
        } else {
          setGameSetting({
            playerList: history.items,
            remainCount: MAX_COUNT,
            score: 0,
            createTime: history.startTimestamp,
            endStatus: false,
            gameStartTime: Math.floor(new Date().getTime() / 1000),
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
          gameStartTime: Math.floor(new Date().getTime() / 1000),
        });
      }
    } else {
      setGameSetting({
        playerList: history.items,
        remainCount: MAX_COUNT,
        score: 0,
        createTime: history.startTimestamp,
        endStatus: false,
        gameStartTime: Math.floor(new Date().getTime() / 1000),
      });
    }
  }, [history]);

  const handleEndGame = useCallback(() => {
    setGameSetting((prevSetting) => ({
      ...prevSetting,
      endStatus: true,
    }));
  }, []);

  const selectItem = useCallback(
    (item: PlayerInfo) => {
      if (gameSetting.endStatus) {
        setAnswerOpen(true);
        setTargetItem(item);
      } else {
        setTargetItem(item);
        setOpen(true);
      }
    },
    [gameSetting.endStatus]
  );

  const getDataList = () => {
    const dataListStr = localStorage.getItem(`dataList${Version}`);
    return dataListStr ? JSON.parse(dataListStr) : [];
  };

  const saveDailyData = useCallback((data: GameSetting) => {
    const dataList = getDataList();

    const existingIndex = dataList.findIndex(
      (entry: GameSetting) => entry.createTime === data.createTime
    );

    if (existingIndex !== -1) {
      dataList[existingIndex] = data;
    } else {
      dataList.push(data);
    }

    localStorage.setItem(`dataList${Version}`, JSON.stringify(dataList));
  }, []);

  const handleNavigateToLeaderboard = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [loadDataFromLocalStorage]);

  useEffect(() => {
    if (gameSetting.createTime === 0) return;
    localStorage.setItem(`Data${Version}`, JSON.stringify(gameSetting));
    saveDailyData(gameSetting);
  }, [gameSetting, saveDailyData]);

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
      setSpentTime(new Date().getTime() / 1000 - gameSetting.gameStartTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameSetting.createTime, gameSetting.gameStartTime]);

  useEffect(() => {
    dispatch(getCollegeList());
    dispatch(getHistoryList(Number(timeStampParam)));
  }, [dispatch, searchParams]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.leaderBoard}
          variant="contained"
          onClick={handleNavigateToLeaderboard}
        >
          <Box component={"span"}>
            <LeaderboardIcon />
          </Box>{" "}
          <Box component={"span"} className={classes.onlyDesktop}>
            Leaderboard
          </Box>
        </Button>

        <Link to={"/"}>
          <Button className={classes.backButton} variant="contained">
            <Box component={"span"}>
              <ReplyAllIcon />
            </Box>{" "}
            <Box component={"span"} className={classes.onlyDesktop}>
              Back
            </Box>
          </Button>
        </Link>
      </Box>

      <Box className={classes.leftPanel}></Box>

      <Box className={classes.middlePanel}>
        <Typography variant="h3" className={classes.gameTitle}>
          AlumniGrid
        </Typography>
        <Box className={classes.gridBox}>
          {isGettingHistory
            ? gameSetting.playerList.map((item, index) => (
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
                </Box>
              ))
            : gameSetting.playerList.map((item, index) => (
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
                  {/* <PersonIcon className={classes.personAva} /> */}
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
        <Box className={classes.remainTime}>
          {gameSetting.endStatus
            ? `Restart Game in ${getRemainTimeStr(remainTime)}`
            : getRemainTimeStr(spentTime)}
        </Box>
      </Box>

      <CollegeModal
        open={open}
        handleOpenStatus={(open) => setOpen(open)}
        handleCollegeSelect={handleCollegeSelect}
        targetItem={targetItem}
        isConfirming={isConfirming}
      />
      <AnswerModal
        open={answerOpen}
        itemId={targetItem?.playerId}
        handleOpenStatus={(answerOpen) => setAnswerOpen(answerOpen)}
      />
    </Box>
  );
};

export default GameBoardIndex;
