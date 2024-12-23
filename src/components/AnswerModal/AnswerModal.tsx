import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import useStyles from "./styles";
import { SERVER_URL } from "../../config/config";

const AnswerModal = ({
  open,
  itemId,
  handleOpenStatus,
}: {
  open: boolean;
  itemId: number;
  handleOpenStatus: (answerOpen: boolean) => void;
}) => {
  const { classes } = useStyles();
  const [collegeName, setCollegeName] = useState<string>("none");

  useEffect(() => {
    if (open && itemId) {
      (async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/game/${itemId}`);
          console.log("data", response.data.data.college);
          setCollegeName(response.data.data.college);
        } catch (error) {
          console.error("Error fetching college name:", error);
        }
      })();
    }
  }, [open, itemId]);

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
