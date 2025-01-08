import useStyles from "./styles";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { GameSetting, PlayerInfo } from "../../models/interface";

import CloseIcon from "@mui/icons-material/Close";

import SummaryGrid from "../SummaryGrid/SummaryGrid";

const SummaryModal = ({
  open,
  onClose,
  gameSetting,
}: {
  open: boolean;
  onClose: (summaryOpen: boolean) => void;
  gameSetting: GameSetting;
}) => {
  const { classes } = useStyles();

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box className={classes.summaryModal}>
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5">Game Summary</Typography>
        <Typography>Score: {gameSetting.score}</Typography>
        <SummaryGrid />
      </Box>
    </Modal>
  );
};

export default SummaryModal;
