import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import gsap from "gsap";

import CloseIcon from "@mui/icons-material/Close";

import "toastify-js/src/toastify.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderHistory } from "../../reducers/game.slice";

import { GameSetting } from "../../models/interface";
import { convertPSTTime } from "../../utils/utils";
import { Version } from "../../config/config";
import { PlayType, PlayTypeInfo } from "../../constant/const";

const ArchiveModal = ({
  open,
  onClose,
  playType,
}: {
  open: boolean;
  onClose: (summaryOpen: boolean) => void;
  playType: PlayType;
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [dataList, setDataList] = useState<GameSetting[]>([]);
  const { allLeaderHistory } = useAppSelector((state) => state.game);
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
          scale: 1,
        },
        {
          opacity: 1,
          scale: 1.05,
          top: "50%",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [open, modalRef.current]);

  useEffect(() => {
    dispatch(getLeaderHistory({ playType }));
  }, [dispatch, playType]);

  const combineData = allLeaderHistory
    .map((backendEntry) => {
      const localEntry = dataList.find(
        (local) => local.createTime === backendEntry.timeStamp
      );

      return {
        timeStamp: backendEntry.timeStamp,
        players: backendEntry.players,
        gameSetting: localEntry,
      };
    })
    .sort((a, b) => b.timeStamp - a.timeStamp);

  const handleNavigation = (timeStamp: number) => {
    navigate(`/game/${PlayTypeInfo[playType].lo}?timestamp=${timeStamp}`);
    onClose(false);
  };

  useEffect(() => {
    let data: GameSetting[] = [];
    try {
      data =
        JSON.parse(
          localStorage.getItem(
            `dataList-${PlayTypeInfo[playType].up}${Version}`
          )
        ) || [];
    } catch (err) {}

    setDataList(data);
  }, [open, playType]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.archiveModal} ref={modalRef}>
        <Box className={classes.archiveHeader}>
          <Box className={classes.titleBox}>
            <Typography className={classes.archiveTitle}>
              ARCHIVE - {PlayTypeInfo[playType].up}
            </Typography>
          </Box>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.achieveTable}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Grid</th>
                <th>Date</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {combineData.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{convertPSTTime(entry.timeStamp)}</td>
                    <td>{entry.gameSetting?.score || 0}</td>
                    <td>
                      <Button
                        variant="contained"
                        color={
                          entry.gameSetting?.endStatus
                            ? "success"
                            : !entry.gameSetting?.createTime
                            ? "secondary"
                            : "primary"
                        }
                        onClick={() => {
                          handleNavigation(entry.timeStamp);
                        }}
                      >
                        {entry.gameSetting?.endStatus
                          ? "Completed"
                          : !entry.gameSetting?.createTime
                          ? "Play Now!"
                          : "In-Game"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
    </Modal>
  );
};

export default ArchiveModal;
