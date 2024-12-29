// ConfirmationModal.tsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import useStyles from "./styles";

interface NBAConfirmationModalProps {
  open: boolean;
  optionedPlayersCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const NBAConfirmationModal: React.FC<NBAConfirmationModalProps> = ({
  open,
  optionedPlayersCount,
  onConfirm,
  onCancel,
}) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle className={classes.dialogTitle}>Confirmation</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="body1">
          {optionedPlayersCount} members have been added successfully.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.cancelButton} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={classes.confirmButton} onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NBAConfirmationModal;
