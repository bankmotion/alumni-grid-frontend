import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { clsx } from "clsx";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useSearchParams } from "react-router-dom";

import CollegeModal from "../../components/CollegeModal/CollegeModal";
import AnswerModal from "../../components/AnswerModal/AnswerModal";
import SummaryModal from "../../components/SummaryModal/SummaryModal";
import ArchiveModal from "../../components/ArchiveModal/ArchiveModal";

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
import { PlayType, PlayTypeInfo } from "../../constant/const";

const GameBoardIndex = ({ playType }: { playType: PlayType }) => {
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
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

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
          const response = await axios.post(
            `${SERVER_URL}/game/college/${playType}`,
            {
              id: targetItem.playerId,
              college: collegeName,
              timestamp: timeStampParam,
            }
          );
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

    const dataStr = localStorage.getItem(
      `dataList-${PlayTypeInfo[playType].up}${Version}`
    );

    if (dataStr) {
      try {
        const dataList = JSON.parse(dataStr) as GameSetting[];
        console.log("Parsed localstorage data:", dataList);
        const data = dataList.find(
          (item) => item.createTime === history.startTimestamp
        );

        if (
          data &&
          data.createTime &&
          history.startTimestamp === data.createTime
        ) {
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

          axios.post(`${SERVER_URL}/game/gameStart/${playType}`, {
            timestamp: timeStampParam,
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

        axios.post(`${SERVER_URL}/game/gamestart/${playType}`, {
          timestamp: timeStampParam,
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

      axios.post(`${SERVER_URL}/game/gamestart/${playType}`, {
        timestamp: timeStampParam,
      });
    }
  }, [history, timeStampParam, playType]);

  const handleEndGame = useCallback(() => {
    setGameSetting((prevSetting) => ({
      ...prevSetting,
      endStatus: true,
    }));
    setSummaryOpen(true);
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

  const getDataList = useCallback(() => {
    const dataListStr = localStorage.getItem(
      `dataList-${PlayTypeInfo[playType].up}${Version}`
    );
    return dataListStr ? JSON.parse(dataListStr) : [];
  }, [playType]);

  const saveDailyData = useCallback(
    (data: GameSetting) => {
      const dataList = getDataList();

      const existingIndex = dataList.findIndex(
        (entry: GameSetting) => entry.createTime === data.createTime
      );

      if (existingIndex !== -1) {
        dataList[existingIndex] = data;
      } else {
        dataList.push(data);
      }

      localStorage.setItem(
        `dataList-${PlayTypeInfo[playType].up}${Version}`,
        JSON.stringify(dataList)
      );
    },
    [getDataList, playType]
  );

  const openPriorGridsModal = () => {
    setArchiveOpen(true);
  };

  const goInfo = () => {
    navigate("/");
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [loadDataFromLocalStorage]);

  useEffect(() => {
    if (gameSetting.createTime === 0) return;
    localStorage.setItem(
      `Data-${PlayTypeInfo[playType].up}${Version}`,
      JSON.stringify(gameSetting)
    );
    saveDailyData(gameSetting);
  }, [gameSetting, saveDailyData, playType]);

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
    dispatch(getCollegeList({ playType }));
    dispatch(getHistoryList({ timestamp: Number(timeStampParam), playType }));
  }, [dispatch, searchParams, timeStampParam, playType]);

  useEffect(() => {
    if (gameSetting.endStatus) {
      setSummaryOpen(true);
    } else {
      setSummaryOpen(false);
    }
  }, [gameSetting.endStatus, gameSetting.createTime]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.infoButton}
          variant="contained"
          onClick={goInfo}
        >
          <Box className={classes.infoIcon}>
            <InfoIcon />
          </Box>{" "}
          <Box className={classes.onlyDesktop}>Info</Box>
        </Button>
      </Box>

      <Box className={classes.leftPanel}></Box>

      <Box className={classes.middlePanel}>
        <Typography variant="h3" className={classes.gameTitle}>
          AlumniGrid - {PlayTypeInfo[playType].up}
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
            <Box className={classes.guessLeftTxt}>GUESSES LEFT</Box>
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
        {gameSetting.endStatus && (
          <Box sx={{ marginTop: "12px", textAlign: "center", color: "white" }}>
            <Typography variant="body2" sx={{ marginBottom: "8px" }}>
              Click into boxes to see the correct answer.
            </Typography>
            <Typography variant="body2">
              Click <b>Show Summary</b> to view stats and share your grid with
              friends!
            </Typography>
          </Box>
        )}

        <Box className={classes.remainTime}>
          {gameSetting.endStatus
            ? `New Grid in ${getRemainTimeStr(remainTime)}`
            : getRemainTimeStr(spentTime)}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {gameSetting.endStatus && (
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => setSummaryOpen(true)}
            >
              Show Summary
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginTop: "8px" }}
            onClick={openPriorGridsModal}
          >
            Prior Grids
          </Button>
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
        playType={playType}
      />
      <SummaryModal
        open={summaryOpen}
        onClose={(summaryOpen) => setSummaryOpen(summaryOpen)}
        gameSetting={gameSetting}
        playType={playType}
      />
      <ArchiveModal
        open={archiveOpen}
        onClose={(archiveOpen) => setArchiveOpen(archiveOpen)}
        playType={playType}
      />
    </Box>
  );
};

export default GameBoardIndex;
