import { useEffect, useState } from "react";
import { College, PlayerInfo } from "../../models/interface";
import { useAppSelector } from "../../app/hooks";
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
          //   const response = await axios.post(
          //     `${SERVER_URL}/game/answerCollege`,
          //     {
          //       id: itemId,
          //     }
          //   );
          //   setCollegeName(response.data);
          setCollegeName("MMMMMMMM");
        } catch (error) {
          console.error("Error fetching college name:", error);
        }
      })();
    }
  }, [open, itemId]);

  return (
    <Modal open={open} onClose={() => handleOpenStatus(false)}>
      <Box className={classes.collegeModal}>
        <Typography variant="h5" component="h2" gutterBottom>
          <b>College Information</b>
        </Typography>
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
      </Box>
    </Modal>
  );
};

export default AnswerModal;
