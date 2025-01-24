import useStyles from "./styles";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { GameSetting } from "../../models/interface";
import gsap from "gsap";

import CloseIcon from "@mui/icons-material/Close";

import SummaryGrid from "../SummaryGrid/SummaryGrid";
import { convertPSTTime } from "../../utils/utils";
import { PlayType, PlayTypeInfo } from "../../constant/const";
import { useEffect, useRef } from "react";

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

  const modalRef = useRef(null);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0.5,
      top: "60%",
      duration: 0.3,
      scale: 0.95,
      ease: "power2.in",
    });

    setTimeout(() => {
      onClose(false);
    }, 300);
  };

  useEffect(() => {
    if (!modalRef.current) return;

    if (open) {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0.5,
          top: "60%",
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          top: "50%",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [open, modalRef.current]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.summaryModal} ref={modalRef}>
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
