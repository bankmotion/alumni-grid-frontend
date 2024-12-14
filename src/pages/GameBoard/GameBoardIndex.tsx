import { useEffect, useState } from "react";
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

import useStyles from "./styles";
import { College, PlayerInfo } from "../../models/interface";
import { CollegeStatus, PlayType } from "../../constant/const";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollegeList, getRandPlayerList } from "../../reducers/game.slice";
import axios from "axios";
import { SERVER_URL } from "../../config/config";

const CollegeModal = ({
  open,
  handleOpenStatus,
  colleges,
  handleCollegeSelect,
  targetItem,
  isConfirming,
}: {
  open: boolean;
  handleOpenStatus: (open: boolean) => void;
  colleges: College[];
  handleCollegeSelect: (collegeName: string) => void;
  targetItem: PlayerInfo | null;
  isConfirming: boolean;
}) => {
  const { classes } = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const [collegesItems, setCollegesItems] = useState<College[]>([]);

  useEffect(() => {
    if (searchKey === "" || searchKey.length < 2) {
      setCollegesItems([]);
    } else {
      setCollegesItems(
        colleges.filter((item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    }
  }, [searchKey, colleges]);

  useEffect(() => {
    setSearchKey("");
  }, [open]);

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
            <ListItem
              key={index}
              disablePadding
              className={classes.collegeItem}
            >
              {college.name}
              {targetItem &&
              college?.status?.[targetItem.id] === CollegeStatus.Wrong ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", minWidth: "100px" }}
                >
                  Wrong
                </Button>
              ) : targetItem &&
                college?.status?.[targetItem.id] === CollegeStatus.Right ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", minWidth: "100px" }}
                >
                  Right
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
  const [colleges, setColleges] = useState<College[]>([]);
  const [playType, setPlayType] = useState<PlayType>(PlayType.NVA);
  const [isConfirming, setIsConfirming] = useState(false);

  const { collegeList, playerList } = useAppSelector((state) => state.game);

  const handleCollegeSelect = async (collegeName: string) => {
    try {
      if (targetItem) {
        setIsConfirming(true);
        const response = await axios.post(`${SERVER_URL}/game/college`, {
          id: targetItem.id,
          college: collegeName,
          type: playType,
        });

        const status = response.data.message as boolean;
        console.log({ status });

        setColleges((prevColleges) =>
          prevColleges.map((college) => {
            const updatedStatus = [...(college.status || [])];
            updatedStatus[targetItem.id] = status
              ? CollegeStatus.Right
              : CollegeStatus.Wrong;
            return college.name === collegeName
              ? { ...college, status: updatedStatus }
              : college;
          })
        );

        setCount((count) => count - 1);
        setIsConfirming(false);
      }
    } catch (err) {
      console.error(`Fetching game/college post`);
    }
  };

  const selectItem = (item: PlayerInfo) => {
    setTargetItem(item);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getCollegeList({ playType }));
    dispatch(getRandPlayerList({ playType }));
  }, [dispatch, playType]);

  useEffect(() => {
    setColleges(collegeList);
  }, [collegeList]);

  console.log({ colleges });

  // useEffect(() => {
  //   setColleges(prevColleges);
  // }, [open]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.leftPanel}></Box>
      <Box>
        <Typography variant="h3" className={classes.gameTitle}>
          AlumniGrid
        </Typography>
        <Box className={classes.gridBox}>
          {playerList.map((item, index) => (
            <Box
              className={classes.gridItem}
              onClick={() => selectItem(item)}
              key={index}
            >
              <PersonIcon className={classes.personAva} />
              <Box className={classes.playerName}>{item.name}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={classes.rightPanel}>
        <Box className={classes.guessLeftTxt}>GUESS LEFT</Box>
        <Box className={classes.score}>{count}</Box>
        <Button className={classes.giveUpBtn} variant="contained">
          Give Up
        </Button>
      </Box>
      <CollegeModal
        open={open}
        handleOpenStatus={(open) => setOpen(open)}
        colleges={colleges}
        handleCollegeSelect={handleCollegeSelect}
        targetItem={targetItem}
        isConfirming={isConfirming}
      />
    </Box>
  );
};

export default GameBoardIndex;
