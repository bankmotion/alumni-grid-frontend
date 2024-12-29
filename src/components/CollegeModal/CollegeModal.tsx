import { useEffect, useState } from "react";
import { College, PlayerInfo } from "../../models/interface";
import { useAppSelector } from "../../app/hooks";
import {
  Box,
  Button,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "./styles";

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
            className={classes.button}
            variant="contained"
            sx={{ backgroundColor: "green", maxWidth: "80px" }}
          >
            Right
          </Button>
        ) : targetItem &&
          targetItem.wrongStatus.findIndex((item) => item === college.name) !==
            -1 ? (
          <Button
            className={classes.button}
            variant="contained"
            sx={{ backgroundColor: "red", maxWidth: "80px" }}
          >
            Wrong
          </Button>
        ) : (
          <Button
            onClick={() => handleCollegeSelect(college.name)}
            variant="contained"
            className={classes.button}
            sx={{ maxWidth: "80px" }}
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
          placeholder="select the college"
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

export default CollegeModal;
