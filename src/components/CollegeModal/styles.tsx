import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  collegeModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    backgroundColor: "#414453dd",
    border: "2px solid #c79292",
    boxShadow: "",
    padding: 24,
    borderRadius: 8,
    color: "white",

    [theme.breakpoints.down("sm")]: {
      height: "70%",
    },
  },

  collegeItem: {
    display: "flex",
    justifyContent: "space-between",
  },

  searchKey: {
    border: "none",
    minWidth: "280px",

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
    maxHeight: "500px",
    overflowY: "auto",
    minHeight: "500px",

    [theme.breakpoints.down("sm")]: {
      maxHeight: "80%",
      minHeight: "auto",
    },
  },
}));

export default styles;
