import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gameBoard: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  leftPanel: {
    minWidth: "200px",
    width: "100%",
  },

  gridBox: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gap: "8px",
    margin: "auto",
    backgroundColor: "#1e1e1e",
    padding: "5px",
    borderRadius: "8px",
  },

  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2e2e2e",
    border: "1px solid #444",
    color: "white",
    fontSize: "18px",
    width: 200,
    height: 200,
    borderRadius: "8px",
    transition: "0.3s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#585656",
      transition: "0.3s",
    },
  },

  rightPanel: {
    minWidth: "200px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
  },

  guessLeftTxt: {
    fontSize: "32px",
    color: "white",
    fontWeight: "bold",
  },

  score: {
    fontSize: "50px",
    color: "white",
  },

  giveUpBtn: {
    color: "white",
    maxWidth: "200px",
  },

  collegeModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    backgroundColor: "#414453",
    border: "2px solid #c79292",
    boxShadow: "",
    padding: 24,
    borderRadius: 8,
    color: "white",
  },

  collegeList: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
  },

  collegeItem: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default styles;
