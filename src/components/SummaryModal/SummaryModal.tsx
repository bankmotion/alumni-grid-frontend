import useStyles from "./styles";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { GameSetting } from "../../models/interface";

import CloseIcon from "@mui/icons-material/Close";

import SummaryGrid from "../SummaryGrid/SummaryGrid";
import { convertPSTTime } from "../../utils/utils";
import { PlayType, PlayTypeInfo } from "../../constant/const";

const SummaryModal = ({
  open,
  onClose,
  gameSetting,
  playType,
}: {
  open: boolean;
  onClose: (summaryOpen: boolean) => void;
  gameSetting: GameSetting;
  playType: PlayType;
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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Game Summary - {PlayTypeInfo[playType].up}
        </Typography>
        <Typography
          component={"span"}
          sx={{ fontSize: "17px", marginTop: "12px" }}
        >
          AlumniGrid {convertPSTTime(gameSetting.createTime)}
        </Typography>
        <Typography>Score: {gameSetting.score}</Typography>
        <SummaryGrid playType={playType} gameSetting={gameSetting} />
      </Box>
    </Modal>
  );
};

export default SummaryModal;
