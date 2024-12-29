import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  answerModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(135deg, #FFD60A, #FF5733)",
    color: theme.palette.getContrastText("#FFD60A"),
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
    padding: "32px",
    width: "400px",
    textAlign: "center",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      height: "20%",
      width: "80%",
      maxHeight: "100px",
    },
  },
}));

export default styles;
