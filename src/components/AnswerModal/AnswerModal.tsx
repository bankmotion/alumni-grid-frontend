import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import { SERVER_URL } from "../../config/config";
import { PlayType } from "../../constant/const";

const AnswerModal = ({
  open,
  itemId,
  handleOpenStatus,
  playType,
}: {
  open: boolean;
  itemId: number;
  handleOpenStatus: (answerOpen: boolean) => void;
  playType: PlayType;
}) => {
  const { classes } = useStyles();
  const [collegeName, setCollegeName] = useState<string>("none");

  useEffect(() => {
    if (open && itemId) {
      (async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/game/answer/${playType}/${itemId}`
          );
          console.log("data", response.data.data.college);
          setCollegeName(response.data.data.college);
        } catch (error) {
          console.error("Error fetching college name:", error);
        }
      })();
    }
  }, [open, itemId, playType]);

  useEffect(() => {
    if (!open) {
      setCollegeName("");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={() => handleOpenStatus(false)}>
      <Box className={classes.answerModal}>
        <Typography variant="h5" component="h2" gutterBottom>
          <b>College Information</b>
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => handleOpenStatus(false)}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            margin: "16px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          The player attended:{" "}
          <Box
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              opacity: collegeName !== "none" ? 1 : 0,
              minWidth: "120px",
              fontSize: "24px",
            }}
          >
            {collegeName}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AnswerModal;
