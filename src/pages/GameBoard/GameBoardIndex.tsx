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
    console.log("Search key updated:", searchKey);
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
    console.log("Modal opened/closed. Resetting search key.");
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
    console.log("College selected:", collegeName);
    try {
      if (targetItem) {
        setIsConfirming(true);
        const response = await axios.post(`${SERVER_URL}/game/college`, {
          id: targetItem.id,
          college: collegeName,
        });

        const status = response.data.message as boolean;
        console.log("Selection status:", status);

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
          console.log("Updated player list:", updatedList);
          return updatedList;
        });

        setCount((count) => count - 1);
        setIsConfirming(false);
      }
    } catch (err) {
      console.error("Error fetching game/college post:", err);
      setIsConfirming(false);
    }
  };

  const loadDataFromLocalStorage = useCallback(
    (playerListTemp: { items: PlayerInfo[]; startTimestamp: number }) => {
      console.log("Loading data from local storage...");
      if (playerListTemp.items.length === 0) return;

      const dataStr = localStorage.getItem(LocalStorageKeys.PlayerList);
      const localTimestamp = localStorage.getItem(LocalStorageKeys.CreateTime);
      const remainCount = localStorage.getItem(LocalStorageKeys.RemainCount);
      const score = localStorage.getItem(LocalStorageKeys.Score);
      const endStatus = Number(
        localStorage.getItem(LocalStorageKeys.EndStatus)
      );

      console.log("Local storage values:", {
        dataStr,
        localTimestamp,
        remainCount,
        score,
        endStatus,
      });

      if (
        dataStr &&
        localTimestamp &&
        playerListTemp.startTimestamp === Number(localTimestamp)
      ) {
        try {
          const data: PlayerInfo[] = JSON.parse(dataStr);
          console.log("Parsed player data:", data);
          setLoadPlayerList(data);
          setCreateTime(Number(localTimestamp));
          if (Number(remainCount) !== 10) {
            setCount(Number(remainCount));
          }
          if (remainCount !== null) {
            setCount(Number(remainCount)); // Always set the count if remainCount is defined
          } else {
            setCount(MAX_COUNT); // Fallback to MAX_COUNT if remainCount is not in localStorage
          }
          setRemainTime(
            Math.floor(
              (-new Date().getTime() + Number(localTimestamp)) / 1000
            ) + DURATION_TIME
          );
          setScore(Number(score));
          setIsEnd(() => (endStatus ? true : false));
          console.log("Data loaded successfully from localStorage.");
        } catch (err) {
          console.error("Error parsing local storage data:", err);
        }
      } else {
        console.log("Using fallback backend data.");
        setLoadPlayerList(playerListTemp.items);
        setCreateTime(playerListTemp.startTimestamp);
        setCount(MAX_COUNT);
        setRemainTime(DURATION_TIME);
        setScore(0);
        setIsEnd(false);
      }
    },
    []
  );

  useEffect(() => {
    console.log("Loading data from backend or local storage...");
    loadDataFromLocalStorage(playerList);
  }, [playerList, loadDataFromLocalStorage]);

  useEffect(() => {
    if (loadPlayerList.length === 0) return;
    console.log("Saving updated player list to localStorage:", loadPlayerList);
    localStorage.setItem(
      LocalStorageKeys.PlayerList,
      JSON.stringify(loadPlayerList)
    );
  }, [loadPlayerList]);

  useEffect(() => {
    if (createTime === 0) return;
    console.log("Saving createTime to localStorage:", createTime);
    localStorage.setItem(LocalStorageKeys.CreateTime, String(createTime));
  }, [createTime]);

  console.log("Current guess count:", count);
  useEffect(() => {
    //if (Number(localStorage.getItem(LocalStorageKeys.RemainCount)) === 10) {
    if (count === 10) return;
    console.log("Saving remainCount to localStorage:", count);
    localStorage.setItem(LocalStorageKeys.RemainCount, String(count));

    //}
  }, [count]);

  useEffect(() => {
    console.log("Saving score to localStorage:", score);
    localStorage.setItem(LocalStorageKeys.Score, String(score));
  }, [score]);

  useEffect(() => {
    if (isEnd === false) return;
    console.log("Saving end status to localStorage:", isEnd);
    localStorage.setItem(LocalStorageKeys.EndStatus, String(isEnd ? 1 : 0));
  }, [isEnd]);

  const selectItem = useCallback(
    (item: PlayerInfo) => {
      console.log("Selecting item:", item);
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
    console.log("Game is ending...");
    const score =
      loadPlayerList.filter((item) => item.rightStatus !== "none").length *
      Math.max(
        MAX_SCORE_PER_QUE - remainTime / DECREASE_TIME,
        MIN_SCORE_PER_QUE
      );

    setIsEnd(true);
    setScore(score);
    console.log("Final score:", score);
  }, [loadPlayerList, remainTime]);

  useEffect(() => {
    console.log("Fetching history list...");
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

  useEffect(() => {
    console.log("Fetching college list...");
    dispatch(getCollegeList());
  }, [dispatch]);

  useEffect(() => {
    if (count === 0) {
      console.log("Count reached zero. Ending game.");
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
