import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gameBoard: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "url(/assets/background.jpg)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column",
      padding: "24px 0",
      minHeight: "100vh",
      justifyContent: "start",
    },
  },

  gameTitle: {
    color: "#777777",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      marginTop: "16px",
    },
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
    height: "100%",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
    background: "#7e7e8988",

    [theme.breakpoints.down("sm")]: {
      marginTop: "12px",
    },
  },

  personAva: {
    position: "absolute",
    color: "#363232",
    fontSize: "150px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "70px",
    },
  },

  playerName: {
    // position: "absolute",
    // bottom: "20px",
    fontSize: "30px",

    [theme.breakpoints.down("sm")]: {
      // bottom: "0",
    },
  },

  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    border: "5px solid #656565",
    color: "#2b2a2a",
    fontWeight: "bold",
    fontSize: "18px",
    width: 200,
    height: 200,
    borderRadius: "8px",
    transition: "0.3s",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ffffff",
      opacity: "0.9",
      border: "5px solid #656565",
      transition: "0.3s",
      "&>svg": {},
    },

    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
  },

  correctBox: {
    backgroundColor: "#4caf50",
    borderColor: "#388e3c",

    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },

  wrongBox: {
    backgroundColor: "#f44336",
    borderColor: "#d32f2f",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },

  rightPanel: {
    minWidth: "200px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
  },

  guessLeftTxt: {
    fontSize: "32px",
    color: "white",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },

  score: {
    fontSize: "50px",
    color: "#d93232",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "32px",
    },
  },

  giveUpBtn: {
    color: "white",
    maxWidth: "200px",
    marginTop: "32px",

    [theme.breakpoints.down("sm")]: {
      marginTop: "18px",
    },
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

    [theme.breakpoints.down("sm")]: {
      height: "70%",
    },
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

  remainTime: {
    color: "white",
    fontSize: "24px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px", // Space between the buttons
    position: "absolute",
    right: 20,
    top: 20,
  },

  backButton: {
    backgroundColor: "#0077b6",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#005f8a",
    },
  },
  leaderBoard: {
    backgroundColor: "#f76c6c",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#d45c5c",
    },
  },
}));

export default styles;
