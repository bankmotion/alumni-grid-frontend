import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gameBoard: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "url(/assets/bg.jpg)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  },

  gameTitle: {
    color: "#777777",
    fontWeight: "bold",
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
    padding: "8px",
    borderRadius: "8px",
    marginTop: "8px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: "0.9",
    height: "100%",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
    background: "#7e7e8988",
  },

  personAva: {
    position: "absolute",
    color: "#363232",
    fontSize: "150px",
  },

  playerName: {
    position: "absolute",
    bottom: "20px",
  },

  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#7e7e89",
    border: "5px solid #656565",
    color: "#2b2a2a",
    fontWeight: "bold",
    fontSize: "18px",
    width: 200,
    height: 200,
    borderRadius: "8px",
    transition: "0.3s",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#65656599",
      border: "5px solid #656565",
      transition: "0.3s",
      "&>svg": {
        color: "white",
      },
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
    color: "#d93232",
    fontWeight: "bold",
  },

  giveUpBtn: {
    color: "white",
    maxWidth: "200px",
    marginTop: "32px",
  },

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
  },

  collegeList: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    maxHeight: "500px",
    overflowY: "auto",
    minHeight: "500px",
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
}));

export default styles;
