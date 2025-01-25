import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { clsx } from "clsx";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";

import CollegeModal from "../../components/CollegeModal/CollegeModal";
import AnswerModal from "../../components/AnswerModal/AnswerModal";
import SummaryModal from "../../components/SummaryModal/SummaryModal";
import ArchiveModal from "../../components/ArchiveModal/ArchiveModal";

import useStyles from "./styles";
import { GameSetting, PlayerInfo } from "../../models/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCollegeList,
  getHistoryList,
  setHistory,
} from "../../reducers/game.slice";
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
import isMobile from "is-mobile";

const GameBoardIndex = ({ playType }: { playType: PlayType }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const timeStampParam = getStartTimeByTimestampDaily(
    searchParams.get("timestamp")
      ? Number(searchParams.get("timestamp"))
      : Math.floor(new Date().getTime() / 1000)
  );
  const dispatch = useAppDispatch();

  const [targetItem, setTargetItem] = useState<PlayerInfo | null>(null);

  const [open, setOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const [spentTime, setSpentTime] = useState(0);
  const [explosion, setExplosion] = useState(false);

  const [gameSetting, setGameSetting] = useState<GameSetting>({
    createTime: 0,
    remainCount: MAX_COUNT,
    score: 0,
    endStatus: false,
    playerList: [],
    gameStartTime: 0,
  });

  const { history, isGettingHistory } = useAppSelector((state) => state.game);

  const handleLink = () => {
    if (playType === PlayType.NBA) {
      navigate("/game/nfl");
    } else if (playType === PlayType.NFL) {
      navigate("/game/nba");
    }
  };

  const updateGameSetting = (newSetting: Partial<GameSetting>) =>
    setGameSetting((prev) => ({ ...prev, ...newSetting }));

  const handleCollegeSelect = useCallback(
    async (collegeName: string) => {
      if (!targetItem) return;
      setIsConfirming(true);

      try {
        const response = await axios.post(
          `${SERVER_URL}/game/college/${playType}`,
          {
            id: targetItem.playerId,
            college: collegeName,
            timestamp: timeStampParam,
          }
        );

        const status = response.data.message as boolean;

        updateGameSetting({
          playerList: gameSetting.playerList.map((player) =>
            player.playerId !== targetItem.playerId
              ? player
              : {
                  ...player,
                  ...(status
                    ? { rightStatus: collegeName }
                    : {
                        wrongStatus: [
                          ...(player.wrongStatus || []),
                          collegeName,
                        ],
                      }),
                }
          ),
          remainCount: gameSetting.remainCount - 1,
          score: status
            ? gameSetting.score +
              Math.max(100 - Math.floor(spentTime / DECREASE_TIME), 0)
            : gameSetting.score,
        });

        if (status) {
          setOpen(false);
          setExplosion(true);
        }
      } catch (err) {
        console.error("Error fetching game/college post:", err);
      } finally {
        setIsConfirming(false);
      }
    },
    [spentTime, targetItem, playType, timeStampParam, gameSetting]
  );

  const loadGameData = useCallback(() => {
    if (history.items.length === 0) return;

    const savedData = localStorage.getItem(
      `dataList-${PlayTypeInfo[playType].up}${Version}`
    );

    if (savedData) {
      try {
        const dataList = JSON.parse(savedData) as GameSetting[];
        console.log("Parsed localstorage data:", dataList);
        const currentGameData = dataList.find(
          (item) => item.createTime === history.startTimestamp
        );

        if (currentGameData) {
          setGameSetting(currentGameData);
          return;
        }
      } catch (err) {
        console.error("Error parsing local storage data:", err);
      }
    }

    const initialSetting: GameSetting = {
      playerList: history.items,
      remainCount: MAX_COUNT,
      score: 0,
      createTime: history.startTimestamp,
      endStatus: false,
      gameStartTime: Math.floor(Date.now() / 1000),
    };
    updateGameSetting(initialSetting);

    axios.post(`${SERVER_URL}/game/gamestart/${playType}`, {
      timestamp: timeStampParam,
    });
  }, [history, timeStampParam, playType]);

  const handleEndGame = useCallback(() => {
    updateGameSetting({ endStatus: true });
    setSummaryOpen(true);
  }, []);

  const selectItem = useCallback(
    (item: PlayerInfo) => {
      setTargetItem(item);
      setAnswerOpen(gameSetting.endStatus);
      setOpen(!gameSetting.endStatus);
    },
    [gameSetting.endStatus]
  );

  const saveDailyData = useCallback(() => {
    const dataList = JSON.parse(
      localStorage.getItem(`dataList-${PlayTypeInfo[playType].up}${Version}`) ||
        "[]"
    ) as GameSetting[];

    const updatedData = dataList.filter(
      (item) => item.createTime !== gameSetting.createTime
    );
    updatedData.push(gameSetting);

    localStorage.setItem(
      `dataList-${PlayTypeInfo[playType].up}${Version}`,
      JSON.stringify(updatedData)
    );
  }, [playType, gameSetting]);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  useEffect(() => {
    if (gameSetting.createTime === 0) return;
    saveDailyData();
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

  useEffect(() => {
    return () => {
      dispatch(setHistory());
    };
  }, [dispatch]);

  useEffect(() => {
    if (explosion) {
      setTimeout(() => {
        setExplosion(false);
      }, 5000);
    }
  }, [explosion]);

  console.log(gameSetting);

  return (
    <Box
      className={clsx(
        classes.gameBoard,
        playType === PlayType.NBA ? classes.nbaBg : classes.nflBg
      )}
    >
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.infoButton}
          variant="contained"
          onClick={() => navigate("/")}
        >
          <Box className={classes.infoIcon}>
            <InfoIcon />
          </Box>{" "}
          <Box className={classes.onlyDesktop}>Info</Box>
        </Button>
        <Button
          className={clsx(
            classes.linkButton,
            playType === PlayType.NBA ? classes.nflColor : classes.nbaColor
          )}
          variant="contained"
          onClick={handleLink}
        >
          {isMobile() ? (
            <Box sx={{ fontSize: "20px" }}>
              {playType === PlayType.NBA ? "🏈" : "🏀"}
            </Box>
          ) : playType === PlayType.NBA ? (
            "NFL Grid 🏈"
          ) : (
            "NBA Grid 🏀"
          )}
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
            onClick={() => setArchiveOpen(true)}
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

      {explosion && (
        <ConfettiExplosion
          duration={3000}
          zIndex={5}
          width={1300}
          height={"100vh"}
          style={{ position: "absolute", top: "0", left: "50%" }}
        />
      )}
    </Box>
  );
};

export default GameBoardIndex;
