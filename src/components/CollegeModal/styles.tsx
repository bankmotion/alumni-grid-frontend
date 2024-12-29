import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  collegeModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxWidth: "300px",
    height: "60%",
    backgroundColor: "#414453dd",
    border: "2px solid #c79292",
    boxShadow: "",
    padding: 24,
    borderRadius: 8,
    color: "white",

    [theme.breakpoints.down("sm")]: {
      height: "70%",
      padding: theme.spacing(2),
    },
  },

  collegeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,

    [theme.breakpoints.down("sm")]: {},
  },

  searchKey: {
    border: "none",
    minWidth: "100%",

    "& .MuiOutlinedInput-input": {
      padding: "8px 16px",
      color: "white",
      width: "100%",
      border: "none",
    },

    "& fieldset": {},
  },

  collegeList: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "80%",
    overflowY: "auto",
    minHeight: "200px",

    [theme.breakpoints.down("sm")]: {
      maxHeight: "70%",
      minHeight: "auto",
    },
  },

  button: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
    padding: theme.spacing(0.5, 1.5),
    margin: theme.spacing(0.5, 0.0),
    borderRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
}));

export default styles;
