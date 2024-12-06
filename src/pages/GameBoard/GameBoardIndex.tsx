import { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Modal,
  Typography,
} from "@mui/material";

import useStyles from "./styles";
import { College, PlayerInfo } from "../../models/interface";
import { CollegeStatus } from "../../constant/const";

const CollegeModal = ({
  open,
  handleOpenStatus,
  colleges,
  handleCollegeSelect,
  targetItem,
}: {
  open: boolean;
  handleOpenStatus: (open: boolean) => void;
  colleges: College[];
  handleCollegeSelect: (collegeId: number) => void;
  targetItem: PlayerInfo | null;
}) => {
  const { classes } = useStyles();
  return (
    <Modal open={open} onClose={() => handleOpenStatus(false)}>
      <Box className={classes.collegeModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select a College
        </Typography>
        <List className={classes.collegeList}>
          {colleges.map((college, index) => (
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
                  sx={{ backgroundColor: "red", minWidth: "80px" }}
                >
                  Wrong
                </Button>
              ) : targetItem &&
                college?.status?.[targetItem.id] === CollegeStatus.Right ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", minWidth: "80px" }}
                >
                  Right
                </Button>
              ) : (
                <Button
                  onClick={() => handleCollegeSelect(college.id)}
                  variant="contained"
                  sx={{ minWidth: "80px" }}
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
  const [count, setCount] = useState(10);
  const [targetItem, setTargetItem] = useState<PlayerInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [colleges, setColleges] = useState<College[]>([
    {
      id: 0,
      name: "SMU",
    },
    {
      id: 1,
      name: "Oregon State",
    },
    {
      id: 2,
      name: "Georgia Southern",
    },
    {
      id: 3,
      name: "Tennessee",
    },
    {
      id: 4,
      name: "Mississippi State",
    },
    {
      id: 5,
      name: "Florida",
    },
    {
      id: 6,
      name: "Texas A&M",
    },
    {
      id: 7,
      name: "Florida Atlantic",
    },
    {
      id: 8,
      name: "Penn State",
    },
    {
      id: 9,
      name: "Penn State",
    },
    {
      id: 10,
      name: "Penn State",
    },
    {
      id: 11,
      name: "Penn State",
    },
    {
      id: 12,
      name: "Penn State",
    },
  ]);
  const [items, setItems] = useState<PlayerInfo[]>([
    {
      id: 0,
      name: "Morstead",
      college: 0,
    },
    {
      id: 1,
      name: "Hekker",
      college: 1,
    },
    {
      id: 2,
      name: "McKinnon",
      college: 2,
    },
    {
      id: 3,
      name: "Reeves-Maybin",
      college: 3,
    },
    {
      id: 4,
      name: "Cooke",
      college: 4,
    },
    {
      id: 5,
      name: "Townsend",
      college: 5,
    },
    {
      id: 6,
      name: "Mann",
      college: 6,
    },
    {
      id: 7,
      name: "Singletary",
      college: 7,
    },
    {
      id: 8,
      name: "Clifford",
      college: 8,
    },
  ]);

  const handleCollegeSelect = (collegeId: number) => {
    if (targetItem) {
      setColleges((prevColleges) =>
        prevColleges.map((college) => {
          const updatedStatus = [...(college.status || [])];
          updatedStatus[targetItem.id] =
            collegeId === targetItem.id
              ? CollegeStatus.Right
              : CollegeStatus.Wrong;
          return college.id === collegeId
            ? { ...college, status: updatedStatus }
            : college;
        })
      );
    }
  };

  const selectItem = (item: PlayerInfo) => {
    setTargetItem(item);
    setOpen(true);
  };

  // useEffect(() => {
  //   setColleges(prevColleges);
  // }, [open]);

  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.leftPanel}></Box>
      <Box className={classes.gridBox}>
        {items.map((item, index) => (
          <Box
            className={classes.gridItem}
            onClick={() => selectItem(item)}
            key={index}
          >
            {item.name}
          </Box>
        ))}
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
      />
    </Box>
  );
};

export default GameBoardIndex;
