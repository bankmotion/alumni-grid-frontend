import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./styles";
import { College, PlayerInfo } from "../../models/interface";
import { LocalStorageKeys, PlayType } from "../../constant/const";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollegeList, getHistoryList } from "../../reducers/game.slice";
import axios from "axios";
import {
  DECREASE_TIME,
  DURATION_TIME,
  MAX_COUNT,
  MAX_SCORE_PER_QUE,
  MIN_SCORE_PER_QUE,
  SERVER_URL,
} from "../../config/config";
import { getRemainTimeStr } from "../../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import { clsx } from "clsx";

const CollegeModal = ({
  open,
  handleOpenStatus,
  handleCollegeSelect,
  targetItem,
  isConfirming,
}: {
  open: boolean;
  handleOpenStatus: (open: boolean) => void;
  handleCollegeSelect: (collegeName: string) => void;
  targetItem: PlayerInfo | null;
  isConfirming: boolean;
}) => {
  const { classes } = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const [collegesItems, setCollegesItems] = useState<College[]>([]);

  const { collegeList } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (searchKey === "" || searchKey.length < 2) {
      setCollegesItems([]);
    } else {
      setCollegesItems(
        collegeList.filter((item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    }
  }, [searchKey, collegeList]);

  useEffect(() => {
    setSearchKey("");
  }, [open]);

  const CollegeItem = ({ college }: { college: College }) => {
    return (
      <ListItem disablePadding className={classes.collegeItem}>
        {college.name}
        {targetItem && targetItem.rightStatus === college.name ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", minWidth: "100px" }}
          >
            Right
          </Button>
        ) : targetItem &&
          targetItem.wrongStatus.findIndex((item) => item === college.name) !==
            -1 ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", minWidth: "100px" }}
          >
            Wrong
          </Button>
        ) : (
          <Button
            onClick={() => handleCollegeSelect(college.name)}
            variant="contained"
            sx={{ minWidth: "100px" }}
            disabled={isConfirming}
          >
            Select
          </Button>
        )}
      </ListItem>
    );
  };

  return (
    <Modal open={open} onClose={() => handleOpenStatus(false)}>
      <Box className={classes.collegeModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          <b>Select a College</b>
        </Typography>

        <TextField
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={classes.searchKey}
          placeholder="Input the colleges"
        />

        <List className={classes.collegeList}>
          {collegesItems.map((college, index) => (
            <CollegeItem college={college} key={index} />
          ))}
        </List>
      </Box>
    </Modal>
  );
};

const GameBoardIndex = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(10);
  const [targetItem, setTargetItem] = useState<PlayerInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [loadPlayerList, setLoadPlayerList] = useState<PlayerInfo[]>([]);
  const [remainTime, setRemainTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [createTime, setCreateTime] = useState(0);
  const { playerList } = useAppSelector((state) => state.game);

  const handleCollegeSelect = async (collegeName: string) => {
    try {
      if (targetItem) {
        setIsConfirming(true);
        const response = await axios.post(`${SERVER_URL}/game/college`, {
          id: targetItem.id,
          college: collegeName,
        });

        const status = response.data.message as boolean;

        setLoadPlayerList((prevPlayer) => {
          const updatedList = prevPlayer.map((player) => {
            if (player.id !== targetItem.id) return player;
            else if (status) {
              return { ...player, rightStatus: collegeName };
            } else {
              const updatedWrongStatus = [...(player.wrongStatus || [])];
              updatedWrongStatus.push(collegeName);
              return { ...player, wrongStatus: updatedWrongStatus };
            }
          });

          localStorage.setItem(
            LocalStorageKeys.PlayerList,
            JSON.stringify(updatedList)
          );
          return updatedList;
        });

        setCount((count) => count - 1);
        setIsConfirming(false);
      }
    } catch (err) {
      console.error(`Fetching game/college post`);
      setIsConfirming(false);
    }
  };

  // const saveDataToLocalStorage = useCallback(
  //   async (key: string, data: string) => {
  //     localStorage.setItem(key, data);
  //   },
  //   []
  // );

  const loadDataFromLocalStorage = useCallback(
    (playerListTemp: { items: PlayerInfo[]; startTimestamp: number }) => {
      if (playerListTemp.items.length === 0) return;
      console.log("Loading data from localStorage...");
      console.log("starttimestamp", playerListTemp.startTimestamp);

      const dataStr = localStorage.getItem(LocalStorageKeys.PlayerList);
      console.log("------datastr from localstorage------", JSON.parse(dataStr));
      const localTimestamp = localStorage.getItem(LocalStorageKeys.CreateTime);
      console.log("timestamp", Number(localTimestamp));
      const remainCount = localStorage.getItem(LocalStorageKeys.RemainCount);
      console.log("remaincount", remainCount);
      const score = localStorage.getItem(LocalStorageKeys.Score);
      console.log("score", score);
      const endStatus = Number(
        localStorage.getItem(LocalStorageKeys.EndStatus)
      );
      console.log("endstatus", endStatus);

      if (
        dataStr &&
        localTimestamp &&
        //playerListTemp.items.length > 0
        playerListTemp.startTimestamp === Number(localTimestamp)
      ) {
        try {
          const data: PlayerInfo[] = JSON.parse(dataStr);
          console.log("=====updated data=======", data);
          // if (
          //   new Date().getTime() - Number(timestamp) < DURATION_TIME * 1000 &&
          //   data.length === 9
          // ) {
          setLoadPlayerList(data);
          setCreateTime(Number(localTimestamp));
          setCount(Number(remainCount));
          setRemainTime(
            Math.floor(
              (-new Date().getTime() + Number(localTimestamp)) / 1000
            ) + DURATION_TIME
          );
          setScore(Number(score));
          setIsEnd(() => (endStatus ? true : false));
          console.log("Successfully loaded data from localStorage.");
          // }
        } catch (err) {
          console.error(`Parse error for localstorage data`);
        }
      } else {
        console.log("Fallback to backend data.");
        setLoadPlayerList(playerListTemp.items);
        setCreateTime(playerListTemp.startTimestamp);
        setCount(MAX_COUNT);
        setRemainTime(
          Math.floor((-new Date().getTime() + Number(localTimestamp)) / 1000) +
            DURATION_TIME
        );
        setScore(0);
        setIsEnd(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDataFromLocalStorage(playerList);
  }, [playerList, loadDataFromLocalStorage]);

  useEffect(() => {
    if (loadPlayerList.length === 0) return;
    localStorage.setItem(
      LocalStorageKeys.PlayerList,
      JSON.stringify(loadPlayerList)
    );
    console.log("save loadPlyerList in localstorage", loadPlayerList);
  }, [loadPlayerList]);

  useEffect(() => {
    if (createTime === 0) return;
    localStorage.setItem(LocalStorageKeys.CreateTime, String(createTime));
    console.log("createTime", createTime);
  }, [createTime]);

  console.log("*count", count);
  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.RemainCount, String(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.Score, String(score));
  }, [score]);

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.EndStatus, String(isEnd ? 1 : 0));
  }, [isEnd]);

  const selectItem = useCallback(
    (item: PlayerInfo) => {
      if (isEnd) {
        toast(
          "The game has concluded. Please try again after the remaining time has elapsed."
        );
        return;
      }
      setTargetItem(item);
      setOpen(true);
    },
    [isEnd]
  );

  const handleEndGame = useCallback(() => {
    const score =
      loadPlayerList.filter((item) => item.rightStatus !== "none").length *
      Math.max(
        MAX_SCORE_PER_QUE - remainTime / DECREASE_TIME,
        MIN_SCORE_PER_QUE
      );

    setIsEnd(true);
    setScore(score);
  }, [loadPlayerList, remainTime]);

  useEffect(() => {
    dispatch(getHistoryList());
  }, [dispatch]);

  useEffect(() => {
    if (loadPlayerList.length > 0 && targetItem) {
      const updatedItem = loadPlayerList.find(
        (item) => item.id === targetItem.id
      );
      setTargetItem(updatedItem);
    }
  }, [loadPlayerList, targetItem]);

  // useEffect(() => {
  //   const loadStatus = loadDataFromLocalStorage();
  //   if (!loadStatus) {
  //     dispatch(getRandPlayerList({ playType }));
  //     saveDataToLocalStorage(
  //       `createTime`,
  //       new Date().getTime().toString()
  //     );
  //     setRemainTime(DURATION_TIME);
  //   }
  // }, [dispatch, playType, saveDataToLocalStorage, loadDataFromLocalStorage]);

  // useEffect(() => {
  //   if (!loadPlayerList || loadPlayerList.length !== 9) return;
  //   saveDataToLocalStorage(
  //     `playerList${playType}`,
  //     JSON.stringify(loadPlayerList)
  //   );
  //   saveDataToLocalStorage(`remainCount${playType}`, count.toString());
  //   saveDataToLocalStorage(`score${playType}`, score.toString());
  //   saveDataToLocalStorage(`endStatus${playType}`, isEnd ? "1" : "0");
  //   if (targetItem) {
  //     selectItem(loadPlayerList.find((item) => item.id === targetItem.id));
  //   }
  // }, [
  //   loadPlayerList,
  //   playType,
  //   saveDataToLocalStorage,
  //   targetItem,
  //   count,
  //   score,
  //   isEnd,
  //   selectItem,
  // ]);

  useEffect(() => {
    dispatch(getCollegeList());
  }, [dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainTime((remainTime) => remainTime - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [remainTime]);

  useEffect(() => {
    if (count === 0) {
      handleEndGame();
    }
  }, [count, handleEndGame]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.leftPanel}></Box>
      <Box>
        <Typography variant="h3" className={classes.gameTitle}>
          AlumniGrid
        </Typography>
        <Box className={classes.gridBox}>
          {loadPlayerList.map((item, index) => (
            <Box
              className={clsx(
                classes.gridItem,
                item.rightStatus !== "none"
                  ? classes.correctBox
                  : isEnd
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
        {!isEnd && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box className={classes.guessLeftTxt}>GUESS LEFT</Box>
            <Box className={classes.score}>{count}</Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Box className={classes.guessLeftTxt}>SCORE</Box>
          <Box className={classes.score}>{score}</Box>
        </Box>
        {!isEnd && (
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
