import useStyles from "./styles";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { GameSetting } from "../../models/interface";
import gsap from "gsap";

import CloseIcon from "@mui/icons-material/Close";

import SummaryGrid from "../SummaryGrid/SummaryGrid";
import { convertPSTTime } from "../../utils/utils";
import { PlayType, PlayTypeInfo } from "../../constant/const";
import { useEffect, useRef, useState } from "react";
import isMobile from "is-mobile";

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
  const [animatedScore, setAnimatedScore] = useState(0);

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

  useEffect(() => {
    if (gameSetting.score === 0) return;

    let currentScore = 0;
    const targetScore = gameSetting.score;

    const interval = setInterval(() => {
      currentScore += Math.ceil(targetScore / 20);
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(interval);
      }

      setAnimatedScore(currentScore);
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [gameSetting.score, open]);

  useEffect(() => {
    if (open) {
      setAnimatedScore(0);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.summaryModal} ref={modalRef}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: "bold" }}
        >
          Game Summary - {PlayTypeInfo[playType].up}
        </Typography>
        <Typography
          component={"span"}
          sx={{ fontSize: "17px", marginTop: "12px" }}
        >
          AlumniGrid {convertPSTTime(gameSetting.createTime)}
        </Typography>
        <Typography sx={{ fontSize: "24px" }}>
          Score: {animatedScore}
        </Typography>
        <SummaryGrid playType={playType} gameSetting={gameSetting} />
      </Box>
    </Modal>
  );
};

export default SummaryModal;
