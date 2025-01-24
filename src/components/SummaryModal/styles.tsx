import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  summaryModal: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    color: theme.palette.getContrastText("#FFD60A"),
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
    padding: "32px",
    width: "400px",
    textAlign: "center",
    fontWeight: "bold",
    maxHeight: "550px",
    overflowY: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "70%",
      maxHeight: "500px",
    },
  },
  closeButton: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));

export default styles;
