import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

import CloseIcon from "@mui/icons-material/Close";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLeaderHistory } from "../../reducers/game.slice";

import { GameSetting } from "../../models/interface";
import { convertPSTTime } from "../../utils/utils";
import { Version } from "../../config/config";

const ArchiveModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (summaryOpen: boolean) => void;
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [dataList, setDataList] = useState<GameSetting[]>([]);
  const [currentData, setCurrentData] = useState<GameSetting | null>(null);
  const [shareText, setShareText] = useState<string>("");
  const { allLeaderHistory } = useAppSelector((state) => state.game);

  useEffect(() => {
    dispatch(getLeaderHistory());
  }, [dispatch]);

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
    navigate(`/game?timestamp=${timeStamp}`);
    onClose(false);
  };

  useEffect(() => {
    let data: GameSetting[] = [];
    try {
      data = JSON.parse(localStorage.getItem(`dataList${Version}`)) || [];
    } catch (err) {}

    setDataList(data);
  }, [open]);

  useEffect(() => {
    let data: GameSetting | null = null;
    try {
      const storedData = localStorage.getItem(`Data${Version}`);
      data = storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }

    setCurrentData(data);
  }, []);

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box className={classes.archiveModal}>
        <Box className={classes.archiveHeader}>
          <Box className={classes.titleBox}>
            <Typography className={classes.archiveTitle}>ARCHIVE</Typography>
          </Box>

          <IconButton
            aria-label="close"
            onClick={() => onClose(false)}
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
