// ConfirmationModal.tsx
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PlayType } from "../../constant/const";
import useStyles from "./index.styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleUpdatePlayerDetail } from "../../reducers/game.slice";
import { toast } from "react-toastify";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  type: PlayType;
  id: number;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, type, id }) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allPlayerList, NFLAllPlayerList } = useAppSelector(
    (state) => state.game
  );
  const [college, setCollege] = useState("");
  const [link, setLink] = useState("");

  const handleConfirm = () => {
    dispatch(
      handleUpdatePlayerDetail({ id, imageLink: link, college, playType: type })
    )
      .unwrap()
      .then(() => toast.success("Successfully updated"));
  };

  useEffect(() => {
    const playerData =
      type === PlayType.NBA
        ? allPlayerList.find((player) => player.id === id)
        : NFLAllPlayerList.find((player) => player.id === id);

    if (playerData) {
      setCollege(playerData.college);
      setLink(playerData.imageLink);
    }
  }, [id, allPlayerList, NFLAllPlayerList, type]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle className={classes.dialogTitle}>Confirmation</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="body1">Edit</Typography>
        <Box className={classes.editTextBox}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="College"
            className={classes.editText}
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Image link"
            className={classes.editText}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.confirmButton} onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
