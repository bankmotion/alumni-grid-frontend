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
      height: "50%",
      padding: theme.spacing(2),
    },
  },

  collegeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
    padding: theme.spacing(1, 2), // Add padding for spacing

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack items on small screens
      alignItems: "flex-start", // Align left on small screens
    },
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
    gap: "8px",
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
    backgroundColor: theme.palette.primary.main,
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
