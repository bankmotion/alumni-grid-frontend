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
  const [collegeName, setCollegeName] = useState<string>("");

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
        {collegeName ? (
          <Typography
            variant="body1"
            sx={{ margin: "16px 0", textAlign: "center" }}
          >
            The player attended:{" "}
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              {collegeName}
            </Typography>
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{ margin: "16px 0", textAlign: "center" }}
          >
            No college information available for this player.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AnswerModal;
